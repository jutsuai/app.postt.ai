import BoringAvatar from "@/components/BoringAvatar";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

import { FiLogOut } from "react-icons/fi";

export default function AppSidebarFooter() {
  const { logout, user } = useAuth();
  const { open: sidebarMode } = useSidebar();

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem
          className={cn(
            "transition-all duration-200 cursor-pointer  hover:!bg-transparent !rounded-full",
            sidebarMode ? "mx-0 px-0 py-1.5 " : "mx-1.5 py-[7px] pl-[5px]"
            // sidebarMode ? "mx-2 px-2 py-1.5 " : "mx-1.5 py-[7px] pl-[5px]"
          )}
        >
          <SidebarMenuButton className="hover:!bg-transparent h-10">
            <BoringAvatar
              name={user?.firstName}
              size={40}
              src={user?.avatar}
              alt={user?.firstName}
            />

            <div
              className={cn(
                "z-10 font-semibold text-sm transition-colors overflow-hidden duration-200 flex flex-col items-start"
              )}
            >
              <p className="text-sm font-semibold text-center">
                {`${user?.firstName} ${user?.lastName}`}
              </p>
              <h3 className="text-xs text-center font-medium text-muted-foreground">
                {user?.email}
              </h3>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem
          onClick={logout}
          className={cn(
            "transition-all duration-200 cursor-pointer hover:!bg-primary-accent/60 !rounded-full",
            sidebarMode ? "mx-2 px-2 py-1.5" : "mx-1.5 py-1.5 pl-1"
          )}
        >
          <SidebarMenuButton className="hover:!bg-transparent">
            <span className="z-10 transition-colors duration-200 ">
              <FiLogOut className="size-5" />
            </span>
            <span className="z-10 font-semibold text-sm transition-colors duration-200 ">
              Logout
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
