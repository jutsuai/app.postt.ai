import { useCarosel } from "../context/CreateCaroselContext";
import BottomPreviewCard from "./BottomPreviewCard";

export default function BottomSection() {
  const { slides, setSlides }: any = useCarosel();
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(100px,1fr))]  ">
      {slides?.map((slide, index) => (
        <BottomPreviewCard slide={slide} index={index} key={slide.title} />
      ))}

      {/* Add new slide placeholder */}
      <button
        onClick={() =>
          setSlides((prev: any) => {
            return [
              ...prev,
              {
                title: `Slide ${prev?.length} title`,
                subtitle: `Slide ${prev?.length} subtitle`,
              },
            ];
          })
        }
        className="  border-2 aspect-[14/16] h-full border-dashed  rounded-md my-2 mb-0.5  flex items-center justify-center cursor-pointer text-muted-foreground bg-primary/20"
      >
        +
      </button>
    </div>
  );
}
