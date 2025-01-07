import { Button } from "@/components/ui/button";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PreviewSection from "../carousel/editCarouselPage/_components/PreviewSection";
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
  const { user } = useAuth();
  // const [data, setData] = useState({
  const [commentary, setCommentary] = useState("This is a commentary");

  const [createdBy, setCreatedBy] = useState({
    name: `${user?.firstName} ${user?.lastName}`,
    username: user?.username || user?.email,
    avatar:
      user?.avatar || "https://avatars.githubusercontent.com/u/8743993?v=4",
  });

  const [customizations, setCustomizations] = useState({
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

    // aspectRatio: "4/5",
    height: 535,
    width: 415,
  });

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
        <WrapperContent className="py-8 grid gap-8 grid-cols-2 h-full">
          <div className="flex flex-col  gap-4 h-full w-full">
            <div className="space-y-6 bg-muted shadow-md p-4 border rounded-lg h-full">
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

            <div className="w-full gap-4 flex">
              <Button variant="secondary" className="w-full text-foreground">
                Schedule Post
              </Button>
              <Button
                disabled={loading}
                className="w-full "
                onClick={() => setShowSelectProfileDialog(true)}
              >
                {loading ? <VscLoading className="animate-spin" /> : "Post Now"}
              </Button>
            </div>
          </div>

          {/* Right Sidebar */}

          <PreviewSection
            // {...slides[selectedSlide]}
            // className="col-span-4 items-center justify-center place-content-center pac"
            // pageIndex={selectedSlide}
            createdBy={createdBy}
            commentary={commentary}
            // slides={slides}
            customizations={customizations}
            // selectedSlide={selectedSlide}
            // setSelectedSlide={setSelectedSlide}
          />
          {/* </div> */}

          {/* Bottom Carousel Thumbnails */}
          {/* </div>
        </div> */}
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
