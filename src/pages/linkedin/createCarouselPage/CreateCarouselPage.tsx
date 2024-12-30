import { Button } from "@/components/ui/button";
import { RiAiGenerate } from "react-icons/ri";
import { LuWandSparkles } from "react-icons/lu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "./_components/ContentTab";
import SettingsTab from "./_components/SettingsTab";

import PreviewSection from "./_components/PreviewSection";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { useCarosel } from "./context/CreateCaroselContext";
import BottomSection from "./_components/BottomSection";
import DownloadTab from "./_components/DownloadTab";
import { useState } from "react";

export default function CreateCarouselPage() {
  const { topic, setTopic, activeTab, setActiveTab, tabs }: any = useCarosel();

  const [data, setData] = useState({
    createdBy: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portrait.jpg",
    },

    startSlide: {
      visible: true,
      title: "How to create a carousel post on LinkedIn",
      description: "Learn how to make engaging content.",
      image: "https://example.com/start-image.jpg",
    },

    slides: [
      {
        title: "1",
        description: "This is the first slide",
        image: "https://example.com/slide1.jpg",
      },
      {
        title: "2",
        description: "This is the second slide",
        image: "https://example.com/slide2.jpg",
      },
      {
        title: "3",
        description: "This is the third slide",
        image: "https://example.com/slide3.jpg",
      },
    ],

    endSlide: {
      visible: true,
      title: "Thank you for watching!",
      description: "Follow me for more content",
      image: "https://example.com/end-slide.jpg",
    },

    customizations: {
      backgroundColor: "#ffffff",
      fontColor: "#000000",
      title: { visible: true },
      description: { visible: true },
      content: {
        horizontal: "center", // left | center | right
        vertical: "center", // left | center | right
      },
      createdBy: {
        visible: true,
        horizontal: "center", // left | center | right
        vertical: "center", // left | center | right
      },
    },
  });

  return (
    <Wrapper>
      <WrapperContent className="items-center my-10">
        {/* Top bar */}
        <div className="bg-muted p-1 w-full relative  rounded-xl focus-within:max-w-xl max-w-lg transition-all duration-300">
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
        </div>

        <div className="bg-background relative py-14 px-10 w-full h-full max-w-6xl rounded-t-2xl">
          {/* Main Content Area */}

          <div className="space-y-8 container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full h-full">
              {/* Left Preview Area */}
              <PreviewSection />

              {/* Right Sidebar */}
              <div className="flex flex-col gap-4 h-full w-full">
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
                {activeTab === "Content" && <ContentTab />}

                {activeTab === "Settings" && <SettingsTab />}
                {activeTab === "Download" && <DownloadTab />}

                {activeTab !== "Content" && activeTab !== "Settings" && (
                  <div className="text-gray-500">
                    <p className="text-sm">No content for this tab yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Carousel Thumbnails */}
            <BottomSection />
          </div>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
