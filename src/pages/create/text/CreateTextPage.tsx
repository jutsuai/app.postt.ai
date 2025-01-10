import { Button } from "@/components/ui/button";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PreviewSection from "../../../components/preview";
import { Textarea } from "@/components/ui/textarea";
import CreateMenuDialog from "@/components/dialog/CreateMenuDialog";
import SelectProfileDialog from "@/components/dialog/SelectProfileDialog";
import { set } from "react-hook-form";
import httpClient from "@/lib/httpClient";
import { VscLoading } from "react-icons/vsc";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateTextPage() {
  const navigate = useNavigate();
  const { selectedProfile } = useAuth();
  // const [data, setData] = useState({
  const [commentary, setCommentary] = useState("This is a commentary");

  const [showSelectProfileDialog, setShowSelectProfileDialog] = useState(false);

  const [loading, setLoading] = useState(false);
  const handlePost = (linkedinId: string) => {
    setShowSelectProfileDialog(false);
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
        <WrapperContent className="grid h-full grid-cols-2 gap-8 py-8">
          <div className="flex h-full w-full flex-col gap-4">
            <div className="h-full space-y-6 rounded-lg border bg-muted p-4 shadow-md">
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
            </div>

            <div className="flex w-full gap-4">
              <Button variant="secondary" className="w-full text-foreground">
                Schedule Post
              </Button>
              <Button
                disabled={loading}
                className="w-full"
                onClick={() => setShowSelectProfileDialog(true)}
              >
                {loading ? <VscLoading className="animate-spin" /> : "Post Now"}
              </Button>
            </div>
          </div>

          {/* Right Sidebar */}

          <PreviewSection
            createdBy={selectedProfile}
            commentary={commentary}
            customizations={customizations}
          />
        </WrapperContent>
      </Wrapper>

      <SelectProfileDialog
        open={showSelectProfileDialog}
        setOpen={setShowSelectProfileDialog}
        onSubmit={handlePost}
      />
    </>
  );
}

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
