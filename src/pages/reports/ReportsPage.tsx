import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { FaRegBell } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdArrowOutward, MdOutlineAvTimer } from "react-icons/md";
import { IoStopwatchOutline } from "react-icons/io5";
import Header from "@/components/header/Header";
import Link from "@/components/custom/Link";

export default function ReportsPage() {
  return (
    <Wrapper>
      <WrapperContent className="h-dvh gap-2 overflow-y-auto sm:bg-muted/80">
        <Header />

        <ReportCard />
      </WrapperContent>
    </Wrapper>
  );
}

export const ReportCard = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-4 rounded-3xl sm:gap-6 sm:bg-background sm:p-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-primary-accent/40 p-4">
        <div className="flex items-center justify-between">
          <Button
            size="icon"
            className="rounded-full bg-primary-accent text-foreground"
            variant="secondary"
          >
            <FaRegBell className="" />
          </Button>
          <Button size="icon" className="rounded-full" variant="ghost">
            <MdArrowOutward />
          </Button>
        </div>
        <div className="mt-auto flex flex-col gap-4">
          <p className="text-5xl font-bold sm:text-6xl">19</p>
          <p className="text-base font-medium text-muted-foreground sm:text-lg">
            Today's
            <br />
            scheduled posts
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-4 rounded-2xl bg-foreground/90 p-4">
          <div className="flex items-center justify-between">
            <Button
              size="icon"
              className="rounded-full bg-muted-foreground text-background"
              variant="secondary"
            >
              <IoStopwatchOutline />
            </Button>
            <Button
              size="icon"
              className="rounded-full text-muted"
              variant="ghost"
            >
              <MdArrowOutward />
            </Button>
          </div>
          <Link to="/posts?status=draft">
          <div className="mt-4 flex flex-col gap-2 sm:mt-8">
            <p className="text-base font-medium text-background sm:text-xl">
             Draft Posts
            </p>
          </div></Link>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl bg-secondary-accent/40 p-4">
          <div className="flex items-center justify-between">
            <Button
              size="icon"
              className="rounded-full bg-secondary-accent text-foreground"
              variant="secondary"
            >
              <MdOutlineAvTimer />
            </Button>
            <Button size="icon" className="rounded-full" variant="ghost">
              <MdArrowOutward />
            </Button>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:mt-8">
            <p className="text-base font-medium sm:text-xl">Image Content</p>
          </div>
        </div>
      </div>
    </div>
  );
};
