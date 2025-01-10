import Link from "@/components/custom/Link";
import Header from "@/components/header/Header";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import httpClient from "@/lib/httpClient";
import { fetchPosts } from "@/services/fetchPosts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function PostsPage() {
  const { data: posts, isLoading: loading } = useQuery<any>({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  return (
    <Wrapper>
      <WrapperContent className="h-dvh gap-2 overflow-y-auto sm:bg-muted/80">
        <Header />

        <div>
          {loading ? (
            <LoadingOverlay />
          ) : posts?.length > 0 ? (
            posts.map((post: any) => <PostItem key={post._id} post={post} />)
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

const PostItem = ({ post }: { post: any }) => {
  console.log("post", post);

  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    httpClient()
      .get(`/linkedin/posts/${post.linkedinPostId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold">{post.linkedinPostId}</h2>
      <h2 className="text-xl font-bold">{post.type}</h2>
      <p>{post.commentary}</p>

      <Button className="mt-4" onClick={() => getData()}>
        Get {loading ? "loading" : "data"}
      </Button>
    </div>
  );
};
