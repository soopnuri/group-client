import LeftSide from "@/shared/layouts/LeftSide/LeftSide";
import Main from "@/shared/layouts/Main/Main";
import CreatePost from "./_components/CreatePost";
export default function Submit() {
  return (
    <>
      <LeftSide />
      <Main>
        <CreatePost />
      </Main>
    </>
  );
}
