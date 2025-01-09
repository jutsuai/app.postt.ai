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
import { useState } from "react";

export default function PreviewSection({
  hideHeader,
  hideFooter,
  hideArrows,

  pageType,
  slides,
  createdBy,

  pageIndex,
  title,
  description,
  image,

  selectedSlide,
  setSelectedSlide,

  commentary,
  customizations,
}: {
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideArrows?: boolean;

  className?: string;

  pageType?: any;

  slides?: any;

  createdBy?: any;

  pageIndex?: any;
  title?: string;
  description?: string;
  image?: string;
  selectedSlide?: any;
  setSelectedSlide?: any;

  commentary?: any;
  customizations?: any;
}) {
  // console.log(customizations);

  const [onHover, setOnHover] = useState(false);
  return (
    <div className="w-full h-full flex justify-center items-center mx-auto  bg-[#f3f4f6] rounded-lg flex-1">
      <div
        className="mx-auto bg-background border   rounded-xl relative flex flex-col w-min gap-2 select-none"
        style={{
          width: customizations?.size?.width,
          // height: customizations?.size?.height,
        }}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        {!hideHeader && <HeaderSection createdBy={createdBy} />}

        <p
          className={cn(
            "whitespace-pre-wrap px-4  text-sm",

            slides && "col-span-6"
          )}
        >
          {commentary}
        </p>

        {slides && (
          <>
            {!hideArrows && (
              <div
                className={cn(
                  "absolute top-[50%] z-20 right-0 left-0 transition flex justify-between px-4",

                  onHover ? "opacity-100" : "opacity-0"
                )}
              >
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
            )}

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
          </>
        )}

        {!hideFooter && <FooterSection createdBy={createdBy} />}
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
  title: any;
  image: any;
  createdBy: any;
  customizations: any;
  pageType: any;
}) => {
  return (
    <div
      className=" flex overflow-hidden bg-background justify-center flex-col p-6 w-fit relative"
      style={{
        aspectRatio: customizations?.size?.width / customizations?.size?.height,
        minHeight: customizations?.size?.height,
        maxHeight: customizations?.size?.height,
      }}
    >
      <img
        src={image || "/carousel/bg-light.webp"}
        className="absolute z-0 inset-0 w-full h-full pointer-events-none object-cover"
        style={{
          aspectRatio:
            customizations?.size?.height / customizations?.size?.width,
        }}
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
            className="text-4xl text-gray-800 font-semibold leading-normal"
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
            className="w-9 h-9 rounded-full object-cover"
          />

          <div>
            <div className="text-sm font-bold">{`${createdBy.firstName} ${createdBy.lastName}`}</div>
            <div className="text-xs">
              {createdBy?.username
                ? `@${createdBy?.username}`
                : createdBy?.email}
            </div>
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
  image: any;
  createdBy: any;
  customizations: any;
}) => {
  return (
    <div
      className="h-full w-fit flex overflow-hidden bg-background justify-center items-center p-6 relative"
      style={{
        aspectRatio: customizations?.size?.width / customizations?.size?.height,
        minHeight: customizations?.size?.height,
        maxHeight: customizations?.size?.height,
      }}
    >
      <img
        src={image || "/carousel/bg-light.webp"}
        className="absolute z-0 inset-0 w-full h-full pointer-events-none object-cover"
        style={{
          aspectRatio:
            customizations?.size?.height / customizations?.size?.width,
        }}
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
            className="h-24 w-24 min-h-24 min-w-24 rounded-full"
          />
        </div>

        <div
          className="text-4xl h-44 items-center flex   font-semibold"
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
          {`${createdBy.firstName} ${createdBy.lastName}`}
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
  pageIndex: any;
  title: any;
  description: any;
  image?: any;
  createdBy: any;
  customizations: any;
  pageType: any;
}) => {
  return (
    <div
      className="h-full w-fit flex overflow-hidden bg-background justify-center flex-col  p-6  relative"
      style={{
        aspectRatio: customizations?.size?.width / customizations?.size?.height,
        minHeight: customizations?.size?.height,
        maxHeight: customizations?.size?.height,
      }}
    >
      <img
        src={image || "/carousel/bg-light.webp"}
        className="absolute z-0 inset-0 w-full h-full pointer-events-none object-cover"
        style={{
          aspectRatio:
            customizations?.size?.height / customizations?.size?.width,
        }}
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
          <p className="outlined-text opacity-10  -translate-x-24 -translate-y-[10%] top-0 left-0 absolute text-[350px] font-extrabold">
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
              className="w-9 h-9 rounded-full object-cover"
            />

            <div className="">
              <div className="text-sm font-bold">{`${createdBy?.firstName} ${createdBy?.lastName}`}</div>
              <div className="text-xs">
                {" "}
                {createdBy?.username
                  ? `@${createdBy?.username}`
                  : createdBy?.email}
              </div>
            </div>
          </div>

          <div
            className="h-9 w-9 min-w-9 rounded-full flex items-center justify-center"
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

// Sections
const HeaderSection = ({ createdBy }: { createdBy: any }) => {
  return (
    <div className="flex items-start px-4 pt-4 justify-between gap-3">
      <Image
        src={createdBy?.avatar}
        alt={createdBy?.username}
        className="w-12 h-12 rounded-full object-cover object-center"
      />
      <div className="flex mr-auto flex-col leading-tight">
        <div className="flex w-full gap-2 items-center">
          <span className="font-semibold text-sm">
            {" "}
            {`${createdBy.firstName} ${createdBy.lastName}`}
          </span>
          <span className="text-xs text-muted-foreground">●</span>
          <span className="text-muted-foreground text-sm">3rd+</span>
        </div>
        <div className="text-muted-foreground text-xs">
          postt.ai | LinkedIn Automation
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
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
  );
};

const FooterSection = ({ createdBy }: { createdBy: any }) => {
  return (
    <div className="px-4 pb-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1">
          <div className="p-0.5 text-xs flex items-center border justify-center rounded-full bg-blue-600/70 w-fit">
            <AiTwotoneLike className="-scale-x-[1]" />
          </div>
          <div className="p-0.5 text-xs rounded-full flex border items-center justify-center bg-red-600/70 w-fit">
            <AiTwotoneHeart />
          </div>
        </div>
        <p className="text-muted-foreground text-xs">
          Alex Colen and 230 others
        </p>
        <p className="text-muted-foreground ml-auto text-xs">15 comments</p>
      </div>
      <Separator />
      <div className="flex items-center justify-around">
        <Image
          src={createdBy?.avatar}
          alt={createdBy?.username}
          className="w-6 h-6 rounded-full object-cover object-center"
        />
        <div className="flex items-center gap-2 font-medium text-sm">
          <SlLike className="-scale-x-[1] text-base" />
          Like
        </div>
        <div className="flex items-center gap-2 font-medium text-sm">
          <TfiCommentAlt className="-scale-x-[1] text-base" />
          Comment
        </div>
        <div className="flex items-center gap-2 font-medium text-sm">
          <LiaShareSolid className=" text-base" />
          Share
        </div>
        <div className="flex items-center gap-2 font-medium text-sm">
          <IoBookmarkOutline className=" text-base" />
          Save
        </div>
      </div>
    </div>
  );
};
// End of Sections
