import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import { signInWithGoogle, User } from "./apis/auth";

// Extend the Session type to include accessToken
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface Session {
    error?: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    /**
     * JWT 생성/업데이트 시 호출됩니다. (로그인 시, 세션 조회 시 등)
     * @param token NextAuth의 JWT 토큰 객체
     * @param user Provider(Google)로부터 받은 사용자 정보 (로그인 시에만 존재)
     * @param account Provider(Google) 관련 정보 (로그인 시에만 존재)
     * @returns 업데이트된 JWT 토큰 객체
     */
    async jwt({ token, user, account }) {
      // --- 초기 로그인 시에만 백엔드 호출 ---
      // account와 user 객체가 존재할 때 = 소셜 로그인을 통해 처음 인증되었을 때
      if (account && user) {
        try {
          // 1. 백엔드 API에 전달할 페이로드 준비
          const payload: User = {
            googleId: user.id!, // Google ID 사용
            name: user.name!,
            email: user.email!,
            image: user.image!,
            // 필요하다면 Google의 access_token 등을 백엔드 검증용으로 전달할 수도 있음
            // googleAccessToken: account.access_token
          };

          // 2. NestJS 백엔드 API 호출 (로그인/회원가입 처리)
          //    signInWithGoogle의 실제 반환 구조에 맞춰야 합니다.
          //    예시: { data: { accessToken: '...', userId: '...', refreshToken: '...' (쿠키 설정 시 여기 없을 수 있음) } }
          const backendResponse = await fetch(
            `${process.env.NEXT_PUBLIC_NEST_ENDPOINT}/auths/google/login`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({ ...payload }),
            }
          );
          const res = await backendResponse.json();
          console.log(res);

          // --- 3. 백엔드 응답 데이터를 NextAuth JWT 토큰에 저장 ---
          token.accessToken = res.data.accessToken; // ⭐️ 백엔드의 Access Token 저장
          token.userId = res.data.user.id; // ⭐️ 백엔드의 사용자 ID 저장
          token.provider = account.provider; // 로그인 Provider 정보 저장
          token.googleId = user.id; // Google ID도 필요하면 저장

          // Refresh Token 처리:
          // - 만약 NestJS 인터셉터에서 HttpOnly 쿠키로 설정했다면, 여기서 저장할 필요 없음.
          // - 만약 응답 본문에 포함되어 왔고, JWT에 저장해야 한다면 여기서 추가:
          //   token.refreshToken = backendResponse.data.refreshToken;
          //   (하지만 JWT에 Refresh Token 저장 시 보안 고려 필요)
        } catch (error) {
          console.error("Error during backend sign-in in JWT callback:", error);
          // 에러 발생 시 토큰에 에러 정보 추가 또는 null 반환 등 처리
          token.error = "BackendSignInError";
        }
      }

      // --- 세션 갱신 또는 API 요청 시에도 jwt 콜백은 호출됨 ---
      // TODO: 여기에 Access Token 만료 시간 체크 및 Refresh Token을 이용한 갱신 로직 추가 가능
      // if (Date.now() < token.accessTokenExpires) { ... } else { /* refresh token logic */ }

      // 최종적으로 NextAuth가 관리할 토큰 객체 반환
      return token;
    },

    /**
     * 클라이언트 세션 객체 생성 시 호출됩니다. (useSession() 등)
     * @param session 기본 세션 객체
     * @param token 위 jwt 콜백에서 반환된 토큰 객체
     * @returns 클라이언트에서 사용할 최종 세션 객체
     */
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;

      if (session.user) {
        session.user.id = token.userId as string;
      }

      if (token.error) {
        session.error = token.error as string;
      }

      return session;
    },
  },
  // pages: { ... } // 필요시 커스텀 페이지 설정
});
