import Image from "@/components/Image";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className=" w-dvw h-dvh min-h-[768px]  flex items-center">
      <div className="w-full relative z-10  flex-1 h-full flex-col flex items-center justify-center">
        <Outlet />
        <p className="absolute bottom-4 text-xs text-muted-foreground uppercase ">
          &copy;{new Date().getFullYear()} All Right Reserved
        </p>
      </div>
      <div className="flex-1 p-6 h-full lg:block hidden">
        <div className="rounded-3xl h-full p-8 bg-primary-foreground/60 relative  overflow-x-hidden">
          <div className="flex flex-col justify-between py-16  h-full">
            <Image
              src="/onboarding/bg-accent-1.svg"
              alt=""
              className="w-full absolute top-6 left-0 right-0"
            />
            <Image
              src="/onboarding/auth-model.png"
              alt=""
              className="absolute h-[100%] hidden md:inline-block bottom-0 right-0 xl:-translate-x-20 z-20 drop-shadow-[20px_0px_20px_rgba(0,0,0,0.15)]"
            />
            <Image
              src="/onboarding/bg-accent-2.svg"
              alt=""
              className="w-full absolute bottom-6 left-0 right-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
