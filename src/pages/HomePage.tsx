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
import { MdArrowOutward, MdOutlineAvTimer } from "react-icons/md";
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

        <div className="flex items-start md:flex-row flex-col gap-8 sm:px-4">
          <div className="grid grid-cols-2 w-full bg-background p-8 rounded-3xl flex-1 gap-8">
            <div className="flex flex-col gap-4 bg-primary-accent/40 p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <Button
                  size="icon"
                  className="rounded-full size-12 text-foreground bg-primary-accent"
                  variant="secondary"
                >
                  <FaRegBell className="" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full size-12"
                  variant="ghost"
                >
                  <MdArrowOutward />
                </Button>
              </div>
              <div className="flex flex-col gap-4 mt-auto">
                <p className="text-7xl font-bold">19</p>
                <p className="text-muted-foreground font-medium text-xl">
                  Today's
                  <br />
                  scheduled posts
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col gap-4 bg-foreground/90 p-4  rounded-2xl">
                <div className="flex items-center justify-between">
                  <Button
                    size="icon"
                    className="rounded-full text-background bg-muted-foreground"
                    variant="secondary"
                  >
                    <IoStopwatchOutline />
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-full text-muted size-12"
                    variant="ghost"
                  >
                    <MdArrowOutward />
                  </Button>
                </div>
                <div className="flex flex-col gap-2 mt-8">
                  <p className="text-xl font-medium text-background">
                    Video Content
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 bg-secondary-accent/40 p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <Button
                    size="icon"
                    className="rounded-full text-foreground bg-secondary-accent"
                    variant="secondary"
                  >
                    <MdOutlineAvTimer />
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-full size-12"
                    variant="ghost"
                  >
                    <MdArrowOutward />
                  </Button>
                </div>
                <div className="flex flex-col gap-2 mt-8">
                  <p className="text-xl font-medium">Image Content</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background h-full flex flex-col gap-6 w-full flex-1 p-8 rounded-2xl">
            <h3 className="font-semibold text-xl ">Upcoming posts</h3>
            <div className="flex flex-col gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 h-28 border rounded-2xl"
                >
                  <div className="flex flex-col h-full p-2">
                    <p className="text-xs font-medium opacity-90">
                      04:03 via LinkedIn
                    </p>
                    <h6 className="text-lg font-semibold">Matrial</h6>
                    <p className="text-muted-foreground text-xs mt-auto">
                      6 photos 1 video
                    </p>
                  </div>
                  <Image
                    src="https://marketplace.canva.com/EAFoiVBMcvo/1/0/1600w/canva-blue-modern-quote-linkedin-post-VFBmLg0YoZg.jpg"
                    alt=""
                    className="h-full aspect-square object-cover rounded-xl "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
