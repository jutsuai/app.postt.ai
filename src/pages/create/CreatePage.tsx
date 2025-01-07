import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import httpClient from "@/lib/httpClient";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreatePage() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   handleGetPosts();
  // }, []);

  const handleGetPosts = () => {
    setLoading(true);

    httpClient()
      .get(`/linkedin/91137041/post`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper>
      <WrapperContent className="h-full">
        <div className="w-full h-full grid place-items-center text-2xl font-semibold">
          CreatePage
          <div>
            <Button onClick={handleGetPosts}>Get Posts</Button>
            {loading ? <p>Loading...</p> : "NOT LOADING"}
            {JSON.stringify(posts)}
          </div>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
