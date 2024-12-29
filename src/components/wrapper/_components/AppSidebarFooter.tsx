import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

export default function AppSidebarFooter() {
  const { logout } = useAuth();

  return (
    <SidebarFooter>
      <SidebarMenu className="justify-center px-2 items-center">
        <SidebarMenuItem
          className={cn(
            "transition-all duration-200 cursor-pointer hover:!bg-primary-accent/60 !rounded-full",
            "h-11 w-full px-2",
            "justify-center items-center flex"
          )}
        >
          <SidebarMenuButton
            className="hover:!bg-transparent gap-2"
            onClick={logout}
          >
            <motion.span
              className="absolute inset-0 !rounded-full !bg-primary-accent/60"
              layoutId="activeSidebarItem"
              transition={{ duration: 0.2 }}
            />
            <span
              className={cn(
                "z-10 transition-colors duration-200",
                "text-muted-foreground"
              )}
            >
              <FiLogOut className="size-5" />
            </span>
            <span
              className={cn(
                "z-10 font-semibold text-sm transition-colors duration-200",
                "text-muted-foreground"
              )}
            >
              Logout
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
