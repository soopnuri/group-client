import LeftSide from "@/shared/layouts/LeftSide/LeftSide";
import * as styles from "./styles.css";
import CommunityPostList from "@/shared/components/CommunityPostList/CommunityPostList";
import Main from "@/shared/layouts/Main/Main";
import CommunityIntro from "./_components/Intro/Intro";
export default function CommunityPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  return (
    <>
      <LeftSide />
      <Main>
        <CommunityIntro slug={slug} />
        <CommunityPostList slug={slug} />
      </Main>
    </>
  );
}
