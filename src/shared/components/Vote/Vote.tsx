"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as styles from "./styles.css";
import { fetchUpVote, Post } from "@/apis/post";
import { useAtomValue } from "jotai";
import { userStore } from "@/shared/store/atom";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { formatWithComma } from "@/shared/libs/lib";

interface VoteProps {
  slug: string;
  post: {
    id: number;
    voteScore: number;
  };
}

const Vote = ({ slug, post }: VoteProps) => {
  const queryClient = useQueryClient();
  const userAtom = useAtomValue(userStore);

  const voteMutation = useMutation({
    mutationFn: (variables: {
      postId: number;
      payload: any;
      slugForCache: string;
    }) => fetchUpVote(variables.postId, variables.payload),

    onSuccess: (data, variables) => {
      const newScore = data.data.score;
      if (newScore === undefined) {
        console.warn("newScore is undefined", data);
        return;
      }

      const queryKey = ["post", variables.slugForCache];
      const singPostKey = [
        "post",
        variables.slugForCache,
        String(variables.postId),
      ];

      queryClient.setQueryData<{ message: string; data: Post } | undefined>(
        singPostKey,
        (oldData) => {
          if (!oldData) {
            return oldData;
          }

          const updatedData = {
            ...oldData.data,
            voteScore: data.data.score,
          };

          return {
            ...oldData,
            data: updatedData,
          };
        }
      );

      queryClient.setQueryData<{ message: string; data: Post[] } | undefined>(
        queryKey,
        (oldData) => {
          if (!oldData || !Array.isArray(oldData.data)) {
            return oldData;
          }

          const updatedDataArray = oldData.data.map((cachedPost) => {
            if (cachedPost.id === variables.postId) {
              return {
                ...cachedPost,
                voteScore: data.data.score,
              };
            }
            return cachedPost;
          });

          return {
            ...oldData,
            data: updatedDataArray,
          };
        }
      );

      if (variables.slugForCache === "/") {
        queryClient.invalidateQueries({
          queryKey: ["post"],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["post", variables.slugForCache],
        });
      }
    },
    onError: (error) => {
      console.error("Vote failed:", error);
      alert("투표 처리 중 오류가 발생했습니다.");
    },
  });

  const handleVote = (vote: 1 | -1) => {
    // 로그인이 안 되어 있으면 투표 불가 (선택적)
    if (!userAtom?.id) {
      alert("로그인이 필요합니다.");
      // 로그인 페이지로 리디렉션 등
      return;
    }

    const payload = {
      userId: userAtom.id,
      vote: vote,
    };

    // mutate 함수 호출 (API 요청 실행)
    voteMutation.mutate({ slugForCache: slug, postId: post.id, payload });
  };

  return (
    <span className={`${styles.voteWrap}`}>
      <span
        className={`${styles.iconWrap} ${styles.button}`}
        onClick={() => handleVote(1)}
      >
        <FiArrowUp size={14} />
      </span>
      <p className={styles.voteCount}>{formatWithComma(post.voteScore)}</p>
      <span
        className={`${styles.iconWrap} ${styles.button}`}
        onClick={() => handleVote(-1)}
      >
        <FiArrowDown size={14} />
      </span>
    </span>
  );
};

export default Vote;
