import Image from "@/components/Image";
import { cn } from "@/lib/utils";
import React from "react";
import { FaFire } from "react-icons/fa";
import { MdDone } from "react-icons/md";

export default function OnboardSuccess() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const completed = [false, true, false, true, true, false, false];

  return (
    <div className="w-dvw h-dvh bg-primary-foreground/60 overflow-hidden relative flex flex-col justify-center items-center">
      <Image
        src="/onboarding/bg-accent-1.svg"
        alt=""
        className="w-full min-w-[1024px] absolute top-2"
      />

      <div className="text-center flex flex-col items-center  gap-2">
        <div className="text-5xl text-black mb-4">
          <FaFire />
        </div>

        <h1 className="text-3xl font-bold text-black mb-2">Good Job!</h1>

        <p className="text-muted-foreground mb-6">Today, October 14th</p>

        <div className="flex items-center justify-center space-x-4 mb-6">
          {days.map((day, index) => (
            <div
              key={day}
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
            </div>
          ))}
        </div>

        <p className="text-muted-foreground text-xs sm:text-sm">
          Keep it up, you're{" "}
          <span className="text-primary font-bold">5 days</span> away from a{" "}
          <span className="text-primary font-bold">7 day streak!</span>
        </p>
      </div>

      <Image
        src="/onboarding/bg-accent-2.svg"
        alt=""
        className="w-full absolute bottom-4 min-w-[1024px]"
      />
    </div>
  );
}
