import Image from "@/components/Image";
import { Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext"
import BoringAvatar from "@/components/BoringAvatar";


export default function AuthLayout() {
  const { user } = useAuth();
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
        <div className="absolute flex justify-center items-center inset-0 z-10">
        <div className="relative z-20 w-full max-w-lg">
        <Image
          src="/linkedinCard.svg"
          alt=""
          className="w-full"
        />
        <div className="flex items-center gap-3 z-30 absolute top-14 left-10">
        <BoringAvatar
           src={user.avatar} 
           alt={user.username}
           className="h-12 w-12"/>
           <p className="text-lg font-medium">{user.firstName} {user.lastName}</p>

        </div>
          
          

        </div>
        </div>
      </div>
    </div>
  );
}
