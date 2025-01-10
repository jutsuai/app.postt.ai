import { FaPlus } from "react-icons/fa";
import BottomPreviewCard from "./BottomPreviewCard";

export default function BottomSection({
  customizations,
  slides,
  setSlides,
  selectedSlide,
  setSelectedSlide,
}: {
  customizations: any;
  slides: any;
  setSlides: any;
  selectedSlide: any;
  setSelectedSlide: any;
}) {
  return (
    <div className="grid min-h-max auto-cols-[80px] grid-flow-col gap-4 overflow-x-auto px-2 py-2">
      {slides?.map((slide: any, index: any) => (
        <BottomPreviewCard
          key={index}
          totalSlides={slides?.length}
          setSlides={setSlides}
          pageIndex={index}
          slide={slide}
          customizations={customizations}
          selectedSlide={selectedSlide}
          setSelectedSlide={setSelectedSlide}
        />
      ))}

      <div
        onClick={() => {
          // create a new slide before the end slide
          setSlides((prev: any) => {
            return [
              ...prev.slice(0, prev.length - 1),
              {
                pageType: "slide",
                visible: true,
                pageIndex: prev.length - 1,
                title: "Slide " + prev.length,
                description: "This is the " + prev.length + " slide",
                image: slides[prev.length - 1].image,
              },
              prev[prev.length - 1],
            ];
          });
        }}
        className="relative flex aspect-[4/5] h-full cursor-pointer flex-col justify-center overflow-hidden rounded-md bg-primary-foreground/60 px-3 opacity-80 shadow-md transition-all duration-200 hover:opacity-100"
      >
        <div className="flex items-center justify-center">
          <FaPlus />
        </div>
      </div>
    </div>
  );
}
