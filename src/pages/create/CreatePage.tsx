import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { HiSparkles } from "react-icons/hi2";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { LuWandSparkles } from "react-icons/lu";
import Header from "@/components/header/Header";
import TopBar from "@/components/header/TopBar";

const configData = [
  {
    header: "Tone",
    subheader: "Select the tone that best matches your content",
    options: ["Professional", "Friendly", "Casual", "Serious", "Engaging"],
  },
  {
    header: "Post Type",
    subheader: "Choose the type of post you want to create",
    options: ["Detailed", "Promotional", "Informative", "Interactive"],
  },
  {
    header: "Writing Style",
    subheader: "Pick a writing style to match your audience",
    options: ["Formal", "Conversational", "Storytelling", "Technical"],
  },
];

export default function CreatePage() {
  return (
    <Wrapper>
      <div className=" h-20 pt-6 px-4 z-10 bg-background">
        <TopBar />
      </div>
      <WrapperContent className="items-center justify-center bg-background h-full pb-8 p-8 gap-8 ">
        <div
          className="flex-1 z-10 bg-background relative overflow-hidden flex items-center flex-col  justify-between w-full rounded-3xl"
          // style={{
          //   boxShadow: "0px 0px 30px 0px #60a5fa5a",
          // }}
        >
          <div className="flex flex-col items-center gap-8 pt-32">
            <HiSparkles className="text-4xl" />
            <h1 className="text-3xl font-semibold text-center">
              Mark,
              <br /> What do you want to create?
            </h1>
          </div>
          <div className="w-full pb-20 md:max-w-[80%] flex flex-col gap-4 z-10">
            <h2 className="font-semibold text-sm  text-muted-foreground">
              Suggestions on what to ask Our AI
            </h2>
            <div className="flex flex-wrap items-center gap-6">
              {suggestions.map((suggestion, index) => (
                <SuggestionCard key={index} content={suggestion} />
              ))}
            </div>
          </div>
          <div className="floating-background-blur-2 z-0 bottom-20 opacity-40 right-[25%]" />
          <div className="floating-background-blur-1 z-0 opacity-40 bottom-20 left-[25%]" />
        </div>
        <div
          className="p-8 z-10 bg-background  rounded-3xl w-full"
          // style={{
          //   boxShadow: "0px 0px 30px 0px #60a5fa5a",
          // }}
        >
          <input
            type="text"
            placeholder="Ask me anything about your projects"
            className="bg-muted p-4 rounded-xl w-full outline-none"
          />
        </div>
        <div className="floating-background-blur-1 !bg-[#60a5fa] z-0 opacity-25 !w-full !h-full bottom-0" />
      </WrapperContent>
    </Wrapper>
  );
}

function SuggestionCard({
  content,
  onClick,
}: {
  content: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="py-4 px-6 rounded-xl text-sm border border-background font-medium hover:shadow-md transition-all bg-background"
    >
      {content}
    </button>
  );
}

const suggestions = [
  "What can I ask you to do?",
  "What can you help me with?",
  "How can you assist me?",
  "What can you do for me?",
];
