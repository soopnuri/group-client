import { callAPI } from "./api";

const dest = "/communities";

export interface Communities {
  createdAt: string;
  creatorId: number;
  description: string;
  id: number;
  moderators: string[];
  name: string;
  slug: string;
}

export const fetchGetCommunities = (accessToken: string | undefined) => {
  const uri = "";
  const res = callAPI({
    dest,
    uri,
    method: "GET",
    body: undefined,
    accessToken,
  });

  return res;
};

export const fetchJoinCommunities = (
  accessToken: string | undefined,
  slug: string,
  payload: {
    communityId: number;
    userId: number;
  }
) => {
  const uri = `/join`;
  const res = callAPI({
    dest,
    uri,
    method: "POST",
    body: {
      communityId: payload.communityId,
      userId: payload.userId,
    },
    accessToken,
  });

  return res;
};
