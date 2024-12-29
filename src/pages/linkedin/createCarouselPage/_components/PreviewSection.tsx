import Image from "@/components/Image";
import { useCarosel } from "../context/CreateCaroselContext";

export default function PreviewSection() {
  const {
    titleEnabled,
    titlePosition,
    avatarUrl,
    avatarEnabled,
    avatarName,
    avatarNameEnabled,
    avatarUserName,
    avatarUserNameEnabled,

    slides,
    previewIndex,
  }: any = useCarosel();
  return (
    <div className="p-3 bg-muted relative shadow-md border w-full h-full rounded-xl">
      <div className="h-full w-full flex overflow-hidden bg-background justify-center  flex-col rounded-lg p-6 aspect-[4/5] relative">
        <img
          src="/carousel/bg-carousel-1.svg"
          className="absolute z-0 top-0 h-60 right-0 w-60 pointer-events-none"
        />
        {previewIndex > 0 ? (
          <div className="z-10 space-y-4 my-auto translate-y-1/3 h-full">
            <p className="outlined-text opacity-10  -translate-x-7 -translate-y-[40%] top-0 left-0 absolute text-[400px] font-extrabold">
              {previewIndex}
            </p>
            <h6 className="text-lg font-medium ml-20 max-w-sm ">
              {slides[previewIndex].title}
            </h6>
          </div>
        ) : (
          <div className="z-10 space-y-2 my-auto translate-y-1/2">
            {titleEnabled && (
              <h1
                className="text-6xl text-gray-800 font-bold max-w-sm leading-tight"
                style={{ textAlign: titlePosition }}
              >
                {slides[previewIndex].title}
              </h1>
            )}
          </div>
        )}

        <div className="flex items-center z-10 space-x-2 mt-auto h-11">
          {avatarEnabled && (
            <Image
              src={avatarUrl}
              alt={avatarName}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div className="text-sm">
            {avatarNameEnabled && <div className=" text-xs">{avatarName}</div>}
            {avatarUserNameEnabled && (
              <div className="font-bold  ">@{avatarUserName}</div>
            )}
          </div>
        </div>
        {/* <div className="absolute z-0 inset-0 bg-white bg-opacity-50 pointer-events-none rounded-md" /> */}
      </div>
    </div>
  );
}
