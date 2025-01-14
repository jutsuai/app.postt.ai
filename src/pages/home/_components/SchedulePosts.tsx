import Link from "@/components/custom/Link";
import { Button } from "@/components/ui/button";
import PostItem from "@/pages/posts/_components/PostItem";
import { BsFilePost } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { PiCalendarXDuotone } from "react-icons/pi";

export default function SchedulePosts({ posts }: { posts: any[] }) {
  const upcomingPosts = posts?.filter((post) => post?.status === "scheduled");
  return (
    <div className="flex h-fit w-full flex-col gap-6 rounded-2xl sm:bg-background ">
      <div className="flex items-center p-6 pb-0 gap-4">
        <h3 className=" text-xl font-semibold">Upcoming posts</h3>

        <Link to="/posts?status=scheduled" className="ml-auto">
          <Button variant="ghost" size="sm">
            View all
            <FiChevronRight />
          </Button>
        </Link>
      </div>

      <div className="flex h-[calc(100dvh-240px)] flex-col gap-4 overflow-y-hidden pl-6">
        {upcomingPosts?.length > 0 ?
          upcomingPosts?.map((post, index) => index < 3 && <PostItem className="mr-6 border h-fit" key={index} post={post} pageType="home" />) :
          <div className="col-span-full mx-auto mt-[20dvh] flex w-full flex-col items-center justify-center gap-4 opacity-80">
          <PiCalendarXDuotone className="text-6xl text-muted-foreground/100" />
          <p className=" font-medium text-muted-foreground">
           You don't have any upcoming posts
          </p>

      
        </div>}
      </div>
    </div>
  );
}
