import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

import { FaCompass, FaRegCompass, FaRegUser, FaUser } from "react-icons/fa";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { RiCalendarScheduleFill, RiCalendarScheduleLine } from "react-icons/ri";
import { motion } from "framer-motion";

export default function AppSidebarContent() {
  const { pathname } = useLocation();

  // const { sm } = useBreakpoint();
  // const { toggleSidebar } = useSidebar();

  const content = [
    {
      label: null,
      items: [
        {
          label: "Home",
          icon: {
            active: <IoHome />,
            inactive: <IoHomeOutline />,
          },
          url: "/",
          hidden: false,
        },
        {
          label: "Discover",
          icon: {
            active: <FaCompass />,
            inactive: <FaRegCompass />,
          },
          url: "/discover",
          items: [],
        },
        {
          label: "Schedule",
          icon: {
            active: <RiCalendarScheduleFill />,
            inactive: <RiCalendarScheduleLine />,
          },
          url: "/schedule",
          items: [],
        },
        {
          label: "Profile",
          icon: {
            active: <FaUser />,
            inactive: <FaRegUser />,
          },
          url: "/profile",
          items: [],
        },
      ],
    },
  ];

  return (
    <SidebarContent>
      {content.map((group, contentIndex) => (
        <SidebarGroup key={group.label || contentIndex}>
          {group?.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
          <SidebarMenu>
            {group.items.map((item) => {
              if (item?.hidden) return null;

              const checkMatch =
                (item.url === "/" && pathname === "/") ||
                item.url.split("/")[1] === pathname.split("/")[1];

              return (
                <SidebarMenuItem key={item?.label}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className="hover:!bg-muted-foreground/10"
                      onClick={() => {
                        // if (sm) {
                        //   toggleSidebar();
                        // }
                      }}
                    >
                      {checkMatch && (
                        <motion.span
                          key={item?.label}
                          className="absolute inset-0 rounded-md !bg-muted-foreground/10 !text-foreground"
                          layoutId="activeSidebarItem"
                          transition={{ duration: 0.25 }}
                        />
                      )}
                      <span>
                        {item.icon[checkMatch ? "active" : "inactive"]}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
