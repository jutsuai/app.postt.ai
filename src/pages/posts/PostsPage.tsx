import Link from "@/components/custom/Link";
import Header from "@/components/header/Header";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { fetchPosts } from "@/services/fetchPosts";
import { useQuery } from "@tanstack/react-query";
import PostItem from "./_components/PostItem";

export default function PostsPage() {
  const { data: posts, isLoading: loading } = useQuery<any>({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  return (
    <Wrapper>
      <WrapperContent className="h-dvh gap-2 overflow-y-auto sm:bg-muted/80">
        <Header />

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {loading ? (
            <LoadingOverlay />
          ) : posts?.length > 0 ? (
            posts?.map((post: any) => <PostItem key={post._id} post={post} />)
          ) : (
            <div className="flex h-96 flex-col items-center justify-center gap-4">
              <p className="text-lg text-gray-500">No posts found</p>

              <Link to="/create?type=text">
                <Button>Create Post</Button>
              </Link>
            </div>
          )}
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
