import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoBell } from "react-icons/go";
import { IoIosFlash, IoIosSearch } from "react-icons/io";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/Image";

import { Badge } from "@/components/ui/badge";
import { BsPlusSquare } from "react-icons/bs";

const writers = [
  {
    writer: "Blog Writer",
    avatar: "/homepage/blog-writer.png",
    platform: "Linkedin",
    desciption: "Lorem ipsum dolor sit amet, consectetur adipiscing aliqua.",
    tags: ["blog", "writer"],
  },
  {
    writer: "Post Writer",
    avatar: "/homepage/post-writer.png",
    platform: "Linkedin",
    desciption: "Lorem ipsum dolor sit amet, consectetur adipiscing aliqua.",
    tags: ["blog", "writer"],
  },
  {
    writer: "Meme Writer",
    avatar: "/homepage/meme-writer.png",
    platform: "Linkedin",
    desciption: "Lorem ipsum dolor sit amet, consectetur adipiscing aliqua.",
    tags: ["blog", "writer"],
  },
];

export default function HomePage() {
  return (
    <Wrapper>
      <div className="p-4 pb-20 flex flex-col gap-4">
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
        <h1 className="text-3xl font-semibold mt-4">
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

        <div className="flex flex-col gap-4 mt-4">
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
                {["Create", "Clone"]?.map((tag) => (
                  <Badge className="rounded-3xl font-normal text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

function WriterCard({
  writer,
  avatar,
  platform,
  desciption,
  tags,
}: {
  writer: string;
  avatar: string;
  platform?: string;
  desciption: string;
  tags?: string[];
}) {
  return (
    <div className="border transition-all duration-200 active:border-primary  shadow-md p-3 rounded-xl bg-background flex flex-col gap-2">
      <div className="flex items-center gap-4 ">
        <div className="bg-muted flex-1 w-fit rounded-lg">
          <Image src={avatar} alt="" className="" />
        </div>
        <div className="flex-1">
          <h6 className="text-lg font-semibold">{writer}</h6>
          <p className="text-muted-foreground text-sm">{platform}</p>
        </div>
      </div>
      <p className="line-clamp-2 text-xs mt-auto">{desciption}</p>
      <div className="flex gap-2 flex-wrap">
        {tags?.map((tag) => (
          <Badge className="rounded-3xl font-normal text-[10px]">{tag}</Badge>
        ))}
      </div>
    </div>
  );
}
