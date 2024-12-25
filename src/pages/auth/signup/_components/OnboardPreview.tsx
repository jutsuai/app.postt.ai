import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function OnboardPreview({ navigate }: { navigate: any }) {
  const [tab, setTab] = useState(0);
  return (
    // <div className="absolute grid place-items-center z-10 bg-background sm:bg-transparent inset-0 sm:bg-gradient-to-b from-foreground/50 via-transparent to-foreground/50">
    <div className="sm:max-w-md bg-background overflow-hidden w-full h-full sm:max-h-[90dvh]  border-none flex flex-col shadow-none sm:border sm:shadow rounded-none sm:rounded-2xl">
      <div className="flex p-4 items-center justify-between ">
        <h2 className="font-semibold text-lg">Preview</h2>
        <Button
          onClick={() => {
            navigate("?onboarding=connect");
          }}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <IoCloseOutline />
        </Button>
      </div>
      <div className="w-full flex-1 h-full p-4 px-6 flex flex-col items-center justify-center gap-6 mb-4">
        <div className="w-full flex flex-col items-center justify-center h-full bg-muted-foreground/25 rounded-2xl">
          Preview
        </div>
        <div className="flex gap-4 max-w-44 mx-auto w-full">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              onClick={() => setTab(index)}
              className={cn(
                "w-full h-2 bg-muted-foreground/25 rounded-3xl",
                tab === index && "bg-primary-foreground"
              )}
            ></div>
          ))}
        </div>
      </div>
      <div className="p-7 rounded-t-3xl space-y-4 bg-primary-foreground">
        <p className="font-semibold text-center">
          Done! Does it look good for you? Click on Publish to share it with the
          world.
        </p>
        <div className="flex items-center gap-4 max-w-xs mx-auto w-full">
          <Button
            onClick={() => {
              navigate("?onboarding=connect");
            }}
            className="bg-background w-full hover:bg-background/80 rounded-full"
          >
            Publish
          </Button>
          <Button
            onClick={() => {
              navigate("?onboarding=connect");
            }}
            className=" w-full rounded-full border border-foreground"
          >
            Schedule
          </Button>
        </div>
      </div>
    </div>
    // </div>
  );
}
