import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BiCarousel } from "react-icons/bi";
import { FaRegImage } from "react-icons/fa";
import { MdOutlineTextFields } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const menus = [
  {
    name: "Text Post",
    url: "/create/text",
    icon: "/dialog-menu/text-post-image.svg",
  },
  {
    name: "Image Post",
    url: "/create/carousel/testId",
    icon: "/dialog-menu/single-post-image.svg",
  },
  {
    name: "Carousel Post",
    url: "/create/carousel/testId",
    icon: "/dialog-menu/carousel-post-image.svg",
  },
];

export default function CreateMenuDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4">
          {menus.map((menu) => (
            <MenuCard
              key={menu.name}
              name={menu.name}
              url={menu.url}
              icon={menu.icon}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MenuCard({
  name,
  url,
  icon,
}: {
  name: string;
  url: string;
  icon: React.ReactNode;
}) {
  return (
    <Link to={url}>
      <div
        className="flex hover:shadow-lg group/createCard transition-all duration-200
       flex-col items-center gap-2 w-full border h-full rounded-2xl p-2 "
      >
        <div className="flex bg-primary-accent/60 overflow-y-hidden w-full h-full flex-col items-center justify-center gap-4 border  rounded-[8px]">
          <motion.img
            initial={{ scale: 0.5, rotate: 15 }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{ duration: 0.2 }}
            src={icon}
            alt={name}
            className="w-full h-full transition-all duration-200 group-hover/createCard:!translate-y-0 !translate-y-2"
          />
        </div>
        <h6 className="text-sm text-center font-medium py-1">{name}</h6>
      </div>
    </Link>
  );
}
