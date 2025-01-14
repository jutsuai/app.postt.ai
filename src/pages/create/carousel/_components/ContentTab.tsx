import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import httpClient from "@/lib/httpClient";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import { LuCopy } from "react-icons/lu";
import {
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdVerticalAlignBottom,
  MdVerticalAlignCenter,
  MdVerticalAlignTop,
} from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";
import AdjustDesign from "./AdjustDesign";

export default function ContentTab({
  slides,
  setSlides,
  selectedSlide,

  //
  customizations,
  setCustomizations,

  //
  prompt,
  setPrompt,
  commentary,
  setCommentary,
  setRefreshRefs,
}: {
  slides: any;
  setSlides: any;
  selectedSlide: any;

  //
  customizations: any;
  setCustomizations: any;

  //
  prompt: any;
  setPrompt: any;
  commentary: any;
  setCommentary: any;
  setRefreshRefs: any;
}) {
  console.log("slides", slides);
  console.log("selectedSlide", selectedSlide);
  const [loading, setLoading] = useState(false);
  const handleGenerate = () => {
    if (prompt?.length <= 3) {
      toast.error("Prompt should be more than 3 characters");
      return;
    }

    setLoading(true);
    console.log("Generate Carousel");

    const payload = {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4o",
    };
    httpClient(import.meta.env.VITE_COPILOT_URL)
      .post("/postt/carousel", payload)
      .then((res) => {
        console.log("Generate Carousel Success", res.data);

        let output: any = {};
        try {
          output = JSON.parse(res.data);
        } catch (error) {
          console.error("Error parsing JSON", error);
        }

        console.log("Output", output);

        setCommentary(output?.commentary);

        // Update the slides with  title and description from the output, also if the output is larger than the current slides, add more slides with last image, if the output is smaller than the current slides, remove the extra slides
        const newSlides = [...slides];
        output?.slides?.forEach((slide: any, index: number) => {
          newSlides[index] = {
            ...newSlides[index],
            title: slide?.title,
            description: slide?.description,
          };
        });

        if (output?.slides.length < slides.length) {
          for (let i = output?.slides.length; i < slides.length; i++) {
            newSlides[i] = {
              ...newSlides[i],
              title: slides[i]?.title,
              description: slides[i]?.description,
            };
          }
        }

        setSlides(newSlides);

        setRefreshRefs(Math.random());
      })
      .catch((err) => {
        console.error("Generate Carousel Error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
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
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
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
              onClick={handleGenerate}
            >
              {loading ? (
                <VscLoading className="animate-spin" />
              ) : (
                <>
                  <HiSparkles /> Generate
                </>
              )}{" "}
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

      <AdjustDesign
        customizations={customizations}
        setCustomizations={setCustomizations}
      />

      {/* Background Image URL */}
      <ImageUploader
        slides={slides}
        setSlides={setSlides}
        selectedSlide={selectedSlide}
      />
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
