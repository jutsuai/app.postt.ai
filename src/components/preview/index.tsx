import { cn } from "@/lib/utils";
import { IoChevronForward } from "react-icons/io5";
import { useRef, useState } from "react";
import BoringAvatar from "@/components/BoringAvatar";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Arrows from "./_components/Arrows";

export default function PreviewSection({
  hideHeader,
  hideFooter,
  hideArrows,

  slides,
  setSlides,
  selectedSlide,
  setSelectedSlide,

  customizations,
  createdBy,

  type,
  commentary,
  setCommentary,

  // type = image
  image,
}: {
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideArrows?: boolean;

  slides?: any;
  setSlides?: any;
  customizations?: any;

  selectedSlide?: any;
  setSelectedSlide?: any;

  createdBy?: any;

  type?: "text" | "image" | "carousel" | "document";
  commentary?: any;
  setCommentary?: any;

  // type = image
  image?: any;
}) {
  const initialCommentary = useRef(commentary);
  const [onHover, setOnHover] = useState(false);

  const slide = type === "carousel" ? slides[selectedSlide] : {};

  return (
    <div className="mx-auto flex h-full w-full flex-1 items-center justify-center rounded-lg bg-[#f3f4f6]">
      <div
        className="relative mx-auto flex w-min select-none flex-col gap-2 rounded-xl border bg-background"
        style={{ width: customizations?.size?.width }}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        {!hideHeader && <Header createdBy={createdBy} />}

        <p
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setCommentary(e.currentTarget.textContent)}
          className={cn(
            "whitespace-pre-wrap px-4 text-sm",
            slides && "col-span-6",
          )}
        >
          {initialCommentary.current}
        </p>

        {type === "carousel" ? (
          <CarouselPreview
            slides={slides}
            setSlides={setSlides}
            selectedSlide={selectedSlide}
            setSelectedSlide={setSelectedSlide}
            createdBy={createdBy}
            customizations={customizations}
            hideArrows={hideArrows}
            slide={slide}
            onHover={onHover}
          />
        ) : (
          type === "image" && (
            <img className="w-full" src={image} alt={slide._id} />
          )
        )}

        {!hideFooter && <Footer createdBy={createdBy} />}
      </div>
    </div>
  );
}
export const CarouselPreview = ({
  slides,
  setSlides,
  selectedSlide,
  setSelectedSlide,
  createdBy,
  customizations,
  hideArrows,
  slide,
  onHover,
}: {
  slides: any;
  setSlides?: any;
  selectedSlide: any;
  setSelectedSlide?: any;
  createdBy: any;
  customizations: any;
  hideArrows?: any;
  slide: any;
  onHover?: any;
}) => {
  return (
    <>
      <Arrows
        setSelectedSlide={setSelectedSlide}
        slides={slides}
        selectedSlide={selectedSlide}
        hideArrows={hideArrows}
        onHover={onHover}
      />

      {slide?.pageType == "start" ? (
        <StartPage
          slide={slide}
          createdBy={createdBy}
          customizations={customizations}
          slides={slides}
          setSlides={setSlides}
          selectedSlide={selectedSlide}
        />
      ) : slide?.pageType == "end" ? (
        <EndPage
          slide={slide}
          createdBy={createdBy}
          customizations={customizations}
        />
      ) : (
        <SlidePage
          key={slide?._id}
          slide={slide}
          selectedSlide={selectedSlide}
          createdBy={createdBy}
          customizations={customizations}
          slides={slides}
          setSlides={setSlides}
        />
      )}
    </>
  );
};

const StartPage = ({
  slide,

  createdBy,
  customizations,

  slides,
  setSlides,
  selectedSlide,
}: {
  slide: any;

  createdBy: any;
  customizations: any;

  slides: any;
  setSlides: any;
  selectedSlide: any;
}) => {
  const { title, image, pageType } = slide;
  const initialTitle = useRef(title);

  return (
    <div
      className="relative z-0 flex w-fit flex-col justify-center overflow-hidden bg-background p-6"
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
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              const newSlides = [...slides];
              newSlides[selectedSlide] = {
                ...newSlides[selectedSlide],
                title: e.currentTarget.textContent,
              };
              setSlides(newSlides);
            }}
            className="text-4xl font-semibold leading-normal text-gray-800"
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
          <BoringAvatar
            src={createdBy?.logo}
            alt={createdBy?.name}
            className="h-9 w-9 rounded-full object-cover"
          />

          <div>
            <div className="text-sm font-bold">{createdBy?.name}</div>
            <div className="text-xs">{`@${createdBy?.slug}`}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const EndPage = ({
  slide,
  createdBy,
  customizations,
}: {
  slide: any;
  createdBy: any;
  customizations: any;
}) => {
  const { image } = slide;

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
          <BoringAvatar
            src={createdBy?.logo}
            alt={createdBy?.name}
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
          {createdBy.name}
        </div>
      </div>
    </div>
  );
};

const SlidePage = ({
  slide,
  selectedSlide,
  createdBy,
  customizations,
  slides,
  setSlides,
}: {
  slide: any;
  selectedSlide: any;
  createdBy: any;
  customizations: any;
  slides: any;
  setSlides: any;
}) => {
  const { title, description, image } = slide || {};

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
        src={image}
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
            {selectedSlide}
          </p>
        )}

        <h6
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => {
            const newSlides = [...slides];
            newSlides[selectedSlide] = {
              ...newSlides[selectedSlide],
              title: e.currentTarget.textContent,
            };
            setSlides(newSlides);
          }}
          className="z-10 w-full text-xl font-semibold"
        >
          {initialTitle.current}
        </h6>

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
          <BoringAvatar
            src={createdBy?.logo}
            alt={createdBy?.name}
            name={createdBy?.name}
            className="h-9 w-9 rounded-full object-cover"
          />

          <div className="">
            <div className="text-sm font-bold">{createdBy?.name}</div>
            <div className="text-xs">{`@${createdBy?.slug}`}</div>
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
    </div>
  );
};
