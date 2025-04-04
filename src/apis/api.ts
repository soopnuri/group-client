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
  const url = `${process.env.NEXT_PUBLIC_PROXY_ENDPOINT}${dest}${uri}`;

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
    method,
    headers,
    body: requestBody,
  };

  const res = await fetchWithAuth(url, options);
  const result = (await res?.json()) || {
    message: "",
    success: false,
    data: null,
  };

  return result;
};
