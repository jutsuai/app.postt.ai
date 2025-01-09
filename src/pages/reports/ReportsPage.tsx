import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { FaRegBell } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdArrowOutward, MdOutlineAvTimer } from "react-icons/md";
import { IoStopwatchOutline } from "react-icons/io5";
import Header from "@/components/header/Header";

export default function ReportsPage() {
  return (
    <Wrapper>
      <WrapperContent className="gap-2 sm:bg-muted/80 h-dvh overflow-y-auto">
        <Header />

        <div className="grid grid-cols-2 w-full sm:bg-background sm:p-6 rounded-3xl gap-4 sm:gap-6">
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
              <div className="flex flex-col gap-2 mt-4 sm:mt-8">
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
                <Button size="icon" className="rounded-full " variant="ghost">
                  <MdArrowOutward />
                </Button>
              </div>
              <div className="flex flex-col gap-2 mt-4 sm:mt-8">
                <p className="text-base sm:text-xl font-medium">
                  Image Content
                </p>
              </div>
            </div>
          </div>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
