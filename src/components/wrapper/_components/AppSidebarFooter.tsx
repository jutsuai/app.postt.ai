import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AppSidebarFooter() {
  const navigate = useNavigate();
  const { open: sidebarMode } = useSidebar();

  return (
    <SidebarContent>
      <SidebarGroup>
        {/* <SidebarMenu>
          <SidebarMenuItem
            // onClick={() => navigate(item.url)}
            // key={item?.label}
            className={cn(
              "transition-all duration-200 cursor-pointer hover:!bg-primary-accent/60 !rounded-full",
              sidebarMode ? "mx-2 px-2 py-1.5" : "mx-1.5 py-1.5 pl-1"
            )}
          >
            <SidebarMenuButton className="hover:!bg-transparent">
              <motion.span
                key={item?.label}
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
                "item.icon"
              </span>
              <span
                className={cn(
                  "z-10 font-semibold text-sm transition-colors duration-200",
                  "text-muted-foreground"
                )}
              >
                "item.label
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}
      </SidebarGroup>
    </SidebarContent>
  );
}
