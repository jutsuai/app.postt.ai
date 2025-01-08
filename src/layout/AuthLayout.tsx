import Image from "@/components/Image";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="w-full max-h-[100dvh] h-full relative flex overflow-y-auto">
      <div className="z-10 flex-1 h-full relative flex-col flex items-center ">
        <Outlet />
        <p className="py-6 mt-auto text-xs text-muted-foreground uppercase ">
          &copy;{new Date().getFullYear()} All Right Reserved
        </p>
      </div>
      <div className="p-6 flex-1 min-h-[768px] max-h-full sticky top-0 lg:block hidden">
        <Image
          src="/background.svg"
          alt=""
          className="h-full w-full object-cover object-center  rounded-3xl"
        />
        <div className="absolute flex justify-center items-center inset-0 z-10"></div>
      </div>
    </div>
  );
}
