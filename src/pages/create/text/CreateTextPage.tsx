import { Button } from "@/components/ui/button";
import { RiAiGenerate } from "react-icons/ri";
import { LuWandSparkles } from "react-icons/lu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ContentTab from "../carousel/editCarouselPage/_components/ContentTab";
import SettingsTab from "../carousel/editCarouselPage/_components/SettingsTab";
import DownloadTab from "../carousel/editCarouselPage/_components/DownloadTab";
import BottomSection from "../carousel/editCarouselPage/_components/BottomSection";
import PreviewSection from "../carousel/editCarouselPage/_components/PreviewSection";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function CreateTextPage() {
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

  //
  const [selectedSlide, setSelectedSlide] = useState(0);

  return (
    <Wrapper>
      <WrapperContent className="py-8 grid gap-8 grid-cols-2 h-full">
        {/* <div className=" relative w-full bg-orange-200 h-full  rounded-t-2xl"> */}
        {/* Main Content Area */}

        {/* <div className="flex flex-1  bg-indigo-600"> */}
        {/* <div className="flex flex-1 bg-red-200"> */}
        {/*  */}

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
            <Button className="w-full ">Post Now</Button>
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
  );
}
