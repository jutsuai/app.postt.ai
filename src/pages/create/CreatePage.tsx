import { HiSparkles } from "react-icons/hi2";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";

import TopBar from "@/components/header/TopBar";
import { RxText, RxLink2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { AiOutlineSend } from "react-icons/ai";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaFire } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

const topics = [
  {
    content: "How to create a carousel post on LinkedIn",
    badge: "Trending",
    icon: <FaFire className="text-red-500" />,
  },
  {
    content: "How to create a carousel post on LinkedIn",
    badge: "Popular",
    icon: <HiSparkles className="text-yellow-500" />,
  },
  {
    content: "How to create a carousel post on LinkedIn",
    badge: "New",
    icon: <RxText className="text-blue-500" />,
  },
  {
    content: "How to create a carousel post on LinkedIn",
    badge: "Hot",
    icon: <AiOutlineSend className="text-green-500" />,
  },
];

export default function CreateTextPage() {
  const [inputType, setInputType] = useState<"text" | "link">("text");

  // get type ffrom  url  params
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <Wrapper>
      <div className="z-10 h-20 bg-background px-4 pt-6">
        <TopBar />
      </div>
      <WrapperContent className="h-full items-center justify-center gap-8 bg-background p-8 pb-8 pt-0">
        <div className="relative z-10 flex min-h-fit w-full flex-1 flex-col items-center justify-between overflow-hidden rounded-3xl bg-background shadow-2xl shadow-[#60a5fa45]">
          <div className="flex flex-col items-center gap-8 py-20">
            <HiSparkles className="text-4xl" />
            <h1 className="text-center text-3xl font-semibold">
              What do you want to post about today?
            </h1>
            <div className="flex items-center rounded-full border bg-muted p-1">
              <button
                onClick={() => setInputType("text")}
                className={cn(
                  "flex items-center gap-1 rounded-full p-1 px-3 text-sm",
                  inputType === "text" && "bg-primary-accent",
                )}
              >
                <RxText className="text-base" />
                Text
              </button>
              <button
                onClick={() => setInputType("link")}
                className={cn(
                  "flex items-center gap-1 rounded-full p-1 px-3 text-sm",
                  inputType === "link" && "bg-primary-accent",
                )}
              >
                <RxLink2 className="text-base" /> Link
              </button>
            </div>
            <div className="z-10 flex w-full max-w-md items-center rounded-2xl border bg-background p-1 transition-all duration-200 focus-within:max-w-lg">
              <input
                type="text"
                placeholder="Enter your text here..."
                className="z-10 w-full bg-transparent px-3 py-2 pr-1 outline-none"
              />

              <Link to={`/create/${type}`}>
                <Button className="" size="icon" variant="ghost">
                  <AiOutlineSend />
                </Button>
              </Link>
            </div>
          </div>

          <div className="floating-background-blur-2 bottom-0 right-[25%] z-0 opacity-50" />
          <div className="floating-background-blur-1 bottom-0 left-[25%] z-0 opacity-50" />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 py-6">
          <h3 className="text-lg font-semibold">Suggested topics for you</h3>
          <div className="grid w-full max-w-7xl grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            {topics.map((topic, index) => (
              <SuggestedTopic
                key={index}
                content={topic.content}
                badge={topic.badge}
                icon={topic.icon}
              />
            ))}
          </div>
        </div>

        {/* <div className="floating-background-blur-1 !bg-[#60a5fa] z-0 opacity-25 !w-full !h-full bottom-0" /> */}
      </WrapperContent>
    </Wrapper>
  );
}

function SuggestedTopic({
  content,
  icon,
  badge,
}: {
  content: string;
  icon: any;
  badge: string;
}) {
  return (
    <div className="group/suggestedCard cursor-pointer rounded-2xl border bg-background p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex w-fit items-center gap-2 rounded-lg bg-muted-foreground/20 p-2 py-1.5 text-xs">
        {icon}
        <p>{badge}</p>
      </div>
      <p className="mt-4 text-sm text-muted-foreground group-hover/suggestedCard:text-foreground">
        {content}
      </p>
    </div>
  );
}
