"use client";
import {
  Communities,
  fetchGetCommunities,
  fetchJoinCommunities,
} from "@/apis/community";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as styles from "./styles.css";
import { FiPlus } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userStore } from "@/shared/store/atom";
interface CommunityProps {
  slug: string;
}
const CommunityIntro = ({ slug = "/" }: CommunityProps) => {
  const navigate = useRouter();
  const [userAtom, setUserAtom] = useAtom(userStore);

  const { isLoading, data } = useQuery({
    queryKey: ["communities"],
    queryFn: () => fetchGetCommunities(),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5, // 5분
  });

  if (isLoading) return <div>Loading...</div>;
  const community = data?.find((v: any) => v.slug === slug);

  const joinCommunity = async () => {
    if (!userAtom?.id) return;

    if (slug !== "/") {
      const payload = {
        userId: Number(userAtom.id) || 0,
        communityId: community?.id || 0,
      };

      const result = await fetchJoinCommunities(payload);

      console.log("가입결과:", result);
    }
  };

  const createPost = () => {
    navigate.push(`/${slug}/submit`);
  };

  return (
    <section className={styles.container}>
      <span className={styles.shaodw} />
      <div className={styles.introBox}>
        <h2 className={styles.communityName}>/{community?.slug}</h2>
        <div className={styles.buttonBox}>
          <span className={styles.button} onClick={() => createPost()}>
            <FiPlus />
            포스트 생성
          </span>
          <span className={styles.button} onClick={() => joinCommunity()}>
            <FiLogIn />
            가입
          </span>
        </div>
      </div>
    </section>
  );
};

export default CommunityIntro;
