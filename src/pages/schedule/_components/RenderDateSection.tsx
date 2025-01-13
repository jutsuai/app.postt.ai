import Image from "@/components/Image";
import BoringImage from "@/components/images/bordingImage";
import capitalizeFirstLetter from "@/lib/capitalizeFirstLetter";

export default function RenderDateSection({ section }: { section: any }) {
  const renderPost = (post: any) => (
    <div
      key={post.id}
      className="flex items-center gap-4 rounded-2xl bg-primary-foreground/15 p-3"
    >
      {/* <Image
        src={post.image}
        alt={post.title}
        className="w-12 h-full rounded-lg object-cover"
      /> */}
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
      {/* <div className="h-14 w-14 rounded-lg bg-secondary-accent" /> */}

      <div className="flex flex-1 flex-col gap-1">
        <h3 className="line-clamp-1 text-sm font-semibold">
          {post.commentary}
        </h3>
        <p className="break-words text-xs capitalize text-muted-foreground">
          {`${post.platform} - ${post.type} Post`}
        </p>
      </div>
    </div>
  );

  const renderSlot = (slot: any) => (
    <div key={slot.id} className="mt-1 flex w-full gap-4">
      <div className="flex w-12 flex-col items-center">
        <span className="text-xs font-medium">{slot.time}</span>
        <span className="text-xs text-muted-foreground">AM</span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-px w-full bg-muted-foreground/20" />
        {slot.posts.map(renderPost)}
      </div>
    </div>
  );

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
        {section?.slots?.length > 0 && section.slots.map(renderSlot)}
      </div>
    </div>
  );
}
