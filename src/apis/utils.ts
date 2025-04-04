import { getSession, signOut } from "next-auth/react";

// API 요청 재시도를 포함한 인증 처리 함수
export async function fetchWithAuth(url: string, options: any = {}) {
  // 최초 시도: 자동 토큰 갱신 의존
  try {
    console.log("토큰 갱신을 요청합니다");
    return await performAuthFetch(url, options);
  } catch (error) {
    // 첫 요청이 401 에러인 경우 (토큰 만료)
    if (error instanceof AuthError && error.status === 401) {
      console.log("토큰 재발급 대기");

      // NextAuth가 자동으로 토큰을 갱신할 시간을 주기 위해 잠시 대기
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 토큰 갱신 후 재시도
      try {
        return await performAuthFetch(url, options);
      } catch (secondError) {
        // 두 번째 시도도 실패하면 로그아웃 처리
        if (secondError instanceof AuthError) {
          console.log("2번째 시도 실패");
          // 로그아웃 처리
          // await signOut({ redirect: true, callbackUrl: "/login" });
        }
        throw secondError;
      }
    }
    throw error;
  }
}

// 실제 인증된 API 요청 수행 함수
async function performAuthFetch(url: string, options: any = {}) {
  // 1. 최신 세션 가져오기
  const session = await getSession();
  console.log("performAuthFetch. 최신 세션을 가져온다.");
  if (!session) {
    throw new AuthError("User not authenticated", 401);
  }
  console.log("performAuthFetch. 최신 세션을 가져온다.", session);

  // 2. 세션 유효성 및 에러 확인
  if (session.error === "RefreshTokenError") {
    signOut();
  }

  // 3. 헤더에 Access Token 추가
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${session.accessToken}`,
    "Content-Type": options.headers?.["Content-Type"] || "application/json",
  };

  // 4. 실제 API 호출
  const response = await fetch(url, { ...options, headers });

  // 5. 응답 상태 확인
  if (!response.ok) {
    if (response.status === 401) {
      throw new AuthError("Unauthorized access", 401);
    }

    // 다른 종류의 에러 처리
    try {
      const errorBody = await response.json();
      throw new Error(
        `HTTP error ${response.status}: ${
          errorBody.message || response.statusText
        }`
      );
    } catch (e) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  // 6. 성공 시 결과 반환
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return undefined; // 내용 없음
  }

  try {
    return await response.json();
  } catch (error) {
    console.error("Failed to parse JSON response", error);
    throw new Error("Invalid JSON response from server.");
  }
}

// 인증 관련 에러를 처리하기 위한 커스텀 에러 클래스
class AuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}
