import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import httpClient from "@/lib/httpClient";
import { useEffect, useState } from "react";

export default function PostsPage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);

    httpClient()
      .get("/posts")
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper>
      <WrapperContent className="h-dvh gap-2 overflow-y-auto sm:bg-muted/80">
        <Header />

        <div>
          {posts.map((post: any) => (
            <PostItem key={post._id} post={post} />
          ))}
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
