import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function BottomPreviewCard({
  slide,
  customizations,
  selectedSlide,
  setSelectedSlide,
  totalSlides,
  pageIndex,

  setSlides,
}: any) {
  return (
    <div className="w-full relative h-full aspect-[4/5] bg-muted p-0.5 rounded-xl">
      <Button
        onClick={() => {
          setSelectedSlide(pageIndex);
        }}
        className={cn(
          "w-full h-full rounded-md overflow-hidden flex items-center justify-center",

          selectedSlide === pageIndex ? "ring-4" : "",
          slide?.visible ? "opacity-100" : "opacity-25"
        )}
      >
        <img
          src={slide?.image}
          className="absolute z-0 inset-0 rounded-lg pointer-events-none"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />

        <p
          className="text-lg z-20 font-semibold"
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

      <Button
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
        className="absolute top-2 left-2 p-1 text-muted-foreground bg-background rounded-md h-6 w-6 flex items-center justify-center"
      >
        {slide?.visible ? <FaEye /> : <FaEyeSlash />}
      </Button>

      <Button
        variant="ghost"
        disabled={slide?.pageType === "start" || slide?.pageType === "end"}
        onClick={() => {
          setSlides((prev: any) => {
            return prev.filter((_, index: any) => index !== pageIndex);
          });

          if (selectedSlide >= pageIndex - 1) {
            setSelectedSlide((prev: any) => prev - 1);
          }

          // setSelectedSlide(0);
          // setSelectedSlide((curIndex: any) => {
          //   if (totalSlides.length - 1 === curIndex) {
          //     return curIndex - 2;
          //   }

          //   return curIndex;
          // });
        }}
        className="absolute top-2 right-2 text-muted-foreground hover:text-red-600 p-1 bg-background rounded-md h-6 w-6 flex items-center justify-center"
      >
        <MdDelete />
      </Button>
    </div>
  );
}
