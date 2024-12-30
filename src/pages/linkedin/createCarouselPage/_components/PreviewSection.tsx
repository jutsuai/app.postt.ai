import Image from "@/components/Image";
import { useCarosel } from "../context/CreateCaroselContext";
import { cn } from "@/lib/utils";

export default function PreviewSection({ className }: { className?: string }) {
  const {
    titleEnabled,
    titlePosition,
    avatarUrl,
    avatarEnabled,
    avatarName,
    avatarNameEnabled,
    avatarUserName,
    avatarUserNameEnabled,
    showLastSlide,
    slides,
    previewIndex,
    backgroundImageUrl,
  }: any = useCarosel();
  return (
    <div
      className={cn(
        "p-3 bg-muted relative shadow-md border w-full h-full rounded-xl",
        className
      )}
    >
      <div className="h-full w-full flex overflow-hidden bg-background justify-center  flex-col rounded-lg p-6 aspect-[4/5] relative">
        <img
          src={backgroundImageUrl || "/carousel/bg-light.webp"}
          className="absolute z-0 inset-0 pointer-events-none"
        />

        {showLastSlide ? (
          <div className="z-10 space-y-4 my-auto translate-y-1/3  h-full">
            <div className="ml-6 max-w-sm space-y-1 -translate-y-2">
              <div className="flex items-center z-10 space-x-2 mt-auto ">
                <div className="p-1 bg-background border border-muted-foreground rounded-full">
                  <Image
                    src={avatarUrl}
                    alt={avatarName}
                    className="min-w-28 min-h-28 max-w-28 max-h-28 rounded-full"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-medium">{avatarName}</div>

                  <div className="font-bold text-2xl line-clamp-1">
                    @{avatarUserName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {previewIndex > 0 ? (
              <div className="z-10 space-y-4 my-auto translate-y-1/3 h-full">
                <p className="outlined-text opacity-10  -translate-x-7 -translate-y-[40%] top-0 left-0 absolute text-[400px] font-extrabold">
                  {previewIndex}
                </p>
                <div className="ml-20 max-w-sm space-y-1 -translate-y-2">
                  <h6 className="text-xl font-semibold ">
                    {slides[previewIndex].title}
                  </h6>
                  <p className="text-base">{slides[previewIndex].subtitle}</p>
                </div>
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
          </>
        )}

        {!showLastSlide && (
          <div className="flex items-center z-10 space-x-2 mt-auto h-11">
            {avatarEnabled && (
              <Image
                src={avatarUrl}
                alt={avatarName}
                className="w-12 h-12 rounded-full"
              />
            )}
            <div className="text-sm">
              {avatarNameEnabled && (
                <div className=" text-xs">{avatarName}</div>
              )}
              {avatarUserNameEnabled && (
                <div className="font-bold  ">@{avatarUserName}</div>
              )}
            </div>
          </div>
        )}
        {/* <div className="absolute z-0 inset-0 bg-white bg-opacity-50 pointer-events-none rounded-md" /> */}
      </div>
    </div>
  );
}
