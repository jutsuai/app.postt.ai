import Image from "@/components/Image";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="h-dvh w-dvw overflow-hidden bg-primary-foreground/60 relative flex items-center">
      <div className="sm:h-full sm:block hidden flex-1 overflow-x-hidden">
        <div className="flex flex-col justify-between py-16  h-full">
          <Image
            src="/onboarding/bg-accent-1.svg"
            alt=""
            className="w-full min-w-[1024px]"
          />
          <Image src="/postt-logo.svg" alt="" className="w-52 mx-auto" />
          <Image
            src="/onboarding/bg-accent-2.svg"
            alt=""
            className="w-full min-w-[1024px]"
          />
        </div>
      </div>
      <div className="w-full md:max-w-xl h-full flex items-center sm:max-w-lg">
        <Outlet />
      </div>
    </div>
  );
}
