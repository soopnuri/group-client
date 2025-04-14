"use client";
import * as styles from "./styles.css";
import Select from "../Select/Select";
import { fetchGetPosts, fetchGetSlugByPosts } from "@/apis/post";
import type { Post } from "@/apis/post";
import { useQuery } from "@tanstack/react-query";
import { timeAgo } from "@/shared/libs/lib";
import { Divider } from "../Divider/Divider";
import Image from "next/image";
import { FiMaximize2 } from "react-icons/fi";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useAtomValue } from "jotai";
import { userStore } from "@/shared/store/atom";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";

import Vote from "../Vote/Vote";

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
const PostList = ({ slug = "/" }: PostProps) => {
  const { data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => (slug !== "/" ? fetchGetSlugByPosts(slug) : fetchGetPosts()),
  });

  const posts = data?.data;

  return (
    <div className={styles.container}>
      <Select title="Sort By" options={OPTIONS} />
      <Divider />
      {Array.isArray(posts) &&
        posts?.length >= 1 &&
        posts.map((post: Post) => (
          <PostPreview
            key={`${post.community.slug}/${post.id}`}
            {...post}
            slug={slug}
          />
        ))}
    </div>
  );
};

export default PostList;

const PostPreview = ({ slug, ...post }: Post & { slug: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userAtom = useAtomValue(userStore);
  const router = useRouter();

  const handleEdit = (slug: string, postId: number) => {
    router.push(`${slug}/submit/?id=${postId}`);
  };

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
          <span
            className={styles.postSlug}
            onClick={() => router.push(`/${post.community.slug}`)}
          >
            /{post.community.slug} • {timeAgo(post.updatedAt)}
          </span>
          <span
            className={styles.postTitle}
            onClick={() => router.push(`/${post.community.slug}/${post.id}`)}
          >
            {post.title}
          </span>
          <span className={styles.postOptions}>
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
            <Vote slug={slug} post={post} />
            {post.authorId === userAtom.id && (
              <span
                className={`${styles.iconWrap} ${styles.button}`}
                onClick={() => handleEdit(post.community.slug, post.id)}
              >
                <FiEdit />
              </span>
            )}
          </span>
        </div>
      </div>
      {isOpen && (
        <div className={styles.postContent}>
          <span dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      )}
      <Divider />
    </section>
  );
};
