import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Arrows({
  setSelectedSlide,
  slides,
  hideArrows,
  onHover,
}: {
  setSelectedSlide: any;
  slides: any;
  hideArrows?: boolean;
  onHover?: boolean;
}) {
  return (
    !hideArrows && (
      <>
        <Button
          size="icon"
          className={cn(
            "ml-2 rounded-full bg-foreground/60 pl-2.5 hover:bg-foreground hover:text-background",
            // selectedSlide === 0 && "pointer-events-none opacity-0",
            "absolute left-0 top-[50%] z-40 flex justify-between transition",

            onHover ? "opacity-100" : "opacity-0",
          )}
          onClick={() =>
            setSelectedSlide((prev: any) => {
              if (prev === 0) {
                return prev;
              } else {
                return prev - 1;
              }
            })
          }
        >
          <MdKeyboardArrowLeft />
        </Button>
        <Button
          className={cn(
            "mr-2 rounded-full bg-foreground/60 pl-2.5 hover:bg-foreground hover:text-background",
            // selectedSlide === 0 && "pointer-events-none opacity-0",
            "absolute right-0 top-[50%] z-40 flex justify-between transition",

            onHover ? "opacity-100" : "opacity-0",
          )}
          size="icon"
          onClick={() => {
            setSelectedSlide((prev: any) => {
              if (prev === slides.length - 1) {
                return prev;
              } else {
                return prev + 1;
              }
            });
          }}
        >
          <MdKeyboardArrowRight />
        </Button>
      </>
    )
  );
}
