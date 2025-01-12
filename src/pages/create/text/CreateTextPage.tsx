import { Button } from "@/components/ui/button";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PreviewSection from "../../../components/preview";
import { Textarea } from "@/components/ui/textarea";
import httpClient from "@/lib/httpClient";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { RxText } from "react-icons/rx";
import { cn } from "@/lib/utils";
import { LuCopy } from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function CreateTextPage() {
  const navigate = useNavigate();
  const { selectedProfile } = useAuth();
  const [showDateTimeSelectorDialog, setShowDateTimeSelectorDialog] =
    useState(false);

  const [commentary, setCommentary] = useState("This is a commentary");
  const [activeTab, setActiveTab] = useState("Content");

  const [loading, setLoading] = useState(false);
  const handleSubmit = ({ linkedinId }: { linkedinId?: string }) => {
    setLoading(true);

    httpClient()
      .post(`/linkedin/${linkedinId}/post/text`, { commentary })
      .then((res) => {
        console.log("Post Success", res);

        toast.success("Post Successful");

        navigate("/");
      })
      .catch((err) => {
        console.error("Post Error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Wrapper>
        <WrapperContent className="h-full flex-row gap-8">
          <PreviewSection
            createdBy={selectedProfile}
            commentary={commentary}
            customizations={customizations}
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
                setCommentary={setCommentary}
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
                {loading ? <VscLoading className="animate-spin" /> : "Post Now"}
              </Button>
            </div>

            {/* <div className="h-full space-y-6 rounded-lg border bg-muted p-4 shadow-md">
              <h3 className="text-base font-semibold">Content Edit</h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Description</span>
                </div>

                <Textarea
                  value={commentary}
                  onChange={(e) => setCommentary(e.target.value)}
                  rows={16}
                  className="bg-background"
                />
              </div>
            </div> */}
          </div>
        </WrapperContent>
      </Wrapper>
    </>
  );
}

const ContentTab = ({
  commentary,
  setCommentary,
}: {
  commentary: string;
  setCommentary: (value: string) => void;
}) => {
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

      <Separator className="my-4" />

      {/*  */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="caption-field">Caption</Label>
        <div
          id="caption-field"
          className="flex w-full flex-col rounded-lg border bg-muted"
        >
          <Textarea
            rows={5}
            placeholder="Type your caption here...."
            className="resize-none rounded-lg border-0 bg-background shadow-none !ring-0"
            value={commentary}
            onChange={(e) => setCommentary(e.target.value)}
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
