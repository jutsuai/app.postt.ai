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
  return (
    <Wrapper>
      <div className=" h-20 pt-6 px-4 z-10 bg-background">
        <TopBar />
      </div>
      <WrapperContent className="items-center justify-center bg-background h-full pb-8 p-8 pt-0 gap-8 ">
        <div className="flex-1 min-h-fit z-10 bg-background relative overflow-hidden flex items-center flex-col justify-between w-full rounded-3xl shadow-2xl shadow-[#60a5fa45]">
          <div className="flex flex-col items-center gap-8 py-20">
            <HiSparkles className="text-4xl" />
            <h1 className="text-3xl font-semibold text-center">
              What do you want to post about today?
            </h1>
            <div className="flex items-center bg-muted p-1 rounded-full border">
              <button
                onClick={() => setInputType("text")}
                className={cn(
                  "p-1 flex items-center gap-1 text-sm rounded-full px-3",
                  inputType === "text" && "bg-primary-accent "
                )}
              >
                <RxText className="text-base" />
                Text
              </button>
              <button
                onClick={() => setInputType("link")}
                className={cn(
                  "p-1 flex items-center gap-1 text-sm rounded-full px-3",
                  inputType === "link" && "bg-primary-accent "
                )}
              >
                <RxLink2 className="text-base" /> Link
              </button>
            </div>
            <div className="bg-background z-10 flex items-center p-1 rounded-2xl w-full max-w-md focus-within:max-w-lg transition-all duration-200 border">
              <input
                type="text"
                placeholder="Enter your text here..."
                className="bg-transparent z-10 py-2 w-full px-3 pr-1 outline-none"
              />
              <Button className="" size="icon" variant="ghost">
                <AiOutlineSend />
              </Button>
            </div>
          </div>

          <div className="floating-background-blur-2 z-0 bottom-0 opacity-50 right-[25%]" />
          <div className="floating-background-blur-1 z-0 opacity-50 bottom-0 left-[25%]" />
        </div>

        <div className="flex items-center flex-col gap-4 py-6 w-full justify-center">
          <h3 className="text-lg font-semibold">Suggested topics for you</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] w-full  max-w-7xl gap-4">
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
    <div className="bg-background p-4 transition-all duration-200 rounded-2xl group/suggestedCard hover:shadow-md border cursor-pointer">
      <div className="flex items-center text-xs w-fit gap-2 bg-muted-foreground/20  p-2 py-1.5 rounded-lg">
        {icon}
        <p>{badge}</p>
      </div>
      <p className="text-sm text-muted-foreground group-hover/suggestedCard:text-foreground mt-4">
        {content}
      </p>
    </div>
  );
}
