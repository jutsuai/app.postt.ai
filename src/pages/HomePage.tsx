import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/Image";
import WrapperContent from "@/components/wrapper/WrapperContent";
import Header from "@/components/header/Header";
import { menus } from "@/components/dialog/CreateMenuDialog";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdArrowOutward, MdOutlineAvTimer } from "react-icons/md";
import { IoStopwatchOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function HomePage() {
  const [hasSchedulePost, setHasSchedulePost] = useState(false);
  return (
    <Wrapper>
      <WrapperContent className="gap-4 sm:bg-muted/80 h-dvh overflow-y-auto">
        <Header />
        <div className="flex items-start  flex-col gap-4 sm:gap-8 sm:px-4 w-full">
          <div className="flex  flex-col p-8 pb-0  bg-background rounded-2xl overflow-hidden gap-8 w-full shadow-2xl shadow-blue-500/10">
            <h2 className="text-2xl  font-semibold w-max whitespace-nowrap">
              Quick Access
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] w-full   gap-6">
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
          <div className="w-full flex gap-8 sm:flex-row flex-col">
            {hasSchedulePost ? (
              <div className="sm:bg-background h-fit flex flex-col gap-6 w-full  sm:p-8 rounded-2xl">
                <h3 className="font-semibold text-xl ">Upcoming posts</h3>
                <div className="flex flex-col gap-4">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 sm:p-3 h-28 border rounded-2xl"
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
            ) : (
              <div className="sm:bg-background h-fit sm:p-4 rounded-2xl w-full">
                <div className="flex flex-col mb-4">
                  <h3 className="font-semibold text-xl">Getting Started</h3>
                  <p className="text-muted-foreground text-sm">
                    Four simple steps to get everything up and running
                  </p>
                </div>
                <div className="flex flex-col gap-4 ">
                  {ideasData.map((item, index) => (
                    <div
                      key={index}
                      className="border p-2 sm:p-3 px-2 text-sm sm:text-base sm:px-4 rounded-2xl flex gap-3 items-center text-muted-foreground"
                    >
                      <div
                        className={cn(
                          "size-10 bg-primary-foreground rounded-full",
                          index === 0
                            ? "bg-primary-foreground"
                            : index === 1
                            ? "bg-foreground/80"
                            : "bg-secondary-accent"
                        )}
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="w-full max-w-xs h-fit bg-background pt-4 px-4 rounded-2xl flex flex-col gap-2">
              <h4 className="text-xl font-semibold ">Helpful Insights</h4>
              <div className="flex  transition-all duration-200 flex-col items-center gap-2 w-full h-full rounded-[3rem] p-3 rounded-b-none border-b-0">
                <div className="flex bg-primary-accent/60 overflow-y-hidden w-full h-full flex-col items-center justify-center gap-4 border  rounded-[2.5rem] rounded-b-none">
                  <Image
                    src="/dialog-menu/single-post-image.svg"
                    alt=""
                    className="w-full h-full transition-all duration-200 "
                    height={130}
                    width={160}
                  />
                </div>
                <h6 className="text-sm text-center font-medium py-1">
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
        className="flex  group/createCard transition-all duration-200 flex-col items-center gap-2 w-full h-full rounded-[3rem] p-3 rounded-b-none border-b-0"
        style={{
          boxShadow: "2px 40px 50px 10px rgba(74, 58, 255, 0.09)",
        }}
      >
        <div className="flex bg-primary-accent/60 overflow-y-hidden w-full h-full flex-col items-center justify-center gap-4 border  rounded-[2.5rem] rounded-b-none">
          <Image
            src={icon}
            alt={name}
            className="w-full h-full transition-all duration-200 group-hover/createCard:!translate-y-0 !translate-y-2"
            height={130}
            width={160}
          />
        </div>
        <h6 className="text-sm text-center font-medium py-1">{name}</h6>
      </div>
    </Link>
  );
}

const ideasData = [
  "Show me some color palettes for AI...",
  "Show me some color palettes for Al...",
  "What are the best mobile apps 2023...",
];
