"use client";
import { timeAgo } from "@/shared/libs/lib";
import * as styles from "./styles.css";
import { fetchGetPost } from "@/apis/post";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import Vote from "../Vote/Vote";

interface QueryRes {
  message: string;
  data: PostView;
}
interface PostView {
  author: {
    name: string;
    image: string;
  };
  authorId: number;
  community: {
    slug: string;
  };
  communityId: number;
  id: number;
  content: string;
  title: string;
  voteScore: number;
  createdAt: string;
}

const PostView = ({ slug, postId }: { slug: string; postId: string }) => {
  const { isLoading, data } = useQuery<QueryRes>({
    queryKey: ["post", slug, postId],
    queryFn: () => fetchGetPost(Number(postId)),
  });

  const post = data?.data as PostView;

  if (isLoading) return <>...fheldwnd</>;

  return (
    <article className={styles.container}>
      {/* 프로필 영역 */}
      <section className={styles.profileBox}>
        <span className={`${styles.iconWrap} ${styles.button}`}>
          <FiArrowLeft size={16} />
        </span>
        <div className={styles.authorBox}>
          <Image
            width={32}
            height={32}
            src={"/profile.png"}
            alt="프로필 이미지"
          />
          <span className={styles.authorInfo}>
            <span className={`${styles.authorSlugTime}`}>
              <b className={`${styles.authorText} ${styles.b}`}>
                /{post.community.slug}
              </b>{" "}
              •<p className={styles.authorText}> {timeAgo(post.createdAt)}</p>
            </span>
            <p className={styles.authorText}>{post.author.name}</p>
          </span>
        </div>
      </section>
      {/* 컨텐츠 영역 */}
      <section className={styles.contentBox}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <span
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div>
          <Vote slug={slug} post={post} />
        </div>
      </section>
      {/* 댓글 영역 */}
      <section className={styles.commentBox}></section>
    </article>
  );
};

export default PostView;
