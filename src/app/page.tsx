import LeftSide from "@/shared/layouts/LeftSide/LeftSide";
import Post from "@/shared/components/PostList/PostList";
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
