import Link from "@/components/custom/Link";
import Header from "@/components/header/Header";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { fetchPosts } from "@/services/fetchPosts";
import { useQuery } from "@tanstack/react-query";
import PostItem from "./_components/PostItem";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { BsFilePost } from "react-icons/bs";

const statuses = ["all", "draft", "scheduled", "published", "failed"];

export default function PostsPage() {
  const { data: initialPosts, isLoading: loading } = useQuery<any>({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  const [filter, setFilter] = useState("all");

  const posts = useMemo(() => {
    if (filter === "all") {
      return initialPosts;
    } else {
      return initialPosts?.filter((post: any) => post?.status === filter);
    }
  }, [initialPosts, filter]);

  return (
    <Wrapper>
      <WrapperContent className="h-dvh gap-2 overflow-y-auto sm:bg-muted/80">
        <Header />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">All posts</h2>
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger className="h-10 w-40 rounded-3xl capitalize">
              <SelectValue className="capitalize" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectGroup>
                {statuses?.map((status) => (
                  <SelectItem
                    className="rounded-2xl capitalize"
                    key={status}
                    value={status}
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {loading ? (
            <LoadingOverlay />
          ) : posts?.length > 0 ? (
            posts?.map((post: any) => <PostItem key={post._id} post={post} />)
          ) : (
            <div className="col-span-full mx-auto mt-[25dvh] flex w-full flex-col items-center justify-center gap-4">
              <BsFilePost className="size-20 text-muted-foreground opacity-40" />
              <p className="text-lg font-medium text-muted-foreground">
                No posts found
              </p>

              {/* <Link to="/create?type=text">
                <Button className="rounded-3xl">Create Post</Button>
              </Link> */}
            </div>
          )}
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
