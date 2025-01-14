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
          "group/createCard flex h-full w-full flex-col items-center gap-2 rounded-2xl border p-2 transition-all duration-200 hover:shadow-lg",
          className,
        )}
      >
        <div className="flex h-full w-full flex-col items-center justify-center overflow-y-hidden rounded-[8px] border bg-primary-accent/60 px-2">
          <motion.img
            initial={{ scale: 0.5, rotate: 15 }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{ duration: 0.2 }}
            src={icon}
            alt={name}
            className="h-full w-full !translate-y-2 transition-all duration-200 group-hover/createCard:!translate-y-0"
          />
        </div>
        <h6 className="py-1 text-center text-sm font-medium">{name}</h6>
      </div>
    </Link>
  );
}
