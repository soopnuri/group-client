"use client";
import * as styles from "./styles.css";
import Select from "../Select/Select";
import { fetchGetPosts, fetchGetSlugByPosts } from "@/apis/post";
import type { Post } from "@/apis/post";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { timeAgo } from "@/shared/libs/lib";
import { Divider } from "../Divider/Divider";
import Image from "next/image";
import { FiMaximize2 } from "react-icons/fi";
import { useState } from "react";
import { FiX } from "react-icons/fi";
// TODO: 삭제
const OPTIONS = [
  {
    label: "조회순",
    value: "views",
  },
  {
    label: "최신순",
    value: "newest",
  },
  {
    label: "오래된순",
    value: "oldest",
  },
];

interface PostProps {
  slug: string;
}
const CommunityPostList = ({ slug = "/" }: PostProps) => {
  const { data: session } = useSession();
  const { isLoading, data } = useQuery({
    queryKey: ["post", slug, session?.accessToken],
    queryFn: () =>
      slug !== "/"
        ? fetchGetSlugByPosts(slug, session?.accessToken)
        : fetchGetPosts(session?.accessToken),
    select: (data) => data.data,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Select title="Sort By" options={OPTIONS} />
      <Divider />
      {data?.length >= 1 &&
        data.map((post: Post) => <Post key={post.id} {...post} />)}
    </div>
  );
};

export default CommunityPostList;

const Post = (post: Post) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.postWrapper} key={post.id}>
      <div className={styles.postBox}>
        <Image
          className={styles.postImage}
          width={70}
          height={70}
          src="noImage.png"
          priority
          alt=""
        />
        <div className={styles.postItem}>
          <span className={styles.postSlug}>
            /{post.community.slug} • {timeAgo(post.updatedAt)}
          </span>
          <span className={styles.postTitle}>{post.title}</span>
          <span>
            <span
              className={`${styles.iconWrap} ${styles.button}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <FiX className={`${styles.reverseIcon}`} size={20} />
              ) : (
                <FiMaximize2 className={`${styles.reverseIcon}`} size={14} />
              )}
            </span>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className={styles.postContent}>
          <span>{post.content}</span>
        </div>
      )}
      <Divider />
    </section>
  );
};
