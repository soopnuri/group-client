import { fetchWithInterceptors } from "./utils";

type fetchMethod = "GET" | "POST" | "PUT" | "DELETE";
type ContentType = "JSON" | "FILE";

interface APIProps {
  dest: string;
  uri: string;
  method: fetchMethod;
  body?: any;
  type?: ContentType;
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
}: APIProps) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_NEST_ENDPOINT}/${dest}/${uri}`;
    const headers: Headers = {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      // Authorization: `Bearer ${accessToken}`,
    };

    if (type !== "FILE") {
      headers["Content-Type"] = "application/json;charset=UTF-8";
    }

    const config = {
      method,
      headers,
      body: type === "JSON" ? JSON.stringify(body) : body,
    };
    const result = (await fetch(url, config)).json();
    console.log(result);

    return result;
  } catch (error) {
    console.error("API call error: ", error);
    return undefined;
  }
};
