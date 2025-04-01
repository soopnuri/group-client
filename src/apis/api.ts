import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { fetchWithInterceptors } from "./utils";

type fetchMethod = "GET" | "POST" | "PUT" | "DELETE";
type ContentType = "JSON" | "FILE";

interface APIProps {
  dest: string;
  uri: string;
  method: fetchMethod;
  body?: any;
  type?: ContentType;
  accessToken?: string;
}

interface Headers {
  [key: string]: string;
}

export const callAPI = async ({
  dest,
  uri,
  method,
  body = undefined,
  type = "JSON",
  accessToken,
}: APIProps) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_NEST_ENDPOINT}${dest}${uri}`;
    const headers: Headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    if (type !== "FILE") {
      headers["Content-Type"] = "application/json;charset=UTF-8";
    }

    const config: RequestInit = {
      method,
      headers,
      body: type === "JSON" ? JSON.stringify(body) : body,
    };
    const result = (await fetch(url, config)).json();

    return result;
  } catch (error) {
    console.error("API call error: ", error);
    return undefined;
  }
};
