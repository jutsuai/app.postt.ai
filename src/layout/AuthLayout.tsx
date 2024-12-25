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
            className="w-full absolute top-4"
          />
          <Image
            src="/postt-logo.svg"
            alt=""
            className="w-60 mx-auto my-auto"
          />
          <Image
            src="/onboarding/auth-model.png"
            alt=""
            className="absolute hidden lg:inline-block right-[32.2rem] bottom-0 z-20 drop-shadow-[20px_0px_20px_rgba(0,0,0,0.15)]"
          />
          <Image
            src="/onboarding/bg-accent-2.svg"
            alt=""
            className="w-full absolute bottom-4"
          />
        </div>
      </div>
      <div className="w-full relative z-10 md:max-w-xl h-full flex items-center sm:max-w-lg">
        <Outlet />
      </div>
    </div>
  );
}
