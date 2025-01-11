import Image from "@/components/Image";

export default function SchedulePosts({ posts }: { posts: any[] }) {
  return (
    <div className="flex h-fit w-full flex-col gap-6 rounded-2xl sm:bg-background sm:p-8">
      <h3 className="text-xl font-semibold">Upcoming posts</h3>
      <div className="flex flex-col gap-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="flex h-28 items-center justify-between rounded-2xl border p-2 sm:p-3"
          >
            <div className="flex h-full flex-col p-2">
              <p className="text-xs font-medium opacity-90">
                04:03 via LinkedIn
              </p>
              <h6 className="text-lg font-semibold">{post?.status}</h6>
              <p className="mt-auto text-xs text-muted-foreground">
                6 photos 1 video
              </p>
            </div>

            <Image
              src="https://marketplace.canva.com/EAFoiVBMcvo/1/0/1600w/canva-blue-modern-quote-linkedin-post-VFBmLg0YoZg.jpg"
              alt=""
              className="aspect-square h-full rounded-xl object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
