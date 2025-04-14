"use client";
import LeftSide from "@/shared/layouts/LeftSide/LeftSide";
import Main from "@/shared/layouts/Main/Main";
import CreatePost from "./_components/CreatePost";
import { useSearchParams } from "next/navigation";
import UpdatePost from "./_components/UpdatePost";
export default function Submit() {
  const searchParams = useSearchParams();
  const idFromQuery = searchParams.get("id");

  return (
    <>
      <LeftSide />
      <Main>
        {idFromQuery ? <UpdatePost postId={idFromQuery} /> : <CreatePost />}
      </Main>
    </>
  );
}
