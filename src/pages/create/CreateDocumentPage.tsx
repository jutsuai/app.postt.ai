import { Button } from "@/components/ui/button";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import SelectProfileDialog from "@/components/dialog/SelectProfileDialog";
import httpClient from "@/lib/httpClient";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import PreviewSection from "./carousel/editCarouselPage/_components/PreviewSection";
import { toast } from "sonner";
import generateRandomWord from "@/lib/randomWordGenerator";

export default function CreateDocumentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  // const [data, setData] = useState({
  const [commentary, setCommentary] = useState("This is a commentary");
  const [image, setImage] = useState<any>(null);

  const [showSelectProfileDialog, setShowSelectProfileDialog] = useState(false);

  const [loading, setLoading] = useState(false);
  const handlePost = (linkedinId: string) => {
    setShowSelectProfileDialog(false);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    const name = generateRandomWord(10) + image?.name.split(".").pop();
    formData.append("fileName", name);
    formData.append("commentary", commentary);

    httpClient()
      .post(`/linkedin/${linkedinId}/post/image`, formData)
      .then((res) => {
        console.log("Post Success", res);

        toast.success("Post Created Successfully");
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Upload Image</span>
                </div>

                <div className="flex items-center justify-between">
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      setImage(file);
                      // if (file) {
                      //   const reader = new FileReader();

                      //   reader.onload = () => {
                      //     setImage(reader.result as string);
                      //   };

                      //   reader.readAsDataURL(file);
                      // }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full gap-4 flex">
              <Button variant="secondary" className="w-full text-foreground">
                Schedule Post
              </Button>
              <Button
                className="w-full "
                onClick={() => setShowSelectProfileDialog(true)}
              >
                {loading ? <VscLoading className="animate-spin" /> : "Post Now"}
              </Button>
            </div>
          </div>

          {/* Right Sidebar */}

          <PreviewSection
            createdBy={user}
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
