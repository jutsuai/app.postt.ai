import Link from "@/components/custom/Link";
import { Button } from "@/components/ui/button";
import PostItem from "@/pages/posts/_components/PostItem";
import { FiChevronRight } from "react-icons/fi";

export default function SchedulePosts({ posts }: { posts: any[] }) {
  return (
    <div className="flex h-fit w-full flex-col gap-6 rounded-2xl sm:bg-background sm:p-8">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-semibold">Upcoming posts</h3>

        <Link to="/posts" className="ml-auto">
          <Button variant="ghost" size="sm">
            View all
            <FiChevronRight />
          </Button>
        </Link>
      </div>

      <div className="flex h-[calc(100dvh-240px)] flex-col gap-6 overflow-y-auto">
        {posts
          ?.filter((i) => i.status !== "published")
          ?.map((post, index) => <PostItem key={index} post={post} />)}
      </div>
    </div>
  );
}
