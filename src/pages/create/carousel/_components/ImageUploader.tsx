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
}: {
  slides: any;
  setSlides: any;
  selectedSlide: any;
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
          onClick={(url: any) => {
            const newSlides = [...slides];
            newSlides[selectedSlide] = {
              ...newSlides[selectedSlide],
              image: url,
            };
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
      <DialogContent>
        <div className="flex flex-col gap-4">
          <UploadTool
            label="Image"
            // value={backgroundImageUrl}
            onChange={(e: any) => {
              onClick(e);
              setOpen(false);
            }}
          />
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
