import useBreakpoint from "@/lib/useBreakpoint";
import { cn } from "@/lib/utils";
import {
  FaCompass,
  FaPlus,
  FaRegCompass,
  FaRegUser,
  FaUser,
} from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { IoHome, IoHomeOutline } from "react-icons/io5";
import { RiCalendarScheduleFill, RiCalendarScheduleLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import Image from "./Image";

const navItem = [
  {
    title: "Home",
    icon: {
      active: <IoHome />,
      inactive: <IoHomeOutline />,
    },
    url: "/",
  },
  {
    title: "Schedule",
    icon: {
      active: <RiCalendarScheduleFill />,
      inactive: <RiCalendarScheduleLine />,
    },
    url: "/schedule",
  },
  // {
  //   title: "Discover",
  //   icon: {
  //     active: <FaCompass />,
  //     inactive: <FaRegCompass />,
  //   },
  //   url: "/discover",
  // },
  // {
  //   title: "Profile",
  //   icon: {
  //     active: <FaUser />,
  //     inactive: <FaRegUser />,
  //   },
  //   url: "/profile",
  // },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { md } = useBreakpoint();

  return (
    md && (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-transparent h-[60x]">
        <div className="fixed bottom-0 h-[20px] bg-background left-0 right-0 w-[350px] z-10" />
        <ul className="flex items-end relative h-full ">
          <NavItems item={navItem[0]} pathname={pathname} curve="right" />

          <div className="w-[300px]" />
          <div
            className="absolute group/plusButton -top-[60px] left-1/2 -translate-x-1/2 size-[90px] bg-gradient-navbar p-[2px] rounded-full 
  "
          >
            <div className="p-[16px] translate-y-2 w-full h-full bg-transparent rounded-full">
              <Link to="/add">
                <button className="w-full group-hover/plusButton:-translate-y-2 transition-transform h-full bg-primary-foreground grid place-items-center rounded-full">
                  <GoPlus className="size-7" />
                </button>
              </Link>
            </div>
          </div>

          <svg
            className="absolute translate-y-[34px] bottom-0 left-0 right-0 w-full "
            width="270"
            height="160"
            viewBox="0 0 270 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60 68H78.076C87.4882 68 96.599 71.3191 103.806 77.3734L116.236 87.8163C127.379 97.1773 143.633 97.1911 154.791 87.8491L167.356 77.3297C174.555 71.3026 183.645 68 193.034 68H210V108H60V68Z"
              fill="white"
            />
            <path
              d="M209.5 68.5V107.5H60.5V68.5H78.076C87.3706 68.5 96.3675 71.7776 103.484 77.7562L115.915 88.1992C127.243 97.7162 143.768 97.7302 155.112 88.2325L167.677 77.7131C174.786 71.7614 183.762 68.5 193.034 68.5H209.5Z"
              stroke="black"
              stroke-opacity="0.07"
            />
          </svg>
          <NavItems item={navItem[1]} pathname={pathname} curve="left" />
        </ul>
      </nav>
    )
  );
}

function NavItems({
  item,
  pathname,
  curve,
}: {
  item: {
    title: string;
    icon: { active: React.ReactNode; inactive: React.ReactNode };
    url: string;
  };
  pathname: string;
  curve?: string;
}) {
  const checkMatch =
    (item?.url === "/" && pathname === "/") ||
    item?.url?.split("/")[1] === pathname?.split("/")[1];

  return (
    <li
      className={cn(
        "w-full py-2 pt-3 h-full bg-background border-t z-10"
        // curve === "left" ? "rounded-ss-[26px] runded" : "rounded-se-[26px]"
      )}
    >
      <Link
        to={item.url}
        className={cn(
          "flex flex-col   text-xl gap-2 items-center leading-none transition-all duration-200",
          checkMatch ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {item?.icon[checkMatch ? "active" : "inactive"]}
        <span className="text-[9px] font-medium">{item?.title}</span>
      </Link>
    </li>
  );
}
