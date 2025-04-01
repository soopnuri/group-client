import { callAPI } from "./api";

const dest = "/auths";

export interface User {
  googleId: string;
  name: string;
  email: string;
  image: string;
}
export const signInWithGoogle = async ({ googleId, name, email, image }: User) => {
  const uri = "/google/login";

  const res = await callAPI({
    dest,
    uri,
    method: "POST",
    body: { googleId, name, email, image },
  });

  return res;
};
