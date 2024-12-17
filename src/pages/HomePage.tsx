import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoBell } from "react-icons/go";
import { IoIosFlash, IoIosSearch } from "react-icons/io";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/Image";

import { Badge } from "@/components/ui/badge";
import { BsPlusSquare } from "react-icons/bs";
import { cn } from "@/lib/utils";
import WrapperContent from "@/components/wrapper/WrapperContent";

const writers = [
  {
    writer: "Blog Writer",
    avatar: "/homepage/blog-writer.png",
    platform: "Linkedin",
    description:
      "Crafting engaging and thought-provoking blog articles for professional readers.",
    tags: ["blog", "writer"],
  },
  {
    writer: "Post Writer",
    avatar: "/homepage/post-writer.png",
    platform: "Twitter",
    description:
      "Creating concise, impactful posts to maximize social media reach and engagement.",
    tags: ["post", "reach"],
  },

  {
    writer: "Script Writer",
    avatar: "/homepage/blog-writer.png",
    platform: "YouTube",
    description:
      "Writing captivating scripts to drive storytelling for videos and vlogs.",
    tags: ["video", "content"],
  },
  {
    writer: "Copywriter",
    avatar: "/homepage/post-writer.png",
    platform: "Instagram",
    description:
      "Crafting compelling captions and content to convert audiences into loyal followers.",
    tags: ["social", "marketing"],
  },
  {
    writer: "Technical Writer",
    avatar: "/homepage/meme-writer.png",
    platform: "Medium",
    description:
      "Explaining complex concepts in simple, clear, and engaging technical articles.",
    tags: ["tech", "documentation"],
  },
  {
    writer: "Ghost Writer",
    avatar: "/homepage/blog-writer.png",
    platform: "Personal Blogs",
    description:
      "Writing in the background to bring someone else's vision to life seamlessly.",
    tags: ["ghost", "writing"],
  },

  {
    writer: "SEO Writer",
    avatar: "/homepage/meme-writer.png",
    platform: "Company Blogs",
    description:
      "Optimizing content to rank higher on search engines and attract organic traffic.",
    tags: ["SEO", "optimization"],
  },
];

export default function HomePage() {
  return (
    <Wrapper>
      <WrapperContent className="gap-4">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/300" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-xl font-semibold">Discover</h4>
              <p className="text-muted-foreground text-xs">
                Enjoy automatic content
              </p>
            </div>
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <GoBell />
          </Button>
        </div>
        <h1 className="text-3xl font-semibold mt-6">
          Discover Talented
          <br />
          <span className="text-primary">Content Creators</span>
        </h1>
        <div className="flex  items-center bg-muted rounded-3xl justify-between h-12">
          <div className="w-20 h-full grid place-items-center text-muted-foreground">
            <IoIosSearch className="text-2xl" />
          </div>
          <input
            type="text"
            placeholder="Write a title and let the AI generate"
            className="w-full pr-4 h-full py-2 bg-transparent outline-none border-none text-sm"
          />
          <Button size="sm" className="rounded-3xl mr-2">
            <IoIosFlash />
            Generate
          </Button>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <h6 className="text-lg font-semibold">Or Select a Writer</h6>
          <div className="grid grid-cols-2 gap-4">
            {writers.map((writer) => (
              <WriterCard {...writer} />
            ))}
            <div className="border transition-all duration-200 active:border-primary shadow-md p-3 rounded-xl bg-background flex flex-col gap-2">
              <div className="flex items-center gap-4 ">
                <div className="w-14 aspect-square grid place-items-center rounded-lg bg-primary">
                  <BsPlusSquare className="text-white size-10" />
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
                      index > 0 && "bg-[#CDF202] text-black"
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
              "rounded-3xl font-normal text-[10px] capitalize",
              index > 0 && "bg-[#CDF202] text-black"
            )}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
