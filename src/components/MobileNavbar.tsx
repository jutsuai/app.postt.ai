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
      <nav className="fixed bottom-0 left-0 right-0 bg-transparent  ">
        <ul className="flex justify-around items-center">
          <NavItems item={navItem[0]} pathname={pathname} curve="right" />
          <div className="w-[160px]" />
          <div
            className="absolute group/plusButton -top-[64px] left-1/2 -translate-x-1/2 size-[95px] bg-gradient-navbar p-[2px] rounded-full 
  "
          >
            <div className="p-[16px] translate-y-2 w-full h-full bg-transparent rounded-full">
              <Link to="/add">
                <button className="w-full group-hover/plusButton:-translate-y-2 transition-transform h-full bg-primary grid place-items-center rounded-full">
                  {/* <div className="absolute bg-gradient-to-b from-transparent via-transparent rounded-full shadow-2xl shadow-primary to-primary/40 -z-10 w-full h-full" /> */}
                  <GoPlus className="size-7" />
                </button>
              </Link>
            </div>
          </div>
          <div className="absolute z-[-1] bottom-0 h-[80%] left-1/2 -translate-x-1/2 w-1/2 bg-background" />
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
        "w-full py-2 pt-3 h-full bg-background border-t-2 ",
        curve === "left" ? "rounded-ss-[26px] runded" : "rounded-se-[26px]"
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
