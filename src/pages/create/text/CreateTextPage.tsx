import { Button } from "@/components/ui/button";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PreviewSection from "../../../components/preview";
import { Textarea } from "@/components/ui/textarea";
import httpClient from "@/lib/httpClient";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";
import { IoIosSettings } from "react-icons/io";
import { RxText } from "react-icons/rx";
import { cn } from "@/lib/utils";
import { LuCopy } from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useDebouncedCallback } from "use-debounce";
import DateTimeSelectorDialog from "@/dialog/dateTimeSelector/DateTimeSelectorDialog";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function CreateTextPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data: post, isLoading: loading } = useQuery<any>({
    queryKey: ["posts", postId],
    queryFn: () =>
      httpClient()
        .get(`/posts/${postId}`)
        .then((res) => res.data.data),
  });
  const { selectedProfile } = useAuth();

  const [refreshRefs, setRefreshRefs] = useState(0);
  const [showDateTimeSelectorDialog, setShowDateTimeSelectorDialog] =
    useState(false);

  const [activeTab, setActiveTab] = useState("Content");
  const [prompt, setPrompt] = useState("");
  const [commentary, setCommentary] = useState("");
  const debouncedCommentary = useDebouncedCallback(
    () => handleUpdatePost(),
    2000,
    { maxWait: 10000 },
  );

  useEffect(() => {
    if (post) {
      setCommentary(post.commentary);
      setPrompt(post.prompt);
      setRefreshRefs(Math.random());
    }
  }, [post]);

  const handleUpdatePost = () => {
    console.log("Update Post");
    httpClient().put(`/posts/${postId}`, { commentary, prompt });
  };

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const handleSubmit = ({ scheduledAt }: { scheduledAt?: Date }) => {
    if (commentary.length < 4) {
      toast.error("Commentary should be more than 5 characters");
      return;
    }
    const payload = {
      commentary,
      scheduledAt,

      author: selectedProfile?.linkedinId,
      authorType: selectedProfile?.type,
    };

    setLoadingSubmit(true);
    httpClient()
      .post(`/posts/${postId}/publish`, payload)
      .then((res) => {
        console.log("Post Success", res.data);

        if (!scheduledAt) {
          toast.success("Post Successful");
        } else {
          toast.success("Post Scheduled");
        }

        navigate("/");
      })
      .catch((err) => {
        console.error("Post Error", err);
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  return (
    <>
      <Wrapper>
        <WrapperContent className="h-full flex-row gap-8">
          <PreviewSection
            createdBy={selectedProfile}
            commentary={commentary}
            setCommentary={setCommentary}
            customizations={customizations}
            refreshRefs={refreshRefs}
          />

          {/* Right Sidebar */}

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
                  disabled
                >
                  <IoIosSettings className="text-sm" />
                </button>
              </div>
            </div>

            {activeTab === "Content" && (
              <ContentTab
                commentary={commentary}
                setCommentary={(e) => {
                  setCommentary(e);
                  debouncedCommentary();
                }}
                setRefreshRefs={setRefreshRefs}
                prompt={prompt}
                setPrompt={(e) => {
                  setPrompt(e);
                  debouncedCommentary();
                }}
              />
            )}

            <div className="flex w-full gap-4">
              <Button
                variant="secondary"
                className="w-full text-foreground"
                onClick={() => setShowDateTimeSelectorDialog(true)}
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
}: {
  commentary: string;
  setCommentary: (value: string) => void;
  setRefreshRefs: any;
  prompt: string;
  setPrompt: (value: string) => void;
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
              className="min-w-28 rounded-full bg-muted-foreground/15 text-foreground hover:bg-muted-foreground/10"
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
            rows={15}
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
