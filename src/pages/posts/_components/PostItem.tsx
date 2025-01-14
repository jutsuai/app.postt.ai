import Link from "@/components/custom/Link";
import Image from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import httpClient from "@/lib/httpClient";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import BoringImage from "@/components/images/bordingImage";
import capitalizeFirstLetter from "@/lib/capitalizeFirstLetter";

const iconLogos: any = {
  linkedin:
    "https://upload.wikimedia.org/wikipedia/commons/f/f8/LinkedIn_icon_circle.svg",
};

export default function PostItem({ post, className, pageType }: { post: any, className?: string;pageType?: string }) {
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
    <Link className="h-fit min-h-max"  to={
      post.type === "carousel"
        ? `/create/carousel/${post?.contentReference}`
        : post?.type === "text"
          ? `/create/text/${post?._id}`
          : post?.type === "image"
            ? `/create/image/${post?._id}`
            : `#`
    }>
    <div className={cn("flex h-full items-end justify-between gap-2 overflow-hidden rounded-2xl p-6 pb-3 shadow-[2px_10px_40px_10px_#4a3aff16] transition-all duration-200 hover:shadow-[2px_0px_40px_30px_#4a3aff16]", className)}>
      <div className="flex h-full w-full flex-col gap-2">
        <div className="mb-2 flex h-full flex-col gap-3">
          <div className="flex items-center gap-1">
            <Image src={iconLogos[post?.platform]} alt="" className="h-4 w-4" />

            <h6 className="text-xs font-medium capitalize">{post?.platform}</h6>
            <span className="text-xs">•</span>
            <p className="text-xs font-semibold leading-none text-muted-foreground">
              {moment(post?.updatedAt || post?.createdAt).fromNow()}
            </p>
          </div>

          <div className="flex items-start justify-between gap-3">
            <h6 className={cn("line-clamp-2  ",
              pageType === "home" ?"text-base font-medium":"text-xl font-semibold"
            )}>
              {post?.commentary ? post?.commentary : "No caption"}
            </h6>

            {(post?.type === "carousel" || post?.type === "image" && (
              <Image
                src="https://img.freepik.com/free-psd/instagram-post-template_1393-166.jpg"
                alt=""
                className={cn("h-full  rounded-md object-cover object-center",
                  pageType === "home" ? "w-10" : "w-14"
                )}
              />
            ))
              // || (
              // <BoringImage
              //   src={post?.media?.url}
              //   alt={capitalizeFirstLetter(post?.type)}
              //   className={cn("h-14 w-14 rounded-lg object-cover",
              //     pageType === "home" ? "w-10" : "w-14"
              //   )}
              // />)
            }
          </div>
        </div>

        <Separator className="my-1" />

        <div className="flex items-center justify-between">
          <Badge variant='secondary' className="rounded-full border-none capitalize text-foreground">{post?.type}</Badge>
          <Badge
            variant="outline"
            className={cn(
              "rounded-full border-none capitalize text-background",

              post?.status === "failed" && "bg-red-500/15 text-red-500",
              post?.status === "draft" && "bg-yellow-500/15 text-yellow-500",
              post?.status === "scheduled" && "bg-green-500/10 text-green-500",
              post?.status === "published" && "bg-primary/15 text-primary",
            )}
          >
            {post?.status === "scheduled"
              ? `scheduled ${moment(post?.scheduledAt).fromNow()}`
              : post?.status}
          </Badge>

          {/* <Link
            to={
              post.type === "carousel"
                ? `/create/carousel/${post?.contentReference}`
                : post?.type === "text"
                  ? `/create/text/${post?._id}`
                  : post?.type === "image"
                    ? `/create/image/${post?._id}`
                    : `#`
            }
          >
            <Button variant="link" size="sm">
              View <MdArrowOutward />
            </Button>
          </Link> */}
        </div>
      </div>
    </div></Link>
  );
}
