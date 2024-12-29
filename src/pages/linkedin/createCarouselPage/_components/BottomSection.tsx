import { useState } from "react";
import { useCarosel } from "../context/CreateCaroselContext";
import BottomPreviewCard from "./BottomPreviewCard";

export default function BottomSection() {
  const {
    slides,
    setSlides,
    avatarUrl,
    avatarName,
    avatarUserName,
    previewIndex,
    setPreviewIndex,
    showLastSlide,
    setShowLastSlide,
  }: any = useCarosel();

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(100px,1fr))]  ">
      {slides?.map((slide, index) => (
        <BottomPreviewCard slide={slide} index={index} key={slide.title} />
      ))}

      {/* Add new slide placeholder */}
      <div
        onClick={() => {
          setShowLastSlide(true);
          // setPreviewIndex(0);
        }}
        className="aspect-[4/5] relative bg-background overflow-hidden flex flex-col justify-center transition-all opacity-80 hover:opacity-100 duration-200 px-3 rounded-md  shadow-md cursor-pointer"
      >
        <img
          src="/carousel/bg-light.webp"
          className="absolute z-0 inset-0 pointer-events-none"
        />
        <div className="flex items-center space-x-1 z-10 ">
          <div className="p-0.5 bg-background border border-muted-foreground rounded-full">
            <img
              src={avatarUrl}
              alt={avatarName}
              className="size-5 rounded-full"
            />
          </div>

          <div className="flex flex-col">
            <div className="text-[6px]">{avatarName}</div>

            <div className="font-bold text-[6px] line-clamp-1">
              @{avatarUserName}
            </div>
          </div>
        </div>
      </div>
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
