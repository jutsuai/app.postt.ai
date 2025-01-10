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

  setSlides,
  createdBy,

  pageIndex,
  title,
  description,
  image,

  selectedSlide,
  setSelectedSlide,

  commentary,
  customizations,
  setCommentary,
}: {
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideArrows?: boolean;

  className?: string;

  pageType?: any;

  slides?: any;
  setSlides?: any;

  createdBy?: any;

  pageIndex?: any;
  title?: string;
  description?: string;
  image?: string;
  selectedSlide?: any;
  setSelectedSlide?: any;

  commentary?: any;
  customizations?: any;
  setCommentary?: any;
}) {
  const [onHover, setOnHover] = useState(false);

  const initialCommentary = useRef(commentary);
  return (
    <div className="mx-auto flex h-full w-full flex-1 items-center justify-center rounded-lg bg-[#f3f4f6]">
      <div
        className="relative mx-auto flex w-min select-none flex-col gap-2 rounded-xl border bg-background"
        style={{
          width: customizations?.size?.width,
          // height: customizations?.size?.height,
        }}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        {!hideHeader && <HeaderSection createdBy={createdBy} />}

        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => {
            setCommentary(e.currentTarget.textContent);
          }}
          className={cn(
            "whitespace-pre-wrap px-4 text-sm",

            slides && "col-span-6",
          )}
        >
          {initialCommentary.current}
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
              </>
            )}

            {pageType == "start" ? (
              <StartPage
                title={title}
                image={image}
                createdBy={createdBy}
                customizations={customizations}
                pageType={pageType}
                slides={slides}
                setSlides={setSlides}
                selectedSlide={selectedSlide}
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
                slides={slides}
                setSlides={setSlides}
                selectedSlide={selectedSlide}
              />
            )}
          </>
        )}

        {/* <img className="w-full" src={image} alt="" /> */}

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
  slides,
  setSlides,
  selectedSlide,
}: {
  title: any;
  image: any;
  createdBy: any;
  customizations: any;
  pageType: any;
  slides: any;
  setSlides: any;
  selectedSlide: any;
}) => {
  const initialTitle = useRef(title);

  return (
    <div
      className="relative flex w-fit flex-col justify-center overflow-hidden bg-background p-6"
      style={{
        aspectRatio: customizations?.size?.width / customizations?.size?.height,
        minHeight: customizations?.size?.height,
        maxHeight: customizations?.size?.height,
      }}
    >
      <img
        src={image || "/carousel/bg-light.webp"}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        style={{
          aspectRatio:
            customizations?.size?.height / customizations?.size?.width,
        }}
      />

      <div
        className={cn(
          "z-10 my-auto flex h-full w-full space-y-2",

          customizations?.content?.horizontal === "left"
            ? "justify-start"
            : customizations?.content?.horizontal === "center"
              ? "justify-center"
              : "justify-end",

          customizations?.content?.vertical === "top"
            ? "items-start"
            : customizations?.content?.vertical === "center"
              ? "items-center"
              : "items-end",
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
            {initialTitle.current}
          </h1>
        )}
      </div>

      {pageType !== "end" && customizations?.createdBy?.visible && (
        <div
          className={cn(
            "z-10 mt-auto flex h-11 items-center space-x-2",

            customizations?.createdBy?.horizontal === "left"
              ? "justify-start"
              : customizations?.createdBy?.horizontal === "center"
                ? "justify-center"
                : "justify-end",

            customizations?.createdBy?.vertical === "top"
              ? "items-start"
              : customizations?.createdBy?.vertical === "center"
                ? "items-center"
                : "items-end",
          )}
        >
          <Image
            src={createdBy?.avatar}
            alt={createdBy?.username}
            className="h-9 w-9 rounded-full object-cover"
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
      className="relative flex h-full w-fit items-center justify-center overflow-hidden bg-background p-6"
      style={{
        aspectRatio: customizations?.size?.width / customizations?.size?.height,
        minHeight: customizations?.size?.height,
        maxHeight: customizations?.size?.height,
      }}
    >
      <img
        src={image || "/carousel/bg-light.webp"}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
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
          "z-10 flex h-full w-full gap-4",

          customizations?.content?.horizontal === "left"
            ? "justify-start"
            : customizations?.content?.horizontal === "center"
              ? "justify-center"
              : "justify-end",

          customizations?.content?.vertical === "top"
            ? "items-start"
            : customizations?.content?.vertical === "center"
              ? "items-center"
              : "items-end",
        )}
      >
        <div className="rounded-full p-2 ring-[2px] ring-black/25">
          <Image
            src={createdBy?.avatar}
            alt={createdBy?.username}
            className="h-24 min-h-24 w-24 min-w-24 rounded-full"
          />
        </div>

        <div
          className="flex h-44 items-center text-4xl font-semibold"
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
  slides,
  setSlides,
  selectedSlide,
}: {
  pageIndex: any;
  title: any;
  description: any;
  image?: any;
  createdBy: any;
  customizations: any;
  pageType: any;
  slides: any;
  setSlides: any;
  selectedSlide: any;
}) => {
  const initialTitle = useRef(title);
  const initialDescription = useRef(description);
  return (
    <div
      className="relative flex h-full w-fit flex-col justify-center overflow-hidden bg-background p-6"
      style={{
        aspectRatio: customizations?.size?.width / customizations?.size?.height,
        minHeight: customizations?.size?.height,
        maxHeight: customizations?.size?.height,
      }}
    >
      <img
        src={image || "/carousel/bg-light.webp"}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        style={{
          aspectRatio:
            customizations?.size?.height / customizations?.size?.width,
        }}
      />

      <div
        className={cn(
          "relative z-10 my-auto ml-20 flex h-full flex-col gap-0",
          customizations?.content?.horizontal === "left"
            ? "items-start"
            : customizations?.content?.horizontal === "center"
              ? "items-center"
              : "items-end",

          customizations?.content?.vertical === "top"
            ? "justify-start"
            : customizations?.content?.vertical === "center"
              ? "justify-center"
              : "justify-end",
        )}
      >
        {customizations?.pageIndex?.visible && (
          <p className="outlined-text absolute left-0 top-0 -translate-x-24 -translate-y-[10%] text-[350px] font-extrabold opacity-10">
            {pageIndex}
          </p>
        )}

        <h6 className="text-xl font-semibold ">{title}</h6>

        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => {
            const newSlides = [...slides];
            newSlides[selectedSlide] = {
              ...newSlides[selectedSlide],
              description: e.currentTarget.textContent,
            };
            setSlides(newSlides);
          }}
          className="z-10 w-full text-base"
        >
          {initialDescription.current}
        </p>
      </div>

      {pageType !== "end" && customizations?.createdBy?.visible && (
        <div
          className={cn("z-10 mt-auto flex h-11 items-center justify-between")}
        >
          <div
            className={cn(
              "flex w-full items-center space-x-2 pr-4",

              customizations?.createdBy?.horizontal === "left"
                ? "justify-start"
                : customizations?.createdBy?.horizontal === "center"
                  ? "justify-center"
                  : "justify-end",

              customizations?.createdBy?.vertical === "top"
                ? "items-start"
                : customizations?.createdBy?.vertical === "center"
                  ? "items-center"
                  : "items-end",
            )}
          >
            <Image
              src={createdBy?.avatar}
              alt={createdBy?.username}
              className="h-9 w-9 rounded-full object-cover"
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
            className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full"
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
          <span className="text-sm text-muted-foreground">3rd+</span>
        </div>
        <div className="text-muted-foreground text-xs">
          postt.ai | LinkedIn Automation
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>3d</span>
          <span className="scale-75 text-xs text-muted-foreground">●</span>
          <FaGlobeAmericas />
        </div>
      </div>
      <Button
        className="ml-auto w-fit text-[#0072b1] hover:text-[#0072b1]"
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
    <div className="flex flex-col gap-3 px-4 pb-4">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1">
          <div className="flex w-fit items-center justify-center rounded-full border bg-blue-600/70 p-0.5 text-xs">
            <AiTwotoneLike className="-scale-x-[1]" />
          </div>
          <div className="flex w-fit items-center justify-center rounded-full border bg-red-600/70 p-0.5 text-xs">
            <AiTwotoneHeart />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Alex Colen and 230 others
        </p>
        <p className="ml-auto text-xs text-muted-foreground">15 comments</p>
      </div>
      <Separator />
      <div className="flex items-center justify-around">
        <Image
          src={createdBy?.avatar}
          alt={createdBy?.username}
          className="w-6 h-6 rounded-full object-cover object-center"
        />
        <div className="flex items-center gap-2 text-sm font-medium">
          <SlLike className="-scale-x-[1] text-base" />
          Like
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <TfiCommentAlt className="-scale-x-[1] text-base" />
          Comment
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <LiaShareSolid className="text-base" />
          Share
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <IoBookmarkOutline className="text-base" />
          Save
        </div>
      </div>
    </div>
  );
};
// End of Sections
