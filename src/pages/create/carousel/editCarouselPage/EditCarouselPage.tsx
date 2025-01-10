import ContentTab from "./_components/ContentTab";
import SettingsTab from "./_components/SettingsTab";
import PreviewSection from "./_components/PreviewSection";
import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import BottomSection from "./_components/BottomSection";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import httpClient from "@/lib/httpClient";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import SelectProfileDialog from "@/components/dialog/SelectProfileDialog";
import { RxText } from "react-icons/rx";
import { IoIosSettings } from "react-icons/io";
import { VscLoading } from "react-icons/vsc";
import { cn } from "@/lib/utils";

export default function EditCarouselPage() {
  const navigate = useNavigate();
  const { selectedProfile } = useAuth();
  // const [data, setData] = useState({
  const [commentary, setCommentary] = useState("This is a commentary");
  const [slides, setSlides] = useState([
    {
      pageType: "start",
      visible: true,
      title: "How to create a carousel post on LinkedIn",
      image: "https://i.ibb.co.com/1K7VDBQ/bg-light.webp",
    },
    {
      pageType: "slide",
      visible: true,
      title: "Slide 1",
      description: "This is the first slide",
      image: "https://i.ibb.co.com/1K7VDBQ/bg-light.webp",
    },
    {
      pageType: "slide",
      visible: true,
      title: "Slide 2",
      description: "This is the second slide",
      image: "https://i.ibb.co.com/1K7VDBQ/bg-light.webp",
    },
    {
      pageType: "slide",
      visible: true,
      title: "Slide 3",
      description: "This is the third slide",
      image: "https://i.ibb.co.com/1K7VDBQ/bg-light.webp",
    },
    {
      pageType: "end",
      visible: true,
      image: "https://i.ibb.co.com/1K7VDBQ/bg-light.webp",
    },
  ]);

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
    size: {
      height: 535,
      width: 415,
    },
  });

  //
  const [selectedSlide, setSelectedSlide] = useState(0);

  const [activeTab, setActiveTab] = useState("Content");
  const [tabs, setTabs] = useState([
    { name: "Content", icon: "📝" },
    { name: "Customization", icon: "⚙️" },
    { name: "Download", icon: "📥" },
  ]);

  const [showSelectProfileDialog, setShowSelectProfileDialog] = useState(false);

  const [loading, setLoading] = useState(false);
  const handleSaveCarouselPost = () => {
    const linkedinId = selectedProfile?.linkedinId;

    setShowSelectProfileDialog(false);
    setLoading(true);

    httpClient()
      .post(`/assets/carousels`, {
        commentary,
        slides,
        customizations,
      })
      .then((res) => {
        console.log("Post Success", res.data);
        toast.success("Post Successful");
        // navigate("/");
      })
      .catch((err) => {
        console.error("Post Error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePost = () => {
    const linkedinId = selectedProfile?.linkedinId;

    setShowSelectProfileDialog(false);
    setLoading(true);

    httpClient()
      .post(
        `/linkedin/profiles/${selectedProfile?.linkedinProfileId}/post/carousel`,
        {
          commentary,
          slides,
          customizations,
        },
      )
      .then((res) => {
        console.log("Post Success", res.data);
        toast.success("Post Successful");
        // navigate("/");
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
            {...slides[selectedSlide]}
            // className="col-span-4 items-center justify-center place-content-center pac"
            pageIndex={selectedSlide}
            createdBy={selectedProfile}
            commentary={commentary}
            slides={slides}
            setSlides={setSlides}
            customizations={customizations}
            selectedSlide={selectedSlide}
            setSelectedSlide={setSelectedSlide}
            setCommentary={setCommentary}
          />

          <div className="flex h-full w-full max-w-md flex-col gap-4 px-4">
            {/* <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full">
                {tabs?.map((tab: any) => (
                  <TabsTrigger
                    key={tab?.name}
                    value={tab?.name}
                    className="w-full gap-1 px-0 data-[state=active]:bg-primary-foreground"
                  >
                    {tab?.icon} {tab?.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs> */}

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
                slides={slides}
                setSlides={setSlides}
                selectedSlide={selectedSlide}
                //
                customizations={customizations}
                setCustomizations={setCustomizations}
              />
            )}

            {activeTab === "Customization" && (
              <SettingsTab
                commentary={commentary}
                setCommentary={setCommentary}
              />
            )}
            {/* {activeTab === "Download" && (
              <DownloadTab
                slides={slides}
                customizations={customizations}
                createdBy={createdBy}
              />
            )} */}

            <BottomSection
              customizations={customizations}
              slides={slides}
              setSlides={setSlides}
              selectedSlide={selectedSlide}
              setSelectedSlide={setSelectedSlide}
            />
            <div className="flex w-full gap-4">
              <Button variant="secondary" className="w-full text-foreground">
                Schedule Post
              </Button>
              <Button className="w-full" onClick={() => handlePost()}>
                {loading ? (
                  <VscLoading className="animate-spin" />
                ) : (
                  "Post Now!"
                )}
              </Button>
            </div>
          </div>

          {/* Right Sidebar */}

          {/* </div> */}

          {/* Bottom Carousel Thumbnails */}
          {/* </div>
        </div> */}
        </WrapperContent>
      </Wrapper>

      {/* <SelectProfileDialog
        open={showSelectProfileDialog}
        setOpen={setShowSelectProfileDialog}
        onSubmit={handlePost}
      /> */}
    </>
  );
}
