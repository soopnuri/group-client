import LeftSide from "@/shared/layouts/LeftSide/LeftSide";
import CommunityPostList from "@/shared/components/PostList/PostList";
import Main from "@/shared/layouts/Main/Main";
import CommunityIntro from "./_components/Intro/Intro";

type PageParams = Promise<{
  community: string;
}>;

export default async function CommunityPage({
  params,
}: {
  params: PageParams;
}) {
  const { community } = await params;
  return (
    <>
      <LeftSide />
      <Main>
        <CommunityIntro slug={community} />
        <CommunityPostList slug={community} />
      </Main>
    </>
  );
}
