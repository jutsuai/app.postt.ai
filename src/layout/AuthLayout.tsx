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
      <div className="flex-1 p-6 pr-10 h-full lg:block hidden">
        <Image
          src="/newcover.jpeg"
          alt=""
          className="h-full w-full object-cover object-center -mr-10 rounded-3xl"
        />
      </div>
    </div>
  );
}
