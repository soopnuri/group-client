type fetchMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptionProps {
  method: fetchMethod;
  headers: any;
  body?: any;
}

export async function fetchWithInterceptors(
  url: string,
  options: FetchOptionProps
) {
  const modifiedOptions = await requestInterceptor(options);

  return fetch(url, modifiedOptions).then((response) => {
    return responseInterceptor(response);
  });
}

async function requestInterceptor(options: FetchOptionProps) {
  return options;
}

function responseInterceptor(response: any) {
  return response;
}
