import LeftSide from "@/shared/layouts/LeftSide/LeftSide";
import Post from "@/shared/components/CommunityPostList/CommunityPostList";
import Main from "@/shared/layouts/Main/Main";
export default function Home() {
  return (
    <>
      <LeftSide />
      <Main>
        <Post slug={"/"} />
      </Main>
    </>
  );
}
