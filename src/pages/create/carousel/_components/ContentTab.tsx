import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import UploadTool from "@/components/UploadTool";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { GrFormEdit } from "react-icons/gr";
import { HiSparkles } from "react-icons/hi2";
import { LuCopy, LuImage } from "react-icons/lu";
import {
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdOutlineModeEdit,
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
    <div className="h-full w-full space-y-6 rounded-lg">
      {/* {slides[selectedSlide]?.pageType !== "end" && (
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
      )} */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="caption-field">Prompt</Label>
        <div
          id="caption-field"
          className="flex w-full flex-col rounded-lg border bg-muted"
        >
          <Textarea
            rows={5}
            placeholder="Type your caption here...."
            className="resize-none rounded-lg rounded-b-none border-0 bg-background shadow-none !ring-0"
          />
          <div className="ml-auto flex items-center gap-1 px-1 py-1">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-foreground hover:bg-muted-foreground/10"
            >
              <LuCopy />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full bg-muted-foreground/15 text-foreground hover:bg-muted-foreground/10"
            >
              <HiSparkles /> Generate
            </Button>
          </div>
        </div>
      </div>
      {/* Description Section */}

      {/* {slides[selectedSlide]?.pageType === "slide" && (
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
      )} */}

      <PositionButtons
        item="content"
        {...{ customizations, setCustomizations }}
      />

      <div className="flex flex-col gap-2">
        <Label>Adjust Design</Label>
        <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
          {customizations?.backgroundColor && (
            <DesignColor color={customizations?.backgroundColor} />
          )}
        </div>
      </div>

      {/* Background Image URL */}
      <div className="flex items-center justify-between gap-2 rounded-lg bg-muted p-2 pl-3">
        {/* <Label htmlFor="background-image-url">Image</Label> */}
        <div className="flex items-center gap-2">
          <LuImage />
          <span className="text-sm font-medium">Image</span>
        </div>
        <ImageUploadDialog
          slides={slides}
          setSlides={setSlides}
          selectedSlide={selectedSlide}
        >
          <Button variant="outline" className="rounded-full" size="sm">
            <GrFormEdit /> Edit
          </Button>
        </ImageUploadDialog>
      </div>
    </div>
  );
}

const ImageUploadDialog = ({
  children,
  slides,
  setSlides,
  selectedSlide,
}: {
  children: any;
  slides: any;
  setSlides: any;
  selectedSlide: any;
}) => {
  const handleUpload = (url: any) => {
    const newSlides = [...slides];
    newSlides[selectedSlide] = {
      ...newSlides[selectedSlide],
      image: url,
    };
    setSlides(newSlides);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <UploadTool
            label="Background Image"
            // value={backgroundImageUrl}
            onChange={handleUpload}
          />
        </div>
        {slides[selectedSlide]?.pageType === "start" && (
          <p
            className="w-fit cursor-pointer text-xs text-primary hover:underline"
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
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

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
    <div className="flex flex-col">
      <p className="mb-1 mt-0 text-sm font-medium">Position</p>

      <div className="flex justify-start gap-4 rounded-lg bg-muted p-1 px-3">
        <div className="flex items-center gap-2">
          <Button
            className={cn(
              "h-8 w-8 text-xs font-medium hover:bg-primary/75",
              customizations?.[item]?.vertical === "top"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white",
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
              "h-8 w-8 text-xs font-medium hover:bg-primary/75",
              customizations?.[item]?.vertical === "center"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white",
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
              "h-8 w-8 text-xs font-medium hover:bg-primary/75",
              customizations?.[item]?.vertical === "bottom"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white",
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

        <div className="my-2 h-8 w-[1px] bg-primary/15" />

        <div className="flex w-full items-center gap-2">
          <Button
            className={cn(
              "h-8 w-8 text-xs font-medium hover:bg-primary/75",
              customizations?.[item]?.horizontal === "left"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white",
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
              "h-8 w-8 text-xs font-medium hover:bg-primary/75",
              customizations?.[item]?.horizontal === "center"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white",
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
              "h-8 w-8 text-xs font-medium hover:bg-primary/75",
              customizations?.[item]?.horizontal === "right"
                ? "bg-primary text-white"
                : "bg-primary/15 text-slate-700 hover:text-white",
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

function DesignColor({
  color = "#00d5f6",
  setColor,
  className,
}: {
  color: any;
  setColor: any;
  className?: string;
}) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = () => {
    if (colorInputRef?.current) {
      colorInputRef?.current?.click();
    }
  };

  const handleColorChange = (event: any) => {
    const selectedColor = event?.target?.value;
    setColor(selectedColor);
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "relative cursor-pointer rounded-full border p-4",
        className,
      )}
      style={{
        backgroundColor: color,
      }}
    >
      <input
        type="color"
        ref={colorInputRef}
        onChange={handleColorChange}
        className="pointer-events-none absolute top-0 opacity-0"
      />
    </div>
  );
}