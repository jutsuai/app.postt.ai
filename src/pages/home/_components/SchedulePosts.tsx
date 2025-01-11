import Image from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import capitalizeFirstLetter from "@/lib/capitalizeFirstLetter";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";

export default function SchedulePosts({ posts }: { posts: any[] }) {
  return (
    <div className="flex h-fit w-full flex-col gap-6 rounded-2xl sm:bg-background sm:p-8">
      <h3 className="text-xl font-semibold">Upcoming posts</h3>
      <div className="flex flex-col gap-4">
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

const PostItem = ({ post }: { post: any }) => {
  console.log(post);

  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex h-40 items-end justify-between gap-2 overflow-hidden rounded-2xl border bg-slate-100 p-2 sm:p-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex h-full flex-col p-2">
        <p className="text-xs font-medium opacity-90">
          {/* 04:03 via LinkedIn */}
          {`${moment(post?.scheduledAt || post?.createdAt).fromNow()} via ${post?.platform}`}
        </p>
        <h6 className="line-clamp-1 text-lg font-semibold">
          {post?.commentary ? post?.commentary : "No caption"}
        </h6>
        {/* <p className="mt-auto text-xs text-muted-foreground">
          6 photos 1 video
        </p> */}

        {post?.status === "draft" && (
          <div className="mt-auto flex gap-2">
            <Badge
              variant="default"
              className="rounded-full bg-yellow-500/15 px-3 text-yellow-600 shadow-none hover:bg-yellow-500/15"
            >
              {capitalizeFirstLetter(post?.status)}
            </Badge>
          </div>
        )}

        <div
          className={cn(
            "mt-auto flex items-center gap-2 transition",

            hovered ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0",
          )}
        >
          <p className="text-xs">Open Now</p>
          <IoMdArrowRoundForward className="" />
        </div>
      </div>

      <Image
        src={
          post?.media?.url ||
          `https://placehold.co/512x512@2x/6842ffss/33333?text=Post`
        }
        alt=""
        className="aspect-square h-full rounded-xl object-cover"
      />
    </div>
  );
};
