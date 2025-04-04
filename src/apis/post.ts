import { callAPI } from "./api";

const dest = "/posts";

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  communityId: number;
  createdAt: string;
  updatedAt: string;
  community: {
    id: number;
    creatorId: number;
    name: string;
    description: string;
    slug: string;
    moderators: string[];
    createdAt: string;
  };
}

export const fetchGetPosts = () => {
  const uri = "";
  const res = callAPI({
    dest,
    uri,
    method: "GET",
    body: undefined,
  });

  return res;
};

export const fetchGetSlugByPosts = (slug: string) => {
  const uri = `/community/${slug}`;
  const res = callAPI({
    dest,
    uri,
    method: "GET",
    body: undefined,
  });

  return res;
};

export const fetchCreatePost = (payload: any) => {
  const uri = "";
  const res = callAPI({ dest, uri, method: "POST", body: payload });

  return res;
};
