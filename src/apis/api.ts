import { fetchWithAuth } from "./utils";

type fetchMethod = "GET" | "POST" | "PUT" | "DELETE";
type ContentType = "JSON" | "FILE";
export interface FetchOptions extends RequestInit {
  method: fetchMethod;
  headers: Headers;
  body?: any;
}
interface APIProps {
  dest: string;
  uri: string;
  method: fetchMethod;
  body?: any;
  type?: ContentType;
}

export const callAPI = async ({
  dest,
  uri,
  method,
  body = undefined,
  type = "JSON",
}: APIProps) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_NEST_ENDPOINT}${dest}${uri}`;

    const headers: Headers = new Headers(); // 헤더는 fetchWithAuth에서 Authorization 추가

    let requestBody = body;
    if (type === "JSON" && body !== undefined) {
      headers.set("Content-Type", "application/json;charset=UTF-8");
      requestBody = JSON.stringify(body);
    } else if (type === "FILE") {
      // 파일 타입일 경우 Content-Type을 직접 설정하지 않아야 브라우저가 올바르게 설정함
      // headers['Content-Type'] = 'multipart/form-data'; // 필요하다면 명시
      requestBody = body; // FormData 객체 등
    }

    const options: FetchOptions = {
      // fetchWithAuth가 받는 옵션 타입 사용
      method,
      headers,
      body: requestBody,
    };

    // 수정된 fetchWithAuth 호출
    const result = await fetchWithAuth(url, options);

    return result;
  } catch (error) {
    console.error("API call error in callAPI:", error);
    // 여기서 에러를 다시 throw 하거나, undefined 또는 특정 에러 객체 반환 결정
    // throw error; // 호출한 쪽에서 에러를 잡도록 re-throw
    return undefined; // 또는 undefined 반환
  }
};
