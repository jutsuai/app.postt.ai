import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/Image";
import WrapperContent from "@/components/wrapper/WrapperContent";
import Header from "@/components/header/Header";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import SchedulePosts from "./_components/SchedulePosts";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/services/fetchPosts";
import { menus } from "@/dialog/CreateMenuDialog";

export default function HomePage() {
  const { data: posts, isLoading } = useQuery<any>({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  const hasSchedulePost = posts?.length > 0 ? true : false;

  return (
    <Wrapper>
      <WrapperContent className="h-dvh gap-4 overflow-y-auto sm:bg-muted/80">
        <Header />
        <div className="flex w-full flex-col items-start gap-4 sm:gap-8 sm:px-4">
          <div className="flex w-full flex-col gap-8 overflow-hidden rounded-2xl bg-background p-8 pb-0 shadow-2xl shadow-blue-500/10">
            <h2 className="w-max whitespace-nowrap text-2xl font-semibold">
              Quick Access
            </h2>
            <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
              {menus?.map((menu) => (
                <MenuCard
                  key={menu.name}
                  name={menu.name}
                  url={menu.url}
                  icon={menu.icon}
                />
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-8 sm:flex-row">
            {hasSchedulePost ? (
              <SchedulePosts posts={posts} />
            ) : (
              <div className="h-fit w-full rounded-2xl sm:bg-background sm:p-4">
                <div className="mb-4 flex flex-col">
                  <h3 className="text-xl font-semibold">Getting Started</h3>
                  <p className="text-sm text-muted-foreground">
                    Four simple steps to get everything up and running
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {ideasData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-2xl border p-2 px-2 text-sm text-muted-foreground sm:p-3 sm:px-4 sm:text-base"
                    >
                      <div
                        className={cn(
                          "size-10 rounded-full bg-primary-foreground",
                          index === 0
                            ? "bg-primary-foreground"
                            : index === 1
                              ? "bg-foreground/80"
                              : "bg-secondary-accent",
                        )}
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex h-fit w-full max-w-xs flex-col gap-2 rounded-2xl bg-background px-4 pt-4">
              <h4 className="text-xl font-semibold">Helpful Insights</h4>
              <div className="flex h-full w-full flex-col items-center gap-2 rounded-[3rem] rounded-b-none border-b-0 p-3 transition-all duration-200">
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-y-hidden rounded-[2.5rem] rounded-b-none border bg-primary-accent/60">
                  <Image
                    src="/dialog-menu/single-post-image.svg"
                    alt=""
                    className="h-full w-full transition-all duration-200"
                    height={130}
                    width={160}
                  />
                </div>
                <h6 className="py-1 text-center text-sm font-medium">
                  Accessibility in Social Media: 10 Tips for Inclusive Content
                </h6>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}

function MenuCard({
  name,
  url,
  icon,
}: {
  name: string;
  url: string;
  icon: any;
}) {
  return (
    <Link to={url}>
      <div
        className="group/createCard flex h-full w-full flex-col items-center gap-2 rounded-[3rem] rounded-b-none border-b-0 p-3 transition-all duration-200"
        style={{
          boxShadow: "2px 40px 50px 10px rgba(74, 58, 255, 0.09)",
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-y-hidden rounded-[2.5rem] rounded-b-none border bg-primary-accent/60">
          <Image
            src={icon}
            alt={name}
            className="h-full w-full !translate-y-2 transition-all duration-200 group-hover/createCard:!translate-y-0"
            height={130}
            width={160}
          />
        </div>
        <h6 className="py-1 text-center text-sm font-medium">{name}</h6>
      </div>
    </Link>
  );
}

const ideasData = [
  "Show me some color palettes for AI...",
  "Show me some color palettes for Al...",
  "What are the best mobile apps 2023...",
];
