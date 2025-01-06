import { Button } from "@/components/ui/button";
import { RiAiGenerate } from "react-icons/ri";
import { LuWandSparkles } from "react-icons/lu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "./_components/ContentTab";
import SettingsTab from "./_components/SettingsTab";

import PreviewSection from "./_components/PreviewSection";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import BottomSection from "./_components/BottomSection";
import DownloadTab from "./_components/DownloadTab";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function EditCarouselPage() {
  const { user } = useAuth();
  // const [data, setData] = useState({
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
    height: 660,
    width: 512,
  });

  //
  const [selectedSlide, setSelectedSlide] = useState(0);

  const [activeTab, setActiveTab] = useState("Content");
  const [tabs, setTabs] = useState([
    { name: "Content", icon: "📝" },
    { name: "Settings", icon: "⚙️" },
    { name: "Download", icon: "📥" },
  ]);

  const [topic, setTopic] = useState(
    "How to create a carousel post on LinkedIn"
  );

  return (
    <Wrapper>
      <WrapperContent className="py-8">
        {/* Top bar */}
        {/* <div className="bg-muted p-1 w-full relative  rounded-xl focus-within:max-w-xl max-w-lg transition-all duration-300">
          <div className="flex items-center justify-between border-primary-foreground transition-colors border-2  duration-200 bg-background rounded-lg">
            <div className="px-3 ">
              <RiAiGenerate />
            </div>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic for your carousel..."
              className="outline-none border-none w-full py-3 pr-3"
            />

            <Button className=" mr-2 h-9 text-sm">
              <LuWandSparkles />
              Generate Carousel
            </Button>
          </div>
        </div> */}

        <div className="bg-background relative w-full h-full  rounded-t-2xl">
          {/* Main Content Area */}

          <div className="space-y-8 container">
            <div className="grid grid-cols-9 gap-6 w-full h-full">
              {/* Left Preview Area */}
              <div className="flex flex-col col-span-5 gap-4 h-full w-full">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="w-full">
                    {tabs?.map((tab: any) => (
                      <TabsTrigger
                        key={tab?.name}
                        value={tab?.name}
                        className="data-[state=active]:bg-primary-foreground gap-1 px-0 w-full"
                      >
                        {tab?.icon} {tab?.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>

                {/* Content for Active Tab */}
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

                {activeTab === "Settings" && (
                  <SettingsTab
                    createdBy={createdBy}
                    setCreatedBy={setCreatedBy}
                  />
                )}
                {activeTab === "Download" && (
                  <DownloadTab
                    slides={slides}
                    customizations={customizations}
                    createdBy={createdBy}
                  />
                )}

                {activeTab !== "Content" && activeTab !== "Settings" && (
                  <div className="text-gray-500">
                    <p className="text-sm">No content for this tab yet.</p>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}

              <PreviewSection
                {...slides[selectedSlide]}
                className="col-span-4"
                pageIndex={selectedSlide}
                createdBy={createdBy}
                customizations={customizations}
              />
            </div>

            {/* Bottom Carousel Thumbnails */}
            <BottomSection
              customizations={customizations}
              slides={slides}
              setSlides={setSlides}
              selectedSlide={selectedSlide}
              setSelectedSlide={setSelectedSlide}
            />
          </div>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
