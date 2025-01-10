import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function BottomPreviewCard({
  slide,
  customizations,
  selectedSlide,
  setSelectedSlide,
  pageIndex,

  setSlides,
}: any) {
  const [hovered, setHovered] = useState(false);

  console.log("Slide", slide);
  return (
    <div
      className="relative aspect-[4/5] h-full min-h-2 w-full rounded-xl bg-muted p-0.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Button
        onClick={() => {
          setSelectedSlide(pageIndex);
        }}
        className={cn(
          "flex h-full w-full items-center justify-center overflow-hidden rounded-md",

          selectedSlide === pageIndex ? "ring-4" : "",
          // slide?.visible ? "opacity-100" : "opacity-25",
        )}
      >
        <img
          src={slide?.image}
          className="pointer-events-none absolute inset-0 z-0 rounded-lg"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />

        <p
          className="z-20 text-lg font-semibold"
          style={{
            color: customizations?.fontColor,
          }}
        >
          {slide?.pageType === "start"
            ? "Start"
            : slide?.pageType === "end"
              ? "End"
              : pageIndex}
        </p>
      </Button>

      {/* <Button
        variant="ghost"
        onClick={() => {
          setSlides((prev: any) => {
            return prev.map((item: any, index: any) => {
              if (index === pageIndex) {
                return {
                  ...item,
                  visible: !item.visible,
                };
              }
              return item;
            });
          });
        }}
        className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-background p-1 text-muted-foreground"
      >
        {slide?.visible ? <FaEye /> : <FaEyeSlash />}
      </Button> */}

      <Button
        variant="ghost"
        disabled={slide?.pageType === "start" || slide?.pageType === "end"}
        onClick={() => {
          setSlides((prev: any) => {
            return prev.filter((_: any, index: any) => index !== pageIndex);
          });

          if (selectedSlide > 1 && selectedSlide >= pageIndex - 1) {
            setSelectedSlide((prev: any) => prev - 1);
          }
        }}
        className={cn(
          "absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-background p-1 text-muted-foreground hover:text-red-600",
          hovered ? "opacity-100" : "opacity-0",
        )}
      >
        <MdDelete />
      </Button>
    </div>
  );
}
