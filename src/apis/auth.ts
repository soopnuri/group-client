import { callAPI } from "./api";

const dest = "/auths";

export interface User {
  googleId: string;
  name: string;
  email: string;
  image: string;
}
export const fetchGetUser = async () => {
  const uri = "";

  const res = await callAPI({
    dest,
    uri,
    method: "GET",
    body: undefined,
  });

  return res;
};

export const fetchLogout = async () => {
  const uri = "/logout";
  const res = await callAPI({
    dest,
    uri,
    method: "GET",
    body: undefined,
  });
  return res;
};
