import { Button } from "@/components/ui/button";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import httpClient from "@/lib/httpClient";
import { VscLoading } from "react-icons/vsc";
import PreviewSection from "../../../components/preview";
import { toast } from "sonner";
import { LuCopy, LuImage } from "react-icons/lu";
import { IoIosSettings } from "react-icons/io";
import { RxText } from "react-icons/rx";
import { cn } from "@/lib/utils";
import { HiSparkles } from "react-icons/hi2";
import { Label } from "@/components/ui/label";
import { ImageUploadDialog } from "../carousel/_components/ContentTab";
import { GrFormEdit } from "react-icons/gr";
import DateTimeSelectorDialog from "@/dialog/dateTimeSelector/DateTimeSelectorDialog";
import { useNavigate, useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";

export default function CreateImagePage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data: post, isLoading: loading } = useQuery<any>({
    queryKey: ["posts", postId],
    queryFn: () =>
      httpClient()
        .get(`/posts/${postId}`)
        .then((res) => res.data.data),
  });
  console.log("Post", post);
  const { selectedProfile } = useAuth();

  const [refreshRefs, setRefreshRefs] = useState(0);
  const [showDateTimeSelectorDialog, setShowDateTimeSelectorDialog] =
    useState(false);

  const [activeTab, setActiveTab] = useState("Content");
  const [prompt, setPrompt] = useState("");
  const [commentary, setCommentary] = useState("");
  const [media, setMedia] = useState<any>(null);
  const debouncedCommentary = useDebouncedCallback(
    () => handleUpdatePost(),
    2000,
    { maxWait: 10000 },
  );

  useEffect(() => {
    if (post) {
      setCommentary(post.commentary);
      setPrompt(post.prompt);
      setMedia(post.media);
      setRefreshRefs(Math.random());
    }
  }, [post]);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const handleUpdatePost = () => {
    setLoadingUpdate(true);
    console.log("Update Post");
    httpClient()
      .put(`/posts/${postId}`, { commentary, prompt, media })
      .finally(() => {
        setLoadingUpdate(false);
      });
  };

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const handleSubmit = ({ scheduledAt }: { scheduledAt?: string }) => {
    // const name = generateRandomWord(10) + image?.name.split(".").pop();

    if (!media) {
      toast.error("Please upload an image");
      return;
    }

    if (commentary.length < 4) {
      toast.error("Commentary should be more than 5 characters");
      return;
    }

    const payload = {
      commentary,
      media,
      scheduledAt: scheduledAt || null,
      author: selectedProfile?.linkedinId,
      authorType: selectedProfile?.type,
    };

    setLoadingSubmit(true);
    httpClient()
      .post(`/posts/${postId}/publish`, payload)
      .then((res) => {
        console.log("Post Success", res);

        if (scheduledAt) {
          toast.info("Post scheduled successfully");
        } else {
          toast.success("Post successful");
        }

        navigate("/posts");
      })
      .catch((err) => {
        console.error("Post Error", err);
      })
      .finally(() => {
        setLoadingSubmit(true);
      });
  };

  return (
    <>
      <Wrapper>
        <WrapperContent className="h-full flex-row gap-8">
          <PreviewSection
            type="image"
            createdBy={selectedProfile}
            commentary={commentary}
            setCommentary={setCommentary}
            customizations={customizations}
            refreshRefs={refreshRefs}
            image={
              media?.url ||
              "https://placehold.co/512x512@2x/6b7280/ffffff?text=Add+Image"
            }
          />

          {loadingUpdate && (
            <VscLoading className="absolute left-10 top-10 size-8 animate-spin text-primary" />
          )}

          <div className="flex h-full w-full max-w-md flex-col gap-4 px-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {activeTab === "Content"
                  ? "Generate Carousel"
                  : activeTab === "Customization" && "Customization"}
              </h3>
              <div className="flex items-center rounded-3xl bg-muted p-1">
                <button
                  className={cn(
                    "flex w-12 items-center justify-center rounded-3xl p-2 px-4",
                    activeTab === "Content"
                      ? "border bg-background"
                      : "bg-muted",
                  )}
                  onClick={() => setActiveTab("Content")}
                >
                  <RxText className="text-sm" />
                </button>
                <button
                  className={cn(
                    "flex w-12 items-center justify-center rounded-3xl p-2 px-4",
                    activeTab === "Customization"
                      ? "border bg-background"
                      : "bg-muted",
                  )}
                  onClick={() => setActiveTab("Customization")}
                >
                  <IoIosSettings className="text-sm" />
                </button>
              </div>
            </div>

            {activeTab === "Content" && (
              <ContentTab
                commentary={commentary}
                setCommentary={(e: any) => {
                  setCommentary(e);
                  debouncedCommentary();
                }}
                setRefreshRefs={setRefreshRefs}
                prompt={prompt}
                setPrompt={(e: any) => {
                  setPrompt(e);
                  debouncedCommentary();
                }}
                media={media}
                setMedia={(e: any) => {
                  setMedia(e);
                  debouncedCommentary();
                }}
              />
            )}

            <div className="flex w-full gap-4">
              <Button
                variant="secondary"
                className="w-full text-foreground"
                onClick={() => {
                  if (!media) {
                    toast.error("Please upload or generate an image");
                    return;
                  }

                  if (commentary.length < 4) {
                    toast.error("Commentary should be more than 5 characters");
                    return;
                  }

                  setShowDateTimeSelectorDialog(true);
                }}
              >
                Schedule Post
              </Button>
              <Button className="w-full" onClick={() => handleSubmit({})}>
                {loadingSubmit ? (
                  <VscLoading className="animate-spin" />
                ) : (
                  "Post Now"
                )}
              </Button>
            </div>
          </div>
        </WrapperContent>
      </Wrapper>

      {showDateTimeSelectorDialog && (
        <DateTimeSelectorDialog
          open={showDateTimeSelectorDialog}
          setOpen={() => setShowDateTimeSelectorDialog(false)}
          onClick={(date: any) => handleSubmit({ scheduledAt: date })}
        />
      )}
    </>
  );
}

const ContentTab = ({
  commentary,
  setCommentary,
  setRefreshRefs,
  prompt,
  setPrompt,

  media,
  setMedia,
}: {
  commentary: string;
  setCommentary: any;
  setRefreshRefs: any;
  prompt: string;
  setPrompt: any;

  media: string;
  setMedia: any;
}) => {
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
      .post("/postt", payload)
      .then((res) => {
        console.log("Generate Carousel Success", res.data);

        setCommentary(res.data);
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
    <div className="flex h-full w-full flex-col gap-4">
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
              )}
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/*  */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="caption-field">Caption</Label>
        <div
          id="caption-field"
          className="flex w-full flex-col rounded-lg border bg-muted"
        >
          <Textarea
            rows={10}
            placeholder="Type your caption here...."
            className="resize-none rounded-lg border-0 bg-background shadow-none !ring-0"
            value={commentary}
            onChange={(e) => {
              setCommentary(e.target.value);
              setRefreshRefs(Math.random());
            }}
          />
        </div>
      </div>

      {/* <Label htmlFor="background-image-url">Image</Label> */}
      <div className="flex items-center justify-between gap-2 rounded-lg bg-muted p-2 pl-3">
        <div className="flex items-center gap-2">
          <LuImage />
          <p className="text-sm font-medium">
            {media ? "1 image added" : "Image"}
          </p>
        </div>
        <ImageUploadDialog onClick={(e: string) => setMedia(e)}>
          <Button variant="outline" className="rounded-full" size="sm">
            <GrFormEdit /> Edit
          </Button>
        </ImageUploadDialog>
      </div>
    </div>
  );
};

const customizations = {
  backgroundColor: "#ffffff",
  fontColor: "#000000",
  pageIndex: {
    visible: true,
  },
  title: {
    visible: true,
  },
  description: {
    visible: true,
  },
  content: {
    horizontal: "left", // left | center | right
    vertical: "center", // top | center | bottom
  },
  createdBy: {
    visible: true,
    horizontal: "left", // left | center | right
    vertical: "center", // top | center | bottom
  },

  size: {
    height: 535,
    width: 415,
  },
};
