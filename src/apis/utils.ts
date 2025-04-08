// 인증 관련 에러를 처리하기 위한 커스텀 에러 클래스
class AuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

// --- Refresh Token API 호출 함수 ---
async function callRefreshTokenApi() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PROXY_ENDPOINT}/auths/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) return false;
  return true;
}

// --- API 요청 재시도를 포함한 인증 처리 함수 ---
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  try {
    return await performAuthFetch(url, {
      ...options,
      credentials: options.credentials || "include",
    });
  } catch (error) {
    if (error instanceof AuthError && error.status === 401) {
      const tokenRegenerate = await callRefreshTokenApi();
      if (!tokenRegenerate) return;

      return await performAuthFetch(url, {
        ...options,
        credentials: options.credentials || "include",
      });
    }

    throw error;
  }
}

// --- 실제 fetch를 수행하는 함수 (credentials 옵션 추가) ---
async function performAuthFetch(url: string, options: RequestInit = {}) {
  const headers = {
    ...options.headers,
    "Content-Type":
      (options.headers as Record<string, string>)?.["Content-Type"] ||
      "application/json",
  };

  // [중요] credentials 옵션 포함 확인 (fetchWithAuth에서 전달됨)
  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: options.credentials || "include",
  };

  const response = await fetch(
    url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_PROXY_ENDPOINT}${url}`,
    fetchOptions
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new AuthError("Unauthorized access - Initial request failed", 401);
    }

    // 다른 종류의 HTTP 에러 처리
    try {
      const errorBody = response;
      throw new Error(
        `HTTP error ${response.status}: ${
          (errorBody as any).message || response.statusText
        }`
      );
    } catch (e) {
      // 응답 본문이 JSON이 아니거나 파싱 실패 시
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return undefined; // 내용 없음
  }

  try {
    return response;
  } catch (error) {
    console.error("Failed to parse JSON response", error);
    throw new Error("Invalid JSON response from server.");
  }
}
