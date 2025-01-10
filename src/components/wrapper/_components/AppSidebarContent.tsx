import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BsFilePost } from "react-icons/bs";

export default function AppSidebarContent() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { open: sidebarMode } = useSidebar();

  const content = [
    {
      label: null,
      items: [
        {
          label: "Home",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1663 11.6668V16.6668M11.6663 14.1668H16.6663M4.99967 8.3335H6.66634C7.58682 8.3335 8.33301 7.5873 8.33301 6.66683V5.00016C8.33301 4.07969 7.58682 3.3335 6.66634 3.3335H4.99967C4.0792 3.3335 3.33301 4.07969 3.33301 5.00016V6.66683C3.33301 7.5873 4.0792 8.3335 4.99967 8.3335ZM13.333 8.3335H14.9997C15.9201 8.3335 16.6663 7.5873 16.6663 6.66683V5.00016C16.6663 4.07969 15.9201 3.3335 14.9997 3.3335H13.333C12.4125 3.3335 11.6663 4.07969 11.6663 5.00016V6.66683C11.6663 7.5873 12.4125 8.3335 13.333 8.3335ZM4.99967 16.6668H6.66634C7.58682 16.6668 8.33301 15.9206 8.33301 15.0002V13.3335C8.33301 12.413 7.58682 11.6668 6.66634 11.6668H4.99967C4.0792 11.6668 3.33301 12.413 3.33301 13.3335V15.0002C3.33301 15.9206 4.0792 16.6668 4.99967 16.6668Z"
                className="stroke-current"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          url: "/",
          hidden: false,
        },

        {
          label: "Schedule",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 5.83333V2.5M13.3333 5.83333V2.5M5.83333 9.16667H14.1667M4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5Z"
                className="stroke-current"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          url: "/schedule",
          items: [],
        },
        {
          label: "Reports",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 10.8335V10.0002M10 10.8335V8.3335M13.3333 10.8335V6.66683M6.66667 17.5002L10 14.1668L13.3333 17.5002M2.5 3.3335H17.5M3.33333 3.3335H16.6667V13.3335C16.6667 13.7937 16.2936 14.1668 15.8333 14.1668H4.16667C3.70643 14.1668 3.33333 13.7937 3.33333 13.3335V3.3335Z"
                className="stroke-current"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
          url: "/reports",
          items: [],
        },
        {
          label: "Posts",
          icon: <BsFilePost size={20} className="stroke-current" />,
          url: "/posts",
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
                <SidebarMenuItem
                  onClick={() => navigate(item.url)}
                  key={item?.label}
                  className={cn(
                    "cursor-pointer !rounded-full transition-all duration-200 hover:!bg-primary-accent/60",
                    sidebarMode ? "mx-2 px-2 py-1.5" : "mx-1.5 py-1.5 pl-1",
                  )}
                >
                  <SidebarMenuButton className="hover:!bg-transparent">
                    {checkMatch && (
                      <motion.span
                        key={item?.label}
                        className="absolute inset-0 !rounded-full !bg-primary-accent/60"
                        layoutId="activeSidebarItem"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <span
                      className={cn(
                        "z-10 transition-colors duration-200",
                        checkMatch ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={cn(
                        "z-10 text-sm font-semibold transition-colors duration-200",
                        checkMatch ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {item.label}
                    </span>
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
