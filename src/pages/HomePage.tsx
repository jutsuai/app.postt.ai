import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/Image";
import WrapperContent from "@/components/wrapper/WrapperContent";
import Header from "@/components/header/Header";
import { FaRegBell } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdArrowOutward, MdOutlineAvTimer } from "react-icons/md";
import { IoStopwatchOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <Wrapper>
      <WrapperContent className="gap-6 bg-muted/80 h-dvh overflow-y-auto">
        <Header />

        <div className="flex items-start lg:flex-row flex-col gap-8 sm:px-4 w-full">
          <div className="flex flex-col gap-8 flex-grow w-full">
            <div className="grid grid-cols-2 w-full bg-background p-4 sm:p-8 rounded-3xl gap-4 sm:gap-6">
              <div className="flex flex-col gap-4 bg-primary-accent/40 p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <Button
                    size="icon"
                    className="rounded-full  text-foreground bg-primary-accent"
                    variant="secondary"
                  >
                    <FaRegBell className="" />
                  </Button>
                  <Button size="icon" className="rounded-full " variant="ghost">
                    <MdArrowOutward />
                  </Button>
                </div>
                <div className="flex flex-col gap-4 mt-auto">
                  <p className="sm:text-6xl text-5xl font-bold">19</p>
                  <p className="text-muted-foreground font-medium text-base sm:text-lg">
                    Today's
                    <br />
                    scheduled posts
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:gap-6 gap-4">
                <div className="flex flex-col gap-4 bg-foreground/90 p-4 rounded-2xl">
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
                      className="rounded-full text-muted "
                      variant="ghost"
                    >
                      <MdArrowOutward />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2 mt-8">
                    <p className="text-base sm:text-xl font-medium text-background">
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
                      className="rounded-full "
                      variant="ghost"
                    >
                      <MdArrowOutward />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2 mt-8">
                    <p className="text-base sm:text-xl font-medium">
                      Image Content
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background p-4 sm:p-8 rounded-2xl w-full">
              <h3 className="font-semibold text-xl mb-4">Ideas</h3>
              <div className="flex flex-col gap-4 ">
                {ideasData.map((item, index) => (
                  <div
                    key={index}
                    className="border p-3 px-4 rounded-2xl flex gap-3 items-center text-muted-foreground"
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
          </div>
          <div className="bg-background flex-shrink h-full flex flex-col gap-6 w-full p-4 sm:p-8 rounded-2xl">
            <h3 className="font-semibold text-xl ">Upcoming posts</h3>
            <div className="flex flex-col gap-4">
              {[...Array(4)].map((_, index) => (
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
        </div>
      </WrapperContent>
    </Wrapper>
  );
}

const ideasData = [
  "Show me some color palettes for AI...",
  "Show me some color palettes for Al...",
  "What are the best mobile apps 2023...",
];
