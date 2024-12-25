import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/Image";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { FiPlus } from "react-icons/fi";
import Header from "@/components/header/Header";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { FaRegBell } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdOutlineAvTimer } from "react-icons/md";
import { IoStopwatchOutline } from "react-icons/io5";

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

export default function HomePage() {
  return (
    <Wrapper>
      <WrapperContent className="gap-4 bg-muted/80 h-dvh overflow-y-auto">
        <Header />

        <div className="grid sm:grid-cols-8 gap-8  sm:px-4">
          <div className="grid grid-cols-2 bg-background p-4 rounded-2xl col-span-5 gap-4">
            <div className="flex flex-col gap-4 bg-primary-accent/40 p-4 rounded-3xl">
              <div className="flex items-center justify-between">
                <Button
                  size="icon"
                  className="rounded-full text-foreground bg-primary-accent"
                  variant="secondary"
                >
                  <FaRegBell />
                </Button>
                <Button size="icon" className="rounded-full" variant="ghost">
                  <BsThreeDotsVertical />
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-3xl font-bold">19</p>
                <p className="text-muted-foreground text-xs">
                  Today's
                  <br />
                  scheduled posts
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col gap-4 bg-foreground/90 p-4 rounded-3xl">
                <div className="flex items-center justify-between">
                  <Button
                    size="icon"
                    className="rounded-full text-background bg-muted-foreground"
                    variant="secondary"
                  >
                    <IoStopwatchOutline />
                  </Button>
                  <Button size="icon" className="rounded-full" variant="ghost">
                    <BsThreeDotsVertical />
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-3xl font-bold text-background">5</p>
                  <p className="text-muted/60 text-xs">
                    Total
                    <br />
                    draft posts
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 bg-secondary-accent/40 p-4 rounded-3xl">
                <div className="flex items-center justify-between">
                  <Button
                    size="icon"
                    className="rounded-full text-foreground bg-secondary-accent"
                    variant="secondary"
                  >
                    <MdOutlineAvTimer />
                  </Button>
                  <Button size="icon" className="rounded-full" variant="ghost">
                    <BsThreeDotsVertical />
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-3xl font-bold">5</p>
                  <p className="text-muted-foreground text-xs">
                    Total
                    <br />
                    draft posts
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background h-full w-full col-span-3 p-4 rounded-2xl">
            <h3 className="font-semibold text-lg ">Upcoming posts</h3>
          </div>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
