"use client";
import { Communities, fetchJoinCommunities } from "@/apis/community";
import { useQueryClient } from "@tanstack/react-query";
import * as styles from "./styles.css";
import { FiPlus } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface CommunityProps {
  slug: string;
}
const CommunityIntro = ({ slug = "/" }: CommunityProps) => {
  const { data: session } = useSession();
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const communities = queryClient.getQueryData<Communities[]>(["communities"]);
  const community = communities?.find((v: any) => v.slug === slug);

  const joinCommunity = async () => {
    // TODO: 커뮤니티 가입 로 직 구현
    if (slug !== "/") {
      const payload = {
        userId: Number(session?.user?.id) || 0,
        communityId: community?.id || 0,
      };
      const result = await fetchJoinCommunities(
        session?.accessToken,
        slug,
        payload
      );
    }
  };

  const createPost = () => {
    navigate.push(`/${slug}/submit`);
  }

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
