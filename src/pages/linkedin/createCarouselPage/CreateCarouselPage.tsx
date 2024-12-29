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

export default function CreateCarouselPage() {
  const { topic, setTopic, activeTab, setActiveTab, tabs }: any = useCarosel();

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
              Genarate Carosol
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
                {activeTab === "Settings" && <DownloadTab />}

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
