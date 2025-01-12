import BoringAvatar from "@/components/BoringAvatar";
import Link from "@/components/custom/Link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

import { FiLogOut } from "react-icons/fi";

export default function AppSidebarFooter() {
  const { logout, linkedinProfiles, selectedProfile, setSelectedProfile } =
    useAuth();
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 rounded-2xl">
              <DropdownMenuLabel>Profiles</DropdownMenuLabel>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuGroup>
                {linkedinProfiles?.map((profile: any, index: number) => (
                  <DropdownMenuItem
                    key={profile?._id}
                    onClick={() => setSelectedProfile(profile)}
                    className={cn(
                      "m-0 h-12 rounded-xl transition",

                      // index === selectedProfile ? "bg-[#ecebff]" : "ring-transparent")
                      profile?._id === selectedProfile?._id
                        ? "!bg-primary/25"
                        : "ring-transparent",

                      "hover:!bg-primary/15 active:bg-primary/10",
                    )}
                  >
                    <div className="relative">
                      <BoringAvatar
                        name={profile?.name}
                        src={profile?.logo}
                        alt={profile?.name}
                        className="w-9"
                      />

                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f8/LinkedIn_icon_circle.svg"
                        alt={`${profile?.name}'s linkedin`}
                        className="absolute -bottom-0.5 -right-0.5 size-4"
                      />
                    </div>

                    <div
                      className={cn(
                        "z-10 flex flex-col items-start overflow-hidden text-sm font-semibold transition-colors duration-200",
                      )}
                    >
                      <p className="text-center text-sm font-semibold text-foreground">
                        {`${profile?.name}`}
                      </p>
                      <h3 className="text-center text-xs font-medium text-muted-foreground">
                        {profile?.slug}
                      </h3>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                onClick={logout}
                className={cn("rounded-xl !ring-0 hover:!bg-primary/15")}
              >
                <Link to="/settings">
                  <Button
                    variant="ghost"
                    className="h-12 w-full cursor-pointer justify-start px-4 !text-foreground !ring-0 hover:!bg-primary/15"
                  >
                    Manage Channels
                  </Button>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                asChild
                onClick={logout}
                className={cn("rounded-xl !ring-0 hover:!bg-primary/15")}
              >
                <Button
                  variant="ghost"
                  className="h-12 w-full cursor-pointer justify-start px-4 !text-foreground !ring-0 hover:!bg-primary/15"
                >
                  <span className="z-10 transition-colors duration-200">
                    <FiLogOut className="size-5" />
                  </span>
                  <span className="z-10 text-sm font-semibold transition-colors duration-200">
                    Logout
                  </span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>

        {/* <SidebarMenuItem
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
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarFooter>
  );
}
