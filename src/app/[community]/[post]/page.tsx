import LeftSide from "@/shared/layouts/LeftSide/LeftSide";
import Main from "@/shared/layouts/Main/Main";
import PostView from "@/shared/components/PostView/PostView";

type PageParams = Promise<{
  post: string;
  community: string;
}>;

export default async function PostPage({ params }: { params: PageParams }) {
  const { community, post } = await params;

  return (
    <>
      <LeftSide />
      <Main>
        <PostView slug={community} postId={post} />
      </Main>
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
