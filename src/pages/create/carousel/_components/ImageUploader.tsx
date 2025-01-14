import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UploadTool from "@/components/UploadTool";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { GrFormEdit } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { LuImage } from "react-icons/lu";

export default function ImageUploader({
  slides,
  setSlides,
  selectedSlide,
  customizations,
  setCustomizations
}: {
  slides: any;
  setSlides: any;
    selectedSlide: any;
    customizations: any;
    setCustomizations: any;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col gap-2 rounded-lg bg-muted p-2 pl-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between gap-2">
        {/* <Label htmlFor="background-image-url">Image</Label> */}
        <div className="flex items-center gap-2">
          <LuImage />
          <span className="text-sm font-medium">Image</span>
        </div>
        <ImageUploadDialog
          onClick={(url: any, custom?: any) => {
            const newSlides = [...slides];
            newSlides[selectedSlide] = {
              ...newSlides[selectedSlide],
              image: url,
            };
            if (custom) {
              setCustomizations({
                ...customizations,
                fontColor: custom?.fontColor,
                backgroundColor: custom?.backgroundColor,
              })
            }
            setSlides(newSlides);

          }}
        >
          <Button variant="outline" className="rounded-full" size="sm">
            <GrFormEdit /> Edit
          </Button>
        </ImageUploadDialog>
      </div>

      {slides[selectedSlide]?.image && (
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className={cn(
                "absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-background transition hover:bg-destructive",
                hovered ? "visible" : "invisible",
              )}
              onClick={() => {
                setSlides((prev: any) => {
                  const newSlides = [...prev];
                  newSlides[selectedSlide] = {
                    ...newSlides[selectedSlide],
                    image: "",
                  };
                  return newSlides;
                });
              }}
            >
              <IoClose />
            </button>
            <img
              src={slides[selectedSlide]?.image}
              alt="background"
              className="w-16 rounded-lg border object-cover"
            />
          </div>
        </div>
      )}

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
    </div>
  );
}

const templates = [
  { fontColor: "#FFFFFF", backgroundColor: "#000000", imageUrl: "https://s3.amazonaws.com/cdn.postt.ai/background-templates/1.svg" },
  { fontColor: "#000000", backgroundColor: "#FFFFFF", imageUrl: "https://s3.amazonaws.com/cdn.postt.ai/background-templates/2.svg" },
  { fontColor: "#000000", backgroundColor: "#FFFFFF", imageUrl: "https://s3.amazonaws.com/cdn.postt.ai/background-templates/3.svg" },
  { fontColor: "#FFFFFF", backgroundColor: "#000000", imageUrl: "https://s3.amazonaws.com/cdn.postt.ai/background-templates/4.svg" },
  { fontColor: "#FFFFFF", backgroundColor: "#000000", imageUrl: "https://s3.amazonaws.com/cdn.postt.ai/background-templates/5.svg" },
  { fontColor: "#FFFFFF", backgroundColor: "#000000", imageUrl: "https://s3.amazonaws.com/cdn.postt.ai/background-templates/6.svg" },
  { fontColor: "#FFFFFF", backgroundColor: "#000000", imageUrl: "https://s3.amazonaws.com/cdn.postt.ai/background-templates/7.svg" },
  { fontColor: "#1b00c2", backgroundColor: "#FFFFFF", imageUrl: "https://s3.amazonaws.com/cdn.postt.ai/background-templates/8.svg" },
  { fontColor: "#FFFFFF", backgroundColor: "#000000", imageUrl: "https://s3.amazonaws.com/cdn.postt.ai/background-templates/9.svg" },
  { fontColor: "#000000", backgroundColor: "#FFFFFF", imageUrl: "https://s3.amazonaws.com/cdn.postt.ai/background-templates/10.svg" }
];



export const ImageUploadDialog = ({
  children,
  onClick,
}: {
  children: any;
  onClick?: any;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xl"> 
        <div className="flex flex-col gap-4">
          <UploadTool
            label="Image"
            // value={backgroundImageUrl}
            onChange={(e: any) => {
              onClick(e);
              setOpen(false);
            }}
          />

          <p className="text-sm font-medium text-muted-foreground text-center my-4">
            or Choose an image from the gallery
          </p>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] animate-in duration-200 gap-4 max-h-[300px] overflow-y-auto">
            {templates?.map((item, index) => <Image loading="lazy" key={index} src={item?.imageUrl} alt='tempalte' onClick={() => {
              onClick(item?.imageUrl, {fontColor: item?.fontColor,backgroundColor: item?.backgroundColor});
              setOpen(false);
           }} className="border rounded-xl transition-all duration-200 hover:shadow-lg"/>)}
          </div>
        </div>

        {/* {slides[selectedSlide]?.pageType === "start" && (
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
          )} */}
      </DialogContent>
    </Dialog>
  );
};
