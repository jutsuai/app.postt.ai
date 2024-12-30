import Image from "@/components/Image";
import { cn } from "@/lib/utils";
import { IoChevronForward } from "react-icons/io5";

export default function PreviewSection({
  className,

  pageType,

  createdBy,

  curIndex,
  title,
  description,
  image,

  customizations,
}: {
  className?: string;

  pageType: any;

  createdBy: any;

  curIndex: any;
  title: string;
  description: string;
  image: string;

  customizations: any;
}) {
  console.log("=========", pageType);

  return (
    <div
      className={cn(
        "p-3 bg-muted relative shadow-md border w-full h-full rounded-xl",
        className
      )}
    >
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
          curIndex={curIndex}
          title={title}
          description={description}
          image={image}
          createdBy={createdBy}
          customizations={customizations}
          pageType={pageType}
        />
      )}
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
    <div className="h-full w-full flex overflow-hidden bg-background justify-center flex-col  p-6 aspect-[4/5] relative">
      <img
        src={image || "/carousel/bg-light.webp"}
        className="absolute z-0 inset-0 w-full h-full pointer-events-none"
      />

      <div
        className={cn(
          "z-10  w-full space-y-2 my-auto",

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
        {customizations?.title?.visible && (
          <h1
            className="text-6xl text-gray-800 font-semibold leading-normal"
            style={{ textAlign: customizations?.content?.horizontal }}
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

          <div className="">
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
    <div className="h-full w-full flex overflow-hidden bg-background justify-center items-center p-6 relative">
      <img
        src={image || "/carousel/bg-light.webp"}
        className="absolute z-0 inset-0 w-full h-full pointer-events-none"
      />

      <p
        className="absolute bottom-10 right-10 p-4 text-xs"
        style={{
          color: customizations?.fontColor,
        }}
      >
        powered by postt.ai
      </p>

      <div
        className={cn(
          "flex w-full h-full z-10 ",

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
        <div
          className={cn(
            "gap-6 flex items-center",

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
          <div className="p-2 rounded-full ring-[2px] ring-black/25">
            <Image
              src={createdBy?.avatar}
              alt={createdBy?.username}
              className="w-44 h-44 min-h-44 min-w-44 rounded-full"
            />
          </div>

          <div
            className="text-7xl font-semibold"
            style={{
              color: customizations?.fontColor,
            }}
          >
            {createdBy?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

const SlidePage = ({
  curIndex,
  title,
  description,
  image,
  createdBy,
  customizations,
  pageType,
}: {
  curIndex: number;
  title: string;
  description: string;
  image: string;
  createdBy: any;
  customizations: any;
  pageType: string;
}) => {
  return (
    <div className="h-full w-full flex overflow-hidden bg-background justify-center flex-col  p-6 aspect-[4/5] relative">
      <img
        src={image || "/carousel/bg-light.webp"}
        className="absolute z-0 inset-0 w-full h-full pointer-events-none"
      />

      <div
        className={cn(
          "z-10 space-y-4 my-auto translate-y-1/3 h-full",
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
        <p className="outlined-text opacity-10  -translate-x-7 -translate-y-[40%] top-0 left-0 absolute text-[400px] font-extrabold">
          {curIndex}
        </p>
        <div className="ml-20 max-w-sm space-y-1 -translate-y-2">
          <h6 className="text-xl font-semibold ">{title}</h6>

          <p className="text-base">{description}</p>
        </div>
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
            className="h-10 w-10 rounded-full flex items-center justify-center"
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
