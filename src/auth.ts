import NextAuth, { User, Account, Session, DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt"; // JWT 타입을 명시적으로 임포트
import Google from "next-auth/providers/google";

import Redis from "ioredis";
import Redlock from "redlock";

declare module "redlock" {
  // import { Redis } from "ioredis";

  type Resource = string;
  type Lock = {
    resource: Resource;
    value: string;
    unlock: () => Promise<void>;
  };

  interface RedlockOptions {
    driftFactor?: number;
    retryCount?: number;
    retryDelay?: number;
    retryJitter?: number;
  }

  export default class Redlock {
    constructor(clients: Redis[], options?: RedlockOptions);
    acquire(resources: Resource[], ttl: number): Promise<Lock>;
    release(lock: Lock): Promise<void>;
    using<T>(
      resources: Resource[],
      ttl: number,
      callback: (signal: AbortSignal) => Promise<T>
    ): Promise<T>;
  }
}

const redisClient = new Redis("redis://localhost:6379", {
  keepAlive: 30000,
  maxRetriesPerRequest: 3,
  connectTimeout: 10000,
}); // Redis 클라이언트 생성

redisClient.on("error", (error) => {
  console.error("Redis 클라이언트 에러:", error);
});

redisClient.on("connect", () => {
  console.log("Redis 클라이언트 연결 성공");
});

const redlock = new Redlock([redisClient], {
  driftFactor: 0.01, // 표준 허용 오차 (0.01은 1%)
  retryCount: 10, // 재시도 횟수
  retryDelay: 200, // 재시도 간격 (밀리초)
  retryJitter: 200, // 재시도 간격 조정 범위 (밀리초)
});

// import { signInWithGoogle, User as BackendUser } from "./apis/auth"; // 이 부분은 직접 fetch를 사용하므로 제거 가능

// --- 타입 확장 ---

// JWT 토큰에 저장할 커스텀 필드 정의
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    userId?: string;
    provider?: string;
    googleId?: string;
    error?: string;
  }
}
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string | null;
    } & DefaultSession["user"];
    error?: string;
  }
}

let isRefreshing = false; // 리프레시 중복 방지 플래그
let refreshPromise: Promise<JWT> | null = null; // 리프레시 프로미스

// --- 토큰 재발급 함수 ---
// 이 함수는 서버 측에서만 실행됩니다.
async function refreshAccessToken(token: JWT): Promise<JWT> {
  // Refresh Token이 없으면 재발급 불가
  console.log("auth.ts, refreshAccessToken 함수 실행");
  if (!token.refreshToken) {
    console.error("No refresh token available.");
    return { ...token, error: "MissingRefreshTokenError" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_ENDPOINT}/auths/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      }
    );

    const refreshedTokens = await response.json();
    console.log("서버로 부터 새 토큰:", refreshedTokens);

    // if (!response.ok) {
    //   console.log("리프레시 토큰이 만료되었다면 로그아웃을 시킨다.");
    //   return {
    //     ...token,
    //     error: "RefreshTokenError",
    //   };
    // }

    // 백엔드 응답에서 expiresIn (초 단위) 값이 온다고 가정
    const newExpiresIn = refreshedTokens.data?.expiresIn ?? 2 * 60; // 기본값 2분

    console.log("새 Access Token 정보:", {
      accessToken: refreshedTokens.data.accessToken,
      expiresAt: new Date(newExpiresIn).toISOString(),
      newRefreshToken: refreshedTokens.data.refreshToken, // 존재 여부 로깅
    });

    // 새로 발급받은 토큰 정보로 기존 token 객체를 업데이트하여 반환
    return {
      ...token,
      accessToken: refreshedTokens.data.accessToken, // 새 Access Token
      accessTokenExpires: Date.now() + newExpiresIn * 1000, // 새 만료 시간 계산
      // NestJS가 새 Refresh Token도 반환한다면 업데이트 (옵션)
      refreshToken: refreshedTokens.data.refreshToken ?? token.refreshToken,
      error: undefined, // 에러 상태 초기화
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError", // 네트워크 에러 등 발생 시
    };
  }
}

export const authOptions: any = {
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // JWT 전략 사용 필수
    // maxAge: 30 * 24 * 60 * 60, // 세션 쿠키 만료 (선택적) - Refresh Token 수명과 연관
  },
  // debug: true,
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
    }): Promise<JWT> {
      // --- 1. 초기 Google 로그인 시 ---
      if (account && user && account.provider === "google") {
        console.log("1. 최초 로그인, 서버로 로그인 요청");
        try {
          const backendResponse = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_ENDPOINT}/auths/google/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                googleId: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
              }),
            }
          );

          const res = await backendResponse.json(); // 백엔드 응답 파싱

          if (!backendResponse.ok || !res.data?.accessToken) {
            console.error("서버 구글 로그인 실패");
            throw new Error(res.message || "Backend Google login failed");
          }

          // 백엔드 응답 데이터를 NextAuth JWT 토큰에 저장
          const backendData = res.data;
          const expiresIn = backendData.expiresIn ?? 1 * 60; // 초 단위, 기본 15분

          token.accessToken = backendData.accessToken;
          token.accessTokenExpires = Date.now() + expiresIn * 1000;
          token.userId = backendData.user?.id; // 백엔드가 반환하는 사용자 ID
          token.provider = account.provider;
          token.googleId = user.id;
          token.error = undefined; // 초기 로그인 성공 시 에러 없음

          // --- Refresh Token 처리 ---
          // 1) 백엔드 응답에 Refresh Token이 포함된 경우: JWT에 저장 (보안 고려)
          if (backendData.refreshToken) {
            token.refreshToken = backendData.refreshToken;
            console.log("리프세티 토큰을 받아서 설정한다.");
          }
          // 2) 백엔드가 HttpOnly 쿠키로 Refresh Token을 설정한 경우: JWT에 저장할 필요 없음
          //    이 경우 refreshAccessToken 함수는 token.refreshToken 없이 userId 등으로 동작해야 함
        } catch (error) {
          console.error("Error during backend sign-in in JWT callback:", error);
          token.error = "BackendSignInError"; // 에러 상태 설정
          // 초기 로그인 실패 시 accessToken 등 관련 필드 제거 가능
          delete token.accessToken;
          delete token.refreshToken;
          delete token.accessTokenExpires;
        }
        // 초기 로그인 처리가 끝나면 현재 상태의 토큰 반환
        return token;
      }

      // --- 2. Access Token 유효성 검사 및 재발급 (초기 로그인이 아닌 경우) ---
      // accessTokenExpires가 없거나 에러 상태가 있다면 더 이상 진행 X (이미 문제 발생)
      console.log("1. 토큰 확인", token.error);
      if (!token.accessTokenExpires) {
        return token;
      }

      // Access Token이 아직 유효한 경우: 기존 토큰 반환
      // 만료 1분 전(60 * 1000ms)부터 갱신 시도
      console.log(
        "2. 토큰 유효성 검사",
        Date.now() < token.accessTokenExpires - 60 * 1000
      );
      if (Date.now() < token.accessTokenExpires - 60 * 1000) {
        // console.log("Access token is still valid.");
        return token;
      }

      const lockResponse = `jwt-refresh:${token.userId}`; // 락 리소스 이름(사용자 별)
      const lockTTL = 5000; // 락 유효 시간, API 응답 시간 고려 (5초)

      try {
        return await redlock.using(
          [lockResponse],
          lockTTL,
          async (signal: any) => {
            console.log(`Redlock 획득 성공, 리소스: ${lockResponse}`);

            // 1. 레디스 캐시 확인.
            // 키: 현재 요청이 가진 리프레시 토큰
            const cacheKey = `refresh-result:${token.refreshToken}`;

            let catchTokenJSON: string | null = null;
            try {
              catchTokenJSON = await redisClient.get(cacheKey);
            } catch (error) {
              console.error("Redis 캐시 조회 실패:", error);
            }

            if (catchTokenJSON) {
              console.log(`Redlock 내부: redis 캐시 히트(키: ${cacheKey})`);

              try {
                const cachedToken = JSON.parse(catchTokenJSON) as JWT;

                if (
                  cachedToken.accessToken &&
                  cachedToken.accessTokenExpires &&
                  Date.now() < cachedToken.accessTokenExpires - 60 * 1000
                ) {
                  console.log("리프레시 토큰 캐시 히트");
                  return cachedToken;
                } else {
                  console.log("리프레시 토큰 캐시 만료");
                }
              } catch (parseError) {
                console.error("Redis 캐시 파싱 실패:", parseError);
              }
            } else {
              console.log(`Redlock 내부: redis 캐시 미스(키: ${cacheKey})`);
            }
            // 2. 서버 API 호출(캐시 없거나 만료 시)
            console.log(`Redlock 내부: 리프레시 토큰 요청`);
            const newToken = await refreshAccessToken(token);

            if (signal.aborted) {
              console.warn("Redlock 내부: 락 만료, 토큰 갱신 결과 폐기");
              // 락 만료시 새 토큰을 사용치 않고, 이전 토큰에 에러 상태 추가
              // 혹은 이전 토큰 반환(다음 요청이 다시 시도하도록)
              return { ...token, error: "LockExpiredError" };
            }

            if (!newToken.error && newToken.accessToken) {
              console.log(
                `Redlock 내부: 리프레시 토큰 요청 성공, Redis 캐시 저장 시도 키:${cacheKey}`
              );
              try {
                // 중요: 키는 '이전' 리프레시 토큰
                // 값은 새 토큰 객체
                await redisClient.set(
                  cacheKey,
                  JSON.stringify(newToken),
                  "EX",
                  300
                ); // 5분 간 캐시
                console.log(
                  `Redlock 내부: Redis 캐시 저장 완료, 키:${cacheKey}`
                );
              } catch (redisSetError) {
                // 캐시 저장 실패는 치명적이지 않음, 그냥 진행
                console.error("Redis 캐시 저장 실패:", redisSetError);
              }
              console.log(
                "Redlock 내부: 리프레시 토큰 요청 성공, Redis 캐시 저장 완료"
              );
              return newToken;
            } else {
              console.warn("서버 호출 실패, 실패 상태 토큰 반환");
              return newToken;
            }
          }
        ); // End of Redlock.using
      } catch (error) {
        console.log(error);
        return { ...token, error: "FailedToAcquireLockError" };
      }
    },

    /**
     * 클라이언트 세션 객체 생성 시 호출됩니다. (useSession() 등)
     * 서버 측에서 실행됩니다.
     */
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      // 중요: Refresh Token, accessTokenExpires 등 민감/불필요 정보는 절대 클라이언트로 노출 X
      if (token) {
        session.accessToken = token.accessToken;
        if (session.user) {
          session.user.id = token.userId;
        }
        session.error = token.error;
      }

      // error가 RefreshAccessTokenError인 경우, accessToken은 만료된 상태일 수 있음
      // 클라이언트에서는 session.error 존재 여부를 확인하여 처리 필요
      if (session.error) {
        console.warn("Session has an error state:", session.error);
        // 필요하다면 여기서 accessToken을 지울 수도 있음
        // delete session.accessToken;
      }

      return session;
    },
  },
  // pages: { ... } // 필요시 커스텀 페이지 설정
  // debug: process.env.NODE_ENV === 'development', // 개발 중 디버그 로그 활성화
};

// --- 핸들러 및 함수 export ---
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
