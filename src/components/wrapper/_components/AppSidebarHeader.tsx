import {
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AppSidebarHeader() {
  const { open: sidebarMode } = useSidebar();

  return (
    <SidebarHeader>
      {/* <TeamSection /> */}
      {/* 
        
      */}

      <SidebarMenu className="py-2">
        <Link to="/" className="flex items-end">
          <svg
            className="ml-2 h-8 w-fit min-w-fit overflow-hidden fill-current transition-[margin-left]"
            width="517"
            height="173"
            viewBox="0 0 517 173"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* {sidebarMode && ( */}
            <motion.path
              initial={{ opacity: 1 }}
              animate={{ opacity: sidebarMode ? 1 : 0 }}
              exit={{ opacity: 0 }}
              d="M130.516 35.8742V99.9947C130.516 111.885 137.028 118.891 148.564 118.891C160.1 118.891 166.54 111.885 166.54 99.9947V35.8742H192.514V102.755C192.514 125.685 175.104 140.76 148.564 140.76C122.024 140.76 104.543 125.685 104.543 102.755V35.8742H130.516ZM266.472 138H240.569V56.7523H211.127V35.8742H295.984V56.7523H266.472V138ZM310.068 108.912H334.839C335.476 116.343 342.907 121.085 353.665 121.085C363.361 121.085 370.013 116.414 370.013 109.691C370.013 104.029 365.555 100.986 353.877 98.6501L340.43 95.9607C321.746 92.422 312.121 82.2307 312.121 66.1651C312.121 46.2071 328.115 33.114 352.745 33.114C376.666 33.114 393.227 46.0655 393.652 64.962H369.659C369.093 57.7431 362.228 52.7182 353.098 52.7182C343.969 52.7182 337.953 57.0354 337.953 63.8296C337.953 69.4207 342.482 72.6763 353.24 74.7995L366.404 77.3473C386.574 81.2398 395.633 90.3696 395.633 106.577C395.633 127.879 379.355 140.76 352.603 140.76C326.771 140.76 310.493 128.587 310.068 108.912ZM441.353 35.8742V99.9947C441.353 111.885 447.864 118.891 459.4 118.891C470.936 118.891 477.376 111.885 477.376 99.9947V35.8742H503.35V102.755C503.35 125.685 485.94 140.76 459.4 140.76C432.86 140.76 415.379 125.685 415.379 102.755V35.8742H441.353Z"
            />

            {/* )} */}
            <path d="M0 57.627V35.8418H83.0678V99.303C83.0678 122.984 63.7154 140.842 41.2971 140.842C17.7083 140.842 0 121.148 0 99.303V83.3903H21.7852V99.303C21.7852 111.003 31.588 119.054 41.2971 119.054C52.4085 119.054 61.2827 110.326 61.2827 99.303V57.627H0Z" />
            <circle cx="10.8919" cy="70.6034" r="7.2933" fill="#FFD37C" />
          </svg>

          {/* <p
            className={cn(
              "mb-0.5 ml-1 text-xs font-bold text-muted-foreground",
              sidebarMode ? "sm:inline" : "hidden",
            )}
          >
            BETA
          </p> */}
        </Link>

        {/* <div className="hidden justify-between gap-2 sm:flex">
          <QuickSearchDialog>
            <SidebarMenuItem
              className={cn(
                "mt-4 box-border rounded-full bg-muted-foreground/40 from-[#574ce3] to-[#1BD9FE] !p-0.5 transition-all hover:bg-gradient-to-r",
                sidebarMode ? "w-full" : "w-[calc(100%+5px)]",
              )}
            >
              <SidebarMenuButton className="box-border w-full justify-start gap-2 rounded-full bg-background font-medium transition hover:bg-background">
                <span className="">
                  <LuSearch className="size-3.5" />
                </span>
                <span>{t("Quick Search")}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </QuickSearchDialog>
        </div> */}
      </SidebarMenu>
    </SidebarHeader>
  );
}
