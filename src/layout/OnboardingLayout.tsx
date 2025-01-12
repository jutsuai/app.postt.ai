import Image from "@/components/Image";
import { Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";
import BoringAvatar from "@/components/images/BoringAvatar";

export default function OnboardingLayout() {
  const { user } = useAuth();
  return (
    <div className="relative flex h-full max-h-[100dvh] w-full overflow-y-auto">
      <div className="relative z-10 flex h-full min-h-[768px] flex-1 flex-col items-center">
        <Outlet />
        <p className="mt-auto py-10 text-xs uppercase text-muted-foreground">
          &copy;{new Date().getFullYear()} All Right Reserved
        </p>
      </div>
      <div className="sticky top-0 hidden max-h-full min-h-[768px] flex-1 p-6 lg:block">
        <Image
          src="/background.svg"
          alt=""
          className="h-full w-full rounded-3xl object-cover object-center"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative z-20 w-full max-w-lg">
            <Image src="/linkedinCard.svg" alt="" className="w-full" />
            <div className="absolute left-10 top-14 z-30 flex items-center gap-3">
              <BoringAvatar
                src={user?.avatar}
                alt={user?.username}
                className="h-12 w-12"
              />
              <p className="text-lg font-medium">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
