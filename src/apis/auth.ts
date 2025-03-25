import { callAPI } from "./api";

const dest = "auths";

export interface User {
  name: string;
  email: string;
  image: string;
}
export const signInWithGoogle = async ({ name, email, image }: User) => {
  const uri = "google/login";

  const res = await callAPI({
    dest,
    uri,
    method: "POST",
    body: { name, email, image },
  });

  console.log('res->결과:', res);
  return true;
};
