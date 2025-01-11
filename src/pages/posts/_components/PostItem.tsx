import Link from "@/components/custom/Link";
import Image from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import httpClient from "@/lib/httpClient";
import { cn } from "@/lib/utils";
import moment from "moment";
import React, { useState } from "react";
import { LiaShareSolid } from "react-icons/lia";
import { MdArrowOutward } from "react-icons/md";
import { SlLike } from "react-icons/sl";
import { TfiCommentAlt } from "react-icons/tfi";

const iconLogos: any = {
  linkedin:
    "https://upload.wikimedia.org/wikipedia/commons/f/f8/LinkedIn_icon_circle.svg",
};

export default function PostItem({ post }: { post: any }) {
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
    <div
      className="flex items-end justify-between gap-2 overflow-hidden rounded-2xl p-6"
      style={{
        boxShadow: "2px 10px 40px 10px rgba(74, 58, 255, 0.09)",
      }}
    >
      <div className="flex h-full w-full flex-col gap-2">
        <div className="mb-8 flex h-full flex-col gap-2">
          <div className="flex items-center gap-1">
            {/* <div className="h-8 w-8 rounded-full border bg-background p-1.5"> */}
            <Image src={iconLogos[post?.platform]} alt="" className="h-4 w-4" />
            {/* </div> */}

            <h6 className="text-xs font-medium capitalize">{post?.platform}</h6>
            <span className="text-xs">•</span>
            <p className="text-xs font-semibold leading-none text-muted-foreground">
              {moment(post?.updatedAt || post?.createdAt).fromNow()}
            </p>
          </div>

          <h6 className="line-clamp-2 text-xl font-semibold">
            {post?.commentary ? post?.commentary : "No caption"}
          </h6>
        </div>

        <Badge className="w-fit rounded-full" variant="outline">
          4 Attachments
        </Badge>

        <Separator className="my-1" />
        <div className="flex items-center justify-between">
          {post?.status === "success" ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-xs font-medium">
                <SlLike className="-scale-x-[1] text-sm" />
                10
              </div>
              <div className="flex items-center gap-1 text-xs font-medium">
                <TfiCommentAlt className="-scale-x-[1] text-sm" />4
              </div>
              <div className="flex items-center gap-1 text-xs font-medium">
                <LiaShareSolid className="text-sm" />1
              </div>
            </div>
          ) : (
            <Badge
              variant="outline"
              className={cn(
                "rounded-full border-none capitalize text-background",
                post?.status === "scheduled" && "bg-primary",

                post?.status === "failed" && "bg-error",
                post?.status === "draft" && "bg-yellow-500/60",
              )}
            >
              {post?.status}
            </Badge>
          )}
          <Link to={`/create/carousel/${post?.contentReference}`}>
            <Button variant="link" size="sm">
              View <MdArrowOutward />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
