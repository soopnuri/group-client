"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as styles from "./styles.css";
import { useForm } from "react-hook-form";
import { fetchCreatePost, fetchGetPost } from "@/apis/post";
import { useAtomValue } from "jotai";
import { settingStore, userStore } from "@/shared/store/atom";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const CreatePost = () => {
  const { register, handleSubmit, setValue } = useForm();
  const userAtom = useAtomValue(userStore);
  const settingAtom = useAtomValue(settingStore);
  const router = useRouter();
  const searchParams = useSearchParams();

  const idFromQuery = searchParams.get("id");

  const { isLoading, data } = useQuery({
    enabled: !!idFromQuery,
    queryKey: ["post", idFromQuery],
    queryFn: () => fetchGetPost(Number(idFromQuery)),
    select: (data) => data.data,
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: "text",
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML());
    },
  });

  const handleSave = async (data: any) => {
    const payload = {
      title: data.title,
      content: data.content,
      authorId: userAtom.id,
      communityId: settingAtom.communityId,
    };

    const res = await fetchCreatePost(payload);
    if (res.success) {
      router.back();
    }
  };

  return (
    <div className={styles.container}>
      <strong className={styles.title}>포스트 생성</strong>
      <form onSubmit={handleSubmit(handleSave)}>
        <label className={styles.inputLabel}>제목</label>
        <input
          type="text"
          className={`${styles.titleInput} ${styles.editor}`}
          {...register("title")}
        />
        <section className={styles.wrap}>
          {editor && <Toolbar editor={editor} />}
          <EditorContent className={styles.editor} editor={editor} />
        </section>
        <div className={styles.buttonBox}>
          <button className={styles.button} type="submit">
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

interface ToolbarProps {
  editor: any;
}
const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className={`${styles.toolbar}`}>
      <div
        className={`${styles.toolbarItem}  ${
          editor.isActive("heading", { level: 2 }) ? styles.active : ""
        }`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H1
      </div>
      <div
        className={`${styles.toolbarItem} ${
          editor.isActive("bold") ? styles.active : ""
        }`}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </div>
      <div
        className={`${styles.toolbarItem} ${
          editor.isActive("italic") ? styles.active : ""
        }`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        italic
      </div>
    </div>
  );
};
