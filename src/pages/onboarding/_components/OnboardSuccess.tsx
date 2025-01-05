import Image from "@/components/Image";
import { cn } from "@/lib/utils";
import { FaFire } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { motion } from "framer-motion";

export default function OnboardSuccess() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const completed = [false, true, false, true, true, false, false];

  return (
    <div className="w-dvw h-dvh bg-primary-foreground/60 overflow-hidden relative flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 min-w-[1024px] w-full"
      >
        <Image src="/onboarding/bg-accent-1.svg" alt="" className="w-full  " />
      </motion.div>

      <div className="text-center flex flex-col items-center gap-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl text-black mb-4"
        >
          <FaFire />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl font-bold text-black mb-2"
        >
          Good Job!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-muted-foreground mb-6"
        >
          Today, October 14th
        </motion.p>

        <div className="flex items-center justify-center space-x-4 mb-6">
          {days.map((day, index) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="flex flex-col gap-2 justify-center items-center font-medium text-xs sm:text-sm"
            >
              <p
                className={cn(completed[index] && "text-primary font-semibold")}
              >
                {day}
              </p>
              <div
                className={cn(
                  "sm:size-11 size-8 text-primary sm:text-lg bg-primary-foreground/60 sm:border-8 border-4 border-background rounded-full grid place-items-center",
                  completed[index] &&
                    " border-primary shadow-lg shadow-black/30"
                )}
              >
                <MdDone />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="text-muted-foreground text-xs sm:text-sm"
        >
          Keep it up, you're{" "}
          <span className="text-primary font-bold">5 days</span> away from a{" "}
          <span className="text-primary font-bold">7 day streak!</span>
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        className="w-full absolute bottom-2 min-w-[1024px]"
      >
        <Image src="/onboarding/bg-accent-2.svg" alt="" className="w-full  " />
      </motion.div>
    </div>
  );
}
