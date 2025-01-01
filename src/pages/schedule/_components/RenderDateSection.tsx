export default function RenderDateSection({ section }: { section: any }) {
  const renderPost = (post: any) => (
    <div
      key={post.id}
      className="flex items-center gap-2 bg-primary-foreground/15 p-3 rounded-2xl"
    >
      {/* <Image
        src={post.image}
        alt={post.title}
        className="w-12 h-full rounded-lg object-cover"
      /> */}
      <div className="w-14 h-14 bg-secondary-accent rounded-lg" />

      <div className="flex flex-col gap-1 flex-1">
        <h3 className="text-sm font-semibold">{post.title}</h3>
        <p className="text-xs text-muted-foreground break-words">
          {`${post.platform} - ${post.caption}`}
        </p>
      </div>
    </div>
  );

  const renderSlot = (slot: any) => (
    <div key={slot.id} className="flex gap-4 mt-1 w-full">
      <div className="w-12 flex flex-col items-center">
        <span className="text-xs font-medium">{slot.time}</span>
        <span className="text-xs text-muted-foreground">AM</span>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="w-full h-px bg-muted-foreground/20" />
        {slot.posts.map(renderPost)}
      </div>
    </div>
  );

  return (
    <div className="mb-14 md:mb-0 relative z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold ">
          {new Date(section.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h2>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {section?.slots?.length > 0 && section.slots.map(renderSlot)}
      </div>
    </div>
  );
}
