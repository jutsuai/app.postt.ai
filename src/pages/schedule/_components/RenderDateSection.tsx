import Link from "@/components/custom/Link";
import Image from "@/components/Image";
import BoringImage from "@/components/images/bordingImage";
import capitalizeFirstLetter from "@/lib/capitalizeFirstLetter";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function RenderDateSection({ section }: { section: any }) {
  return (
    <div className="relative z-10 mb-14 md:mb-0">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">
          {new Date(section.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h2>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {section?.slots?.length > 0 &&
          section.slots.map((slot: any) => (
            <RenderSlot key={slot.id} slot={slot} />
          ))}
      </div>
    </div>
  );
}

const RenderSlot = ({ slot }: { slot: any }) => {
  const [showAllPost, setShowAllPost] = useState(false);

  return (
    <div key={slot.id} className="mt-1 flex w-full gap-4">
      <div className="flex w-12 flex-col items-center">
        <span className="text-xs font-medium">{slot.time}</span>
        <span className="text-xs text-muted-foreground">AM</span>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="mt-3 h-px w-full bg-muted-foreground/20" />

        {/* {slot.posts.map(renderPost)} */}
        {slot.posts.map((post: any, index: any) => {
          if (!showAllPost && index > 2) return null;

          return <RenderPost post={post} />;
        })}

        {slot.posts.length > 3 && (
          <button
            className="rounded-lg py-2 text-xs transition hover:bg-primary/10"
            onClick={() => setShowAllPost((e: any) => !e)}
          >
            Show {showAllPost ? "Less" : "More"}
          </button>
        )}
      </div>
    </div>
  );
};

const RenderPost = ({ post }: { post: any }) => {
  return (
    <Link
      key={post.id}
      to={
        post.type === "carousel"
          ? `/create/carousel/${post?.contentReference}`
          : post?.type === "text"
            ? `/create/text/${post?._id}`
            : post?.type === "image"
              ? `/create/image/${post?._id}`
              : `#`
      }
      target="_blank"
      className={cn(
        "flex items-center gap-2 rounded-2xl bg-primary-foreground/15 p-2",
        "transition hover:bg-primary/10",
      )}
    >
      <div className="h-14 w-14 overflow-hidden rounded-lg">
        {(post?.type === "carousel" && (
          <Image
            src="https://img.freepik.com/free-psd/instagram-post-template_1393-166.jpg"
            alt=""
            className="h-full w-14 rounded-md object-cover object-center"
          />
        )) || (
          <BoringImage
            src={post?.media?.url}
            alt={capitalizeFirstLetter(post?.type)}
            className="h-16 w-16 rounded-lg object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <h3 className="line-clamp-1 text-sm font-semibold">
          {post.commentary}
        </h3>
        <p className="break-words text-xs capitalize text-muted-foreground">
          {`${post.platform} ${post.type} Post`}

          {post?.publishedAt && (
            <>
              {" - "}
              <span className="ml-1 rounded-full bg-primary/10 px-4 py-1 text-primary">
                Published
              </span>
            </>
          )}
        </p>
      </div>
    </Link>
  );
};
