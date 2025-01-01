import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { LuWandSparkles } from "react-icons/lu";

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
      <WrapperContent className="gap-6 sm:bg-muted/80 justify-center items-center sm:pb-8 sm:p-8 ">
        <div className="flex flex-col gap-8 sm:gap-12 items-center justify-center min-h-[calc(100dvh-4rem)] w-full bg-background p-4 sm:p-8 rounded-3xl">
          <h1 className="text-4xl md:text-[2.6rem] text-center font-medium">
            How can we{" "}
            <span className="bg-gradient-to-r from-foreground to-primary text-transparent bg-clip-text">
              assist
            </span>{" "}
            you today?
          </h1>

          <div className="w-full h-14 flex items-center pr-3 max-w-lg bg-muted focus-within:shadow-lg transition-all p-px rounded-full">
            <input
              type="text"
              placeholder="Write a Topic to generate a post"
              className="w-full h-full outline-none  px-4 bg-muted rounded-full"
            />
            <Button size="sm" className="rounded-full  px-8 py-5">
              <LuWandSparkles />
              Genarate
            </Button>
          </div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
            {configData.map((item, index) => (
              <PostCard {...item} key={index} />
            ))}
          </div>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}

function PostCard({
  header,
  subheader,
  onClick,
  options,
}: {
  header: string;
  subheader: string;
  onClick?: () => void;
  options: string[];
}) {
  return (
    <div
      onClick={onClick}
      className="p-5 flex flex-col gap-2 border rounded-2xl shadow hover:shadow-lg cursor-pointer transition"
    >
      <h2 className="text-xl font-medium">{header}</h2>
      <p className="mt-8 text-sm text-muted-foreground">{subheader}</p>
      {/* <Separator /> */}
      <Select defaultValue={options[0]}>
        <SelectTrigger className="w-full rounded-full bg-muted">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          {options.map((option, index) => (
            <SelectItem
              key={index}
              className="rounded-full capitalize focus:text-background focus:bg-primary-foreground"
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
