import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MenuCard({
  name,
  url,
  icon,
  setOpen,
  className,
}: {
  name: string;
  url: string;
  icon: any;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}) {
  return (
    <Link to={url} onClick={() => setOpen && setOpen(false)}>
      <div
        className={cn(
          "flex hover:shadow-lg group/createCard transition-all duration-200 flex-col items-center gap-2 w-full border h-full rounded-2xl p-2",
          className
        )}
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
