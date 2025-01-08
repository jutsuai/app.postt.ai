import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import UploadTool from "@/components/UploadTool";
import { cn } from "@/lib/utils";
import {
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdVerticalAlignBottom,
  MdVerticalAlignCenter,
  MdVerticalAlignTop,
} from "react-icons/md";

export default function ContentTab({
  slides,
  setSlides,
  selectedSlide,

  //
  customizations,
  setCustomizations,
}: {
  slides: any;
  setSlides: any;
  selectedSlide: any;

  //
  customizations: any;
  setCustomizations: any;
}) {
  console.log("slides", slides);
  console.log("selectedSlide", selectedSlide);

  return (
    <div className="space-y-6 bg-muted shadow-md p-4 border rounded-lg h-full">
      <h3 className="text-base font-semibold">Content Edit</h3>

      {/* Title Section */}

      {slides[selectedSlide]?.pageType !== "end" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Title</span>
            <Switch
              checked={customizations?.title?.visible}
              onCheckedChange={
                customizations?.title?.visible
                  ? () =>
                      setCustomizations({
                        ...customizations,
                        title: { ...customizations.title, visible: false },
                      })
                  : () =>
                      setCustomizations({
                        ...customizations,
                        title: { ...customizations.title, visible: true },
                      })
              }
            />
          </div>

          <Input
            disabled={!customizations?.title?.visible}
            type="text"
            value={slides[selectedSlide].title}
            onChange={(e) => {
              const newSlides = [...slides];
              newSlides[selectedSlide] = {
                ...newSlides[selectedSlide],
                title: e.target.value,
              };
              setSlides(newSlides);
            }}
            className="bg-background"
          />
        </div>
      )}

      {/* Description Section */}

      {slides[selectedSlide]?.pageType === "slide" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Description</span>
            <Switch
              checked={customizations?.description?.visible}
              onCheckedChange={
                customizations?.description?.visible
                  ? () =>
                      setCustomizations({
                        ...customizations,
                        description: {
                          ...customizations.description,
                          visible: false,
                        },
                      })
                  : () =>
                      setCustomizations({
                        ...customizations,
                        description: {
                          ...customizations.description,
                          visible: true,
                        },
                      })
              }
            />
          </div>

          <Textarea
            disabled={!customizations?.description?.visible}
            value={slides[selectedSlide].description}
            onChange={(e) => {
              const newSlides = [...slides];
              newSlides[selectedSlide] = {
                ...newSlides[selectedSlide],
                description: e.target.value,
              };
              setSlides(newSlides);
            }}
            rows={4}
            className="bg-background"
          />
        </div>
      )}

      <PositionButtons
        item="content"
        {...{ customizations, setCustomizations }}
      />

      {/* Background Image URL */}
      <div>
        <UploadTool
          label="Background Image"
          // value={backgroundImageUrl}
          // onChange={setBackgroundImageUrl}

          value={slides[selectedSlide].image}
          onChange={(image: string) => {
            const newSlides = [...slides];
            newSlides[selectedSlide] = {
              ...newSlides[selectedSlide],
              image,
            };
            setSlides(newSlides);
          }}
          placeholder="https://example.com/image.jpg"
        />

        {slides[selectedSlide]?.pageType === "start" && (
          <Button
            variant="link"
            className="text-xs"
            onClick={() => {
              const newSlides = [...slides];
              newSlides.forEach((slide, index) => {
                newSlides[index] = {
                  ...newSlides[index],
                  image: slides[selectedSlide].image,
                };
              });
              setSlides(newSlides);
            }}
          >
            Use Same Image for All Slides
          </Button>
        )}
      </div>
    </div>
  );
}

const PositionButtons = ({
  customizations,
  setCustomizations,

  item,
}: {
  customizations: any;
  setCustomizations: any;

  item: any;
}) => {
  return (
    <div className="flex flex-col ">
      <p className="text-sm font-medium mt-0 mb-1">Position</p>

      <div className="flex justify-start gap-4">
        <div className="flex items-center gap-2">
          <Button
            className={cn(
              "w-8 h-8 text-xs font-medium hover:bg-primary/75",
              customizations?.[item]?.vertical === "top"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white"
            )}
            onClick={() => {
              setCustomizations({
                ...customizations,
                [item]: {
                  ...customizations?.[item],
                  vertical: "top",
                },
              });
            }}
          >
            <MdVerticalAlignTop />
          </Button>
          <Button
            className={cn(
              "w-8 h-8 text-xs hover:bg-primary/75 font-medium",
              customizations?.[item]?.vertical === "center"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white"
            )}
            onClick={() => {
              setCustomizations({
                ...customizations,
                [item]: {
                  ...customizations?.[item],
                  vertical: "center",
                },
              });
            }}
          >
            <MdVerticalAlignCenter />
          </Button>
          <Button
            className={cn(
              "w-8 h-8 text-xs hover:bg-primary/75 font-medium",
              customizations?.[item]?.vertical === "bottom"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white"
            )}
            onClick={() => {
              setCustomizations({
                ...customizations,
                [item]: {
                  ...customizations?.[item],
                  vertical: "bottom",
                },
              });
            }}
          >
            <MdVerticalAlignBottom />
          </Button>
        </div>

        <div className="h-8 w-[1px] bg-primary/15 my-2" />

        <div className="flex items-center gap-2 w-full  ">
          <Button
            className={cn(
              "w-8 h-8 text-xs hover:bg-primary/75 font-medium",
              customizations?.[item]?.horizontal === "left"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white"
            )}
            onClick={() => {
              setCustomizations({
                ...customizations,
                [item]: {
                  ...customizations?.[item],
                  horizontal: "left",
                },
              });
            }}
          >
            <MdFormatAlignLeft />
          </Button>
          <Button
            className={cn(
              "w-8 h-8 text-xs hover:bg-primary/75 font-medium",
              customizations?.[item]?.horizontal === "center"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white"
            )}
            onClick={() => {
              setCustomizations({
                ...customizations,
                [item]: {
                  ...customizations?.[item],
                  horizontal: "center",
                },
              });
            }}
          >
            <MdFormatAlignCenter />
          </Button>
          <Button
            className={cn(
              "w-8 h-8 text-xs hover:bg-primary/75 font-medium",
              customizations?.[item]?.horizontal === "right"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white"
            )}
            onClick={() => {
              setCustomizations({
                ...customizations,
                [item]: {
                  ...customizations?.[item],
                  horizontal: "right",
                },
              });
            }}
          >
            <MdFormatAlignRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
