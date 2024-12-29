import React from "react";
import { useCarosel } from "../context/CreateCaroselContext";
import { MdDeleteOutline } from "react-icons/md";

export default function BottomPreviewCard({ slide, index }: any) {
  const {
    setSlides,
    setTitleText,
    setSubtitleText,
    backgroundImageUrl,
    titleEnabled,
    titlePosition,
    slides,
    previewIndex,
    setPreviewIndex,
    avatarEnabled,
    avatarUrl,
    avatarName,
    avatarNameEnabled,
    avatarUserNameEnabled,
    avatarUserName,
    setShowLastSlide,
  }: any = useCarosel();

  return (
    <div className="w-full relative h-full bg-muted p-0.5 rounded-md">
      <div
        onClick={() => {
          setPreviewIndex(index);
          setShowLastSlide(false);
        }}
        className="aspect-[4/5] relative bg-background overflow-hidden flex flex-col justify-center transition-all opacity-80 hover:opacity-100 duration-200 px-3 rounded-md  shadow-md cursor-pointer"
      >
        <img
          src="/carousel/bg-light.webp"
          className="absolute z-0 inset-0 pointer-events-none"
        />

        {index > 0 ? (
          <div className="z-10 space-y-4 my-auto translate-y-1/3 h-full">
            <p className="outlined-text opacity-10 -translate-x-2 -translate-y-[40%] top-0 left-0 absolute text-[80px] font-extrabold">
              {index}
            </p>
            <h6 className="text-[3px] font-normal ml-4 max-w-sm ">
              {slides[index].title}
            </h6>
          </div>
        ) : (
          <h1
            className="text-[60%] z-10 my-auto font-bold pt-4 break-words text-wrap max-w-[75%]"
            style={{ textAlign: titlePosition }}
          >
            {slides[index].title}
          </h1>
        )}

        <div className="flex items-center z-10 space-x-1 -translate-x-2 mt-auto h-7">
          {avatarEnabled && (
            <img
              src={avatarUrl}
              alt={avatarName}
              className="w-3 h-3 rounded-full"
            />
          )}
          <div className="">
            {avatarNameEnabled && (
              <div className="text-[4px]">{avatarName}</div>
            )}
            {avatarUserNameEnabled && (
              <div className="font-bold text-[5px] ">@{avatarUserName}</div>
            )}
          </div>
        </div>
      </div>
      {index > 0 && (
        <button
          onClick={() => {
            setSlides((prev) => {
              setPreviewIndex(index - 1);
              return prev.filter((_, i) => i !== index);
            });
          }}
          className="text-red-500 absolute  bottom-1 p-1 rounded-full bg-background right-1"
        >
          <MdDeleteOutline className="text-sm" />
        </button>
      )}
    </div>
  );
}
