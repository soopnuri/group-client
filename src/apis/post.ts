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
  voteScore: number;
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

export const fetchGetPost = (id: number) => {
  const uri = `/${id}`;
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

export const fetchUpdatePost = (id: number, payload: any) => {
  const uri = `/${id}`;
  const res = callAPI({ dest, uri, method: "PATCH", body: payload });

  return res;
};

export const fetchUpVote = (id: number, payload: any) => {
  const uri = `/${id}/vote`;
  const res = callAPI({
    dest,
    uri,
    method: "POST",
    body: {
      userId: payload.userId,
      vote: payload.vote,
    },
  });

  return res;
};
