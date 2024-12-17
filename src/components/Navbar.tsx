import { cn } from "@/lib/utils";
import { FaCompass, FaRegCompass, FaRegUser, FaUser } from "react-icons/fa";
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
  {
    title: "Discover",
    icon: {
      active: <FaCompass />,
      inactive: <FaRegCompass />,
    },
    url: "/discover",
  },
  {
    title: "Profile",
    icon: {
      active: <FaUser />,
      inactive: <FaRegUser />,
    },
    url: "/profile",
  },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white py-3 pt-4">
      <ul className="flex justify-around items-center">
        {navItem.map((item, index) => (
          <NavItems
            item={item}
            key={`${item?.title}-${index}`}
            pathname={pathname}
          />
        ))}
      </ul>
    </nav>
  );
}

function NavItems({
  item,
  pathname,
}: {
  item: {
    title: string;
    icon: { active: React.ReactNode; inactive: React.ReactNode };
    url: string;
  };
  pathname: string;
}) {
  const checkMatch =
    (item?.url === "/" && pathname === "/") ||
    item?.url?.split("/")[1] === pathname?.split("/")[1];

  return (
    <li className="w-full">
      <Link
        to={item.url}
        className={cn(
          "flex flex-col   text-xl gap-2 items-center leading-none transition-all duration-200",
          checkMatch ? "text-primary" : "text-muted-foreground"
        )}
      >
        {item?.icon[checkMatch ? "active" : "inactive"]}
        <span className="text-[9px] font-medium">{item?.title}</span>
      </Link>
    </li>
  );
}
