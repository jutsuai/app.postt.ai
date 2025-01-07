import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AiTwotoneHeart, AiTwotoneLike } from "react-icons/ai";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoBookmarkOutline, IoChevronForward } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { SlLike } from "react-icons/sl";
import { TfiCommentAlt } from "react-icons/tfi";
import { LiaShareSolid } from "react-icons/lia";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function PreviewSection({
  pageType,
  slides,
  createdBy,

  pageIndex,
  title,
  description,
  image,

  selectedSlide,
  setSelectedSlide,

  customizations,
}: {
  className?: string;

  pageType: any;

  slides: any;

  createdBy: any;

  pageIndex: any;
  title: string;
  description: string;
  image: string;
  selectedSlide: any;
  setSelectedSlide: any;

  customizations: any;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mx-auto border rounded-xl relative flex flex-col w-min gap-2">
        <div className="flex items-start px-4 pt-4 justify-between gap-3">
          <Image
            src={createdBy?.avatar}
            alt={createdBy?.username}
            className="w-16 h-16 rounded-full object-cover object-center"
          />
          <div className="flex mr-auto flex-col leading-tight">
            <div className="flex w-full gap-2 items-center">
              <span className="font-semibold"> {createdBy?.name}</span>
              <span className="text-xs text-muted-foreground">●</span>
              <span className="text-muted-foreground">3rd+</span>
            </div>
            <div className="text-muted-foreground text-sm">Founder & CEO</div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <span>3d</span>
              <span className="text-xs text-muted-foreground scale-75">●</span>
              <FaGlobeAmericas />
            </div>
          </div>
          <Button
            className="w-fit ml-auto text-[#0072b1] hover:text-[#0072b1]"
            size="sm"
            variant="ghost"
          >
            <LuPlus /> Follow
          </Button>
        </div>
        <p className="whitespace-pre-wrap px-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          atque placeat ex, optio tempora impedit.
        </p>

        <div className="absolute top-[50%] z-20 right-0 left-0 flex justify-between px-4">
          <Button
            size="icon"
            className={cn(
              "rounded-full bg-foreground/60 hover:bg-foreground hover:text-background",
              selectedSlide === 0 && "opacity-0 pointer-events-none"
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
              "rounded-full  bg-foreground/60 hover:bg-foreground hover:text-background",
              selectedSlide === slides?.length - 1 &&
                "opacity-0 pointer-events-none"
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
        </div>
        {pageType == "start" ? (
          <StartPage
            title={title}
            image={image}
            createdBy={createdBy}
            customizations={customizations}
            pageType={pageType}
          />
        ) : pageType == "end" ? (
          <EndPage
            image={image}
            createdBy={createdBy}
            customizations={customizations}
          />
        ) : (
          <SlidePage
            pageIndex={pageIndex}
            title={title}
            description={description}
            image={image}
            createdBy={createdBy}
            customizations={customizations}
            pageType={pageType}
          />
        )}

        <div className="px-4 pb-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              <div className="p-0.5 flex items-center border justify-center rounded-full bg-blue-600/70 w-fit">
                <AiTwotoneLike className="-scale-x-[1]" />
              </div>
              <div className="p-0.5 rounded-full flex border items-center justify-center bg-red-600/70 w-fit">
                <AiTwotoneHeart />
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Alex Colen and 230 others
            </p>
            <p className="text-muted-foreground ml-auto text-sm">15 comments</p>
          </div>
          <Separator />
          <div className="flex items-center justify-around">
            <Image
              src={createdBy?.avatar}
              alt={createdBy?.username}
              className="w-8 h-8 rounded-full object-cover object-center"
            />
            <div className="flex items-center gap-2 font-medium ">
              <SlLike className="-scale-x-[1] text-xl" />
              Like
            </div>
            <div className="flex items-center gap-2 font-medium ">
              <TfiCommentAlt className="-scale-x-[1] text-xl" />
              Comment
            </div>
            <div className="flex items-center gap-2 font-medium ">
              <LiaShareSolid className=" text-xl" />
              Share
            </div>
            <div className="flex items-center gap-2 font-medium ">
              <IoBookmarkOutline className=" text-xl" />
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StartPage = ({
  title,
  image,
  createdBy,
  customizations,
  pageType,
}: {
  title: string;
  image: string;
  createdBy: any;
  customizations: any;
  pageType: string;
}) => {
  return (
    <div
      className=" flex overflow-hidden bg-background justify-center flex-col p-6 w-fit relative"
      style={{
        aspectRatio: customizations?.width / customizations?.height,
        minHeight: customizations?.height,
        maxHeight: customizations?.height,
      }}
    >
      <img
        src={image || "/carousel/bg-light.webp"}
        className="absolute z-0 inset-0 w-full h-full pointer-events-none object-cover"
        style={{ aspectRatio: customizations?.height / customizations?.width }}
      />

      <div
        className={cn(
          "z-10  w-full space-y-2 my-auto  h-full flex",

          customizations?.content?.horizontal === "left"
            ? "justify-start"
            : customizations?.content?.horizontal === "center"
            ? "justify-center"
            : "justify-end",

          customizations?.content?.vertical === "top"
            ? "items-start"
            : customizations?.content?.vertical === "center"
            ? "items-center"
            : "items-end"
        )}
      >
        {customizations?.title?.visible && (
          <h1
            className="text-6xl text-gray-800 font-semibold leading-normal"
            style={{
              textAlign:
                customizations?.content?.horizontal === "left"
                  ? "start"
                  : customizations?.content?.horizontal === "center"
                  ? "center"
                  : "end",
            }}
          >
            {title}
          </h1>
        )}
      </div>

      {pageType !== "end" && customizations?.createdBy?.visible && (
        <div
          className={cn(
            "flex items-center z-10 space-x-2 mt-auto h-11",

            customizations?.createdBy?.horizontal === "left"
              ? "justify-start"
              : customizations?.createdBy?.horizontal === "center"
              ? "justify-center"
              : "justify-end",

            customizations?.createdBy?.vertical === "top"
              ? "items-start"
              : customizations?.createdBy?.vertical === "center"
              ? "items-center"
              : "items-end"
          )}
        >
          <Image
            src={createdBy?.avatar}
            alt={createdBy?.username}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <div className="text-base font-bold">{createdBy?.name}</div>
            <div className="text-xs">@{createdBy?.username}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const EndPage = ({
  image,
  createdBy,
  customizations,
}: {
  image: string;
  createdBy: any;
  customizations: any;
}) => {
  return (
    <div
      className="h-full w-fit flex overflow-hidden bg-background justify-center items-center p-6 relative"
      style={{
        aspectRatio: customizations?.width / customizations?.height,
        minHeight: customizations?.height,
        maxHeight: customizations?.height,
      }}
    >
      <img
        src={image || "/carousel/bg-light.webp"}
        className="absolute z-0 inset-0 w-full h-full pointer-events-none object-cover"
        style={{ aspectRatio: customizations?.height / customizations?.width }}
      />

      <p
        className="absolute bottom-0 right-0 p-4 text-xs"
        style={{
          color: customizations?.fontColor,
        }}
      >
        powered by postt.ai
      </p>

      <div
        className={cn(
          "flex w-full h-full z-10 gap-4",

          customizations?.content?.horizontal === "left"
            ? "justify-start"
            : customizations?.content?.horizontal === "center"
            ? "justify-center"
            : "justify-end",

          customizations?.content?.vertical === "top"
            ? "items-start"
            : customizations?.content?.vertical === "center"
            ? "items-center"
            : "items-end"
        )}
      >
        <div className="p-2 rounded-full ring-[2px] ring-black/25">
          <Image
            src={createdBy?.avatar}
            alt={createdBy?.username}
            className="h-40 w-40 min-h-40 min-w-40 rounded-full"
          />
        </div>

        <div
          className="text-6xl h-44 items-center flex   font-semibold"
          style={{
            color: customizations?.fontColor,
            textAlign:
              customizations?.content?.horizontal === "left"
                ? "start"
                : customizations?.content?.horizontal === "center"
                ? "center"
                : "end",
          }}
        >
          {createdBy?.name}
        </div>
      </div>
    </div>
  );
};

const SlidePage = ({
  pageIndex,
  title,
  description,
  image,
  createdBy,
  customizations,
  pageType,
}: {
  pageIndex: number;
  title: string;
  description: string;
  image: string;
  createdBy: any;
  customizations: any;
  pageType: string;
}) => {
  return (
    <div
      className="h-full w-fit flex overflow-hidden bg-background justify-center flex-col  p-6  relative"
      style={{
        aspectRatio: customizations?.width / customizations?.height,
        minHeight: customizations?.height,
        maxHeight: customizations?.height,
      }}
    >
      <img
        src={image || "/carousel/bg-light.webp"}
        className="absolute z-0 inset-0 w-full h-full pointer-events-none object-cover"
        style={{ aspectRatio: customizations?.height / customizations?.width }}
      />

      <div
        className={cn(
          "z-10 ml-20 gap-0 my-auto flex flex-col  relative h-full",
          customizations?.content?.horizontal === "left"
            ? "items-start"
            : customizations?.content?.horizontal === "center"
            ? "items-center"
            : "items-end",

          customizations?.content?.vertical === "top"
            ? "justify-start"
            : customizations?.content?.vertical === "center"
            ? "justify-center"
            : "justify-end"
        )}
      >
        {customizations?.pageIndex?.visible && (
          <p className="outlined-text opacity-10  -translate-x-24 -translate-y-[10%] top-0 left-0 absolute text-[400px] font-extrabold">
            {pageIndex}
          </p>
        )}

        <h6 className="text-xl font-semibold ">{title}</h6>

        <p className="text-base">{description}</p>
      </div>

      {pageType !== "end" && customizations?.createdBy?.visible && (
        <div
          className={cn("mt-auto flex justify-between items-center z-10 h-11")}
        >
          <div
            className={cn(
              "flex items-center pr-4 space-x-2 w-full",

              customizations?.createdBy?.horizontal === "left"
                ? "justify-start"
                : customizations?.createdBy?.horizontal === "center"
                ? "justify-center"
                : "justify-end",

              customizations?.createdBy?.vertical === "top"
                ? "items-start"
                : customizations?.createdBy?.vertical === "center"
                ? "items-center"
                : "items-end"
            )}
          >
            <Image
              src={createdBy?.avatar}
              alt={createdBy?.username}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="">
              <div className="text-base font-bold">{createdBy?.name}</div>
              <div className="text-xs">@{createdBy?.username}</div>
            </div>
          </div>

          <div
            className="h-10 w-10 min-w-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: customizations?.fontColor,

              color: customizations?.backgroundColor,
            }}
          >
            <IoChevronForward />
          </div>
        </div>
      )}
    </div>
  );
};
