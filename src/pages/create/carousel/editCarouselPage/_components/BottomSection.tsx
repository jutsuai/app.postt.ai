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
    <div className="grid gap-4 grid-flow-col auto-cols-[100px] py-2 px-2 min-h-max  overflow-x-auto">
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
        className="aspect-[4/5] relative bg-primary-foreground/60  h-full overflow-hidden flex flex-col justify-center transition-all opacity-80 hover:opacity-100 duration-200 px-3 rounded-md  shadow-md cursor-pointer"
      >
        <div className="flex items-center justify-center">
          <FaPlus />
        </div>
      </div>
    </div>
  );
}
