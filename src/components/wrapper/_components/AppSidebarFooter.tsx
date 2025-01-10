import BoringAvatar from "@/components/BoringAvatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/lib/httpClient";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function AppSidebarFooter() {
  const {
    logout,
    user,
    linkedinProfiles,
    getLinkedinProfiles,
    selectedProfile,
    setSelectedProfile,
  } = useAuth();
  const { open: sidebarMode } = useSidebar();

  console.log("linkedinProfiles", linkedinProfiles);

  // useEffect(() => {
  //   getLinkedinProfiles();
  // }, []);

  // const loadImage = (src: string) => {
  //   httpClient()
  //     .get(`/linkedin/api/image/D4D0BAQEQZP-78zihhA`)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       toast.error(err?.response?.data?.message || "An error occurred");
  //     });
  // };

  return (
    <SidebarFooter>
      <SidebarMenu>
        {/* <button onClick={loadImage}>Load Image</button> */}
        {/* {linkedinProfiles?.map((profile: any, index: number) => (
          <SidebarMenuButton
            className={cn(
              "h-13 m-0 rounded-full transition",

              // index === selectedProfile ? "bg-[#ecebff]" : "ring-transparent")
              profile?._id === selectedProfile?._id
                ? "!bg-primary/25"
                : "ring-transparent",

              "hover:bg-primary/5 active:bg-primary/10",
            )}
            onClick={() => setSelectedProfile(profile)}
          >
            <BoringAvatar
              name={profile?.name}
              src={profile?.avatar}
              alt={profile?.name}
              className="w-10"
            />

            <div
              className={cn(
                "z-10 flex flex-col items-start overflow-hidden text-sm font-semibold transition-colors duration-200",
              )}
            >
              <p className="text-center text-sm font-semibold">
                {`${profile?.name}`}
              </p>
              <h3 className="text-center text-xs font-medium text-muted-foreground">
                {profile?.slug}
              </h3>
            </div>
          </SidebarMenuButton>
        ))} */}

        <SidebarMenuItem
          className={cn(
            "cursor-pointer !rounded-full transition-all duration-200 hover:!bg-transparent",
            sidebarMode ? "mx-0 px-0 py-1.5" : "mx-1.5 w-full !p-0 py-[7px]",
            // sidebarMode ? "mx-2 px-2 py-1.5 " : "mx-1.5 py-[7px] pl-[5px] pl-[5px]"
          )}
        >
          {/* <Link to="/settings"> */}
          <Popover>
            <PopoverTrigger asChild>
              <SidebarMenuButton
                className="h-10 min-h-12 w-full min-w-12 hover:!bg-transparent"
                style={{
                  padding: "0px !important",
                }}
              >
                {selectedProfile ? (
                  <>
                    <BoringAvatar
                      name={selectedProfile?.name}
                      size={40}
                      src={selectedProfile?.logo}
                      alt={selectedProfile?.name}
                      className={cn("min-w-10", sidebarMode ? "" : "-ml-2")}
                    />

                    <div
                      className={cn(
                        "z-10 flex flex-col items-start overflow-hidden text-sm font-semibold transition-colors duration-200",
                      )}
                    >
                      <p className="text-center text-sm font-semibold">
                        {`${selectedProfile?.name}`}
                      </p>
                      <h3 className="text-center text-xs font-medium text-muted-foreground">
                        {selectedProfile?.slug}
                      </h3>
                    </div>
                  </>
                ) : (
                  <div className="flex h-12 w-full items-center gap-1 rounded-full">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-28 rounded-full" />
                      <Skeleton className="h-2 w-14 rounded-full" />
                    </div>
                  </div>
                )}
              </SidebarMenuButton>
            </PopoverTrigger>
            <PopoverContent className="rounded-2xl">
              {linkedinProfiles?.map((profile: any, index: number) => (
                <SidebarMenuButton
                  className={cn(
                    "h-13 m-0 rounded-full transition",

                    // index === selectedProfile ? "bg-[#ecebff]" : "ring-transparent")
                    profile?._id === selectedProfile?._id
                      ? "!bg-primary/25"
                      : "ring-transparent",

                    "hover:bg-primary/5 active:bg-primary/10",
                  )}
                  onClick={() => setSelectedProfile(profile)}
                >
                  <BoringAvatar
                    name={profile?.name}
                    src={profile?.logo}
                    alt={profile?.name}
                    className="w-10"
                  />

                  <div
                    className={cn(
                      "z-10 flex flex-col items-start overflow-hidden text-sm font-semibold transition-colors duration-200",
                    )}
                  >
                    <p className="text-center text-sm font-semibold">
                      {`${profile?.name}`}
                    </p>
                    <h3 className="text-center text-xs font-medium text-muted-foreground">
                      {profile?.slug}
                    </h3>
                  </div>
                </SidebarMenuButton>
              ))}
            </PopoverContent>
          </Popover>
        </SidebarMenuItem>

        <SidebarMenuItem
          onClick={logout}
          className={cn(
            "cursor-pointer !rounded-full transition-all duration-200 hover:!bg-primary-accent/60",
            sidebarMode ? "mx-2 px-2 py-1.5" : "mx-1.5 py-1.5 pl-1",
          )}
        >
          <SidebarMenuButton className="hover:!bg-transparent">
            <span className="z-10 transition-colors duration-200">
              <FiLogOut className="size-5" />
            </span>
            <span className="z-10 text-sm font-semibold transition-colors duration-200">
              Logout
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
