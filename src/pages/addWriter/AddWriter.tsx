import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/Image";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { FiPlus } from "react-icons/fi";
import Header from "@/components/Header";
import { useState } from "react";
import { IoIosFlash } from "react-icons/io";

const writers = [
  {
    writer: "Blog Writer",
    avatar: "/homepage/blog-writer.png",
    platform: "Linkedin",
    description:
      "Crafting engaging and thought-provoking blog articles for professional readers.",
    tags: ["blog", "writer"],
    id: 1,
  },
  {
    writer: "Post Writer",
    avatar: "/homepage/post-writer.png",
    platform: "Twitter",
    description:
      "Creating concise, impactful posts to maximize social media reach and engagement.",
    tags: ["post", "reach"],
    id: 2,
  },

  {
    writer: "Script Writer",
    avatar: "/homepage/meme-writer.png",
    platform: "YouTube",
    description:
      "Writing captivating scripts to drive storytelling for videos and vlogs.",
    tags: ["video", "content"],
    id: 3,
  },
];

export default function AddWriter() {
  const [generateText, setGenerateText] = useState("");

  const handleSubmit = () => {};
  return (
    <Wrapper>
      <WrapperContent className="gap-4">
        <Header
          inputValue={generateText}
          setInputValue={setGenerateText}
          placeHolder="Write a title and let the AI generate"
          onClick={() => handleSubmit()}
          buttonText="Generate"
          buttonIcon={<IoIosFlash />}
        />

        <div className="flex flex-col gap-4 mt-6">
          <h6 className="text-lg font-semibold">Or Select a Writer</h6>
          <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {writers.map((writer) => (
              <WriterCard {...writer} />
            ))}
            <div className="border transition-all duration-200 active:border-primary shadow-md p-3 rounded-xl bg-background flex flex-col gap-2">
              <div className="flex items-center gap-4 ">
                <div className="w-14 aspect-square grid place-items-center rounded-lg bg-primary">
                  <FiPlus className="text-foreground size-8" />
                </div>
                <div className="flex-1">
                  <h6 className="text-lg font-semibold">Create Writer</h6>
                </div>
              </div>
              <p className="line-clamp-2 text-xs mt-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing aliqua.
              </p>
              <div className="flex gap-2 flex-wrap">
                {["Create", "Clone"]?.map((tag, index) => (
                  <Badge
                    className={cn(
                      "rounded-3xl font-normal text-[10px]",
                      index > 0 && "bg-secondary-accent text-black"
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}

function WriterCard({
  writer,
  avatar,
  platform,
  description,
  tags,
}: {
  writer: string;
  avatar: string;
  platform?: string;
  description: string;
  tags?: string[];
}) {
  return (
    <div className="border transition-all duration-200 active:border-primary  shadow-md p-3 rounded-xl bg-background flex flex-col gap-2">
      <div className="flex items-center gap-4 ">
        <div className="bg-muted flex-1 w-max rounded-lg">
          <Image src={avatar} alt="" className="min-w-16" />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <h6 className="text-base font-semibold ">{writer}</h6>
          <p className="text-muted-foreground text-xs">{platform}</p>
        </div>
      </div>
      <p className="line-clamp-2 text-xs mt-auto">{description}</p>
      <div className="flex gap-2 flex-wrap">
        {tags?.map((tag, index) => (
          <Badge
            className={cn(
              "rounded-3xl font-normal text-[10px] capitalize text-black",
              index > 0 && "bg-secondary-accent "
            )}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
