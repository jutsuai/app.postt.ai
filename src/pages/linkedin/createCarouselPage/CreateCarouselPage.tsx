import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { RiAiGenerate } from "react-icons/ri";
import { LuWandSparkles } from "react-icons/lu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "./_components/ContentTab";
import SettingsTab from "./_components/SettingsTab";
import Image from "@/components/Image";
import {
  RiPencilLine,
  RiSettings4Line,
  RiPaletteLine,
  RiEyeLine,
  RiDownloadLine,
} from "react-icons/ri";
import PreviewSection from "./_components/PreviewSection";

const tabs = [
  { name: "Content", icon: <RiPencilLine /> },
  { name: "Settings", icon: <RiSettings4Line /> },
  { name: "Theme", icon: <RiPaletteLine /> },
  { name: "Preview", icon: <RiEyeLine /> },
  { name: "Download", icon: <RiDownloadLine /> },
];

const positionOptions = ["left", "right", "center", "top", "bottom"];

const slidesData = [
  {
    title: "Mastering Buffer",
    subtitle:
      "Unlock the Power of Buffer Without Overwhelm dfsgf dsfgfjhj sdfgfhjdsgfhj k sdgfhjkl",
  },
];

export default function CreateCarouselPage() {
  const [topic, setTopic] = useState("");
  const [activeTab, setActiveTab] = useState("Content");

  const [slides, setSlides] = useState(slidesData);

  // Content Tab State
  const [titleEnabled, setTitleEnabled] = useState(true);
  const [titleText, setTitleText] = useState("");
  const [titlePosition, setTitlePosition] = useState("left");

  const [subtitleEnabled, setSubtitleEnabled] = useState(true);
  const [subtitleText, setSubtitleText] = useState("");
  const [subtitlePosition, setSubtitlePosition] = useState("left");

  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  // Settings Tab State
  const [avatarPosition, setAvatarPosition] = useState("left");

  const [avatarEnabled, setAvatarEnabled] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("https://via.placeholder.com/40");

  const [avatarNameEnabled, setAvatarNameEnabled] = useState(true);
  const [avatarName, setAvatarName] = useState("Test User");

  const [avatarUserNameEnabled, setAvatarUserNameEnabled] = useState(true);
  const [avatarUserName, setAvatarUserName] = useState("test");

  useEffect(() => {
    setTitleText(slides[0].title);
    setSubtitleText(slides[0].subtitle);
  }, []);

  return (
    // <div className="h-full w-full ">
    <div className=" container max-w-5xl flex flex-col items-center py-8 space-y-8">
      {/* Top bar */}
      <div className="bg-muted p-1 w-full relative  rounded-xl focus-within:max-w-xl max-w-lg transition-all duration-300">
        <div className="flex items-center justify-between border-primary transition-colors border-2  duration-200 bg-background rounded-lg">
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
          <Button className="text-foreground mr-2">
            <LuWandSparkles />
            Genarate Carosol
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full h-full">
        {/* Left Preview Area */}
        <PreviewSection
          backgroundImageUrl={backgroundImageUrl}
          titleText={titleText}
          titlePosition={titlePosition}
          titleEnabled={titleEnabled}
          subtitleText={subtitleText}
          subtitlePosition={subtitlePosition}
          subtitleEnabled={subtitleEnabled}
          avatarUrl={avatarUrl}
          avatarName={avatarName}
          avatarEnabled={avatarEnabled}
          avatarNameEnabled={avatarNameEnabled}
          avatarUserName={avatarUserName}
          avatarUserNameEnabled={avatarUserNameEnabled}
        />

        {/* Right Sidebar */}
        <div className="flex flex-col gap-4 h-full w-full">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full">
              {tabs?.map((tab) => (
                <TabsTrigger
                  key={tab?.name}
                  value={tab?.name}
                  className="data-[state=active]:bg-primary gap-1 px-0 w-full"
                >
                  {tab?.icon} {tab?.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Content for Active Tab */}
          {activeTab === "Content" && (
            <ContentTab
              titleEnabled={titleEnabled}
              setTitleEnabled={setTitleEnabled}
              titleText={titleText}
              setTitleText={setTitleText}
              subtitleEnabled={subtitleEnabled}
              setSubtitleEnabled={setSubtitleEnabled}
              subtitleText={subtitleText}
              setSubtitleText={setSubtitleText}
              backgroundImageUrl={backgroundImageUrl}
              setBackgroundImageUrl={setBackgroundImageUrl}
              titlePosition={titlePosition}
              setTitlePosition={setTitlePosition}
              subtitlePosition={subtitlePosition}
              setSubtitlePosition={setSubtitlePosition}
              positionOptions={positionOptions}
            />
          )}

          {activeTab === "Settings" && (
            <SettingsTab
              avatarUrl={avatarUrl}
              setAvatarUrl={setAvatarUrl}
              avatarName={avatarName}
              setAvatarName={setAvatarName}
              avatarUserName={avatarUserName}
              setAvatarUserName={setAvatarUserName}
              avatarEnabled={avatarEnabled}
              setAvatarEnabled={setAvatarEnabled}
              avatarNameEnabled={avatarNameEnabled}
              setAvatarNameEnabled={setAvatarNameEnabled}
              avatarUserNameEnabled={avatarUserNameEnabled}
              setAvatarUserNameEnabled={setAvatarUserNameEnabled}
              avatarPosition={avatarPosition}
              setAvatarPosition={setAvatarPosition}
              positionOptions={positionOptions}
            />
          )}

          {activeTab !== "Content" && activeTab !== "Settings" && (
            <div className="text-gray-500">
              <p className="text-sm">No content for this tab yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Carousel Thumbnails */}
      <div className="flex space-x-2 mr-auto py-2">
        {slides?.map((slide, index) => (
          <div
            key={index}
            style={{
              backgroundImage: backgroundImageUrl
                ? `url(${backgroundImageUrl})`
                : `url(https://i.pinimg.com/736x/65/21/c4/6521c4eecdbe234ed8d11202086f9f27.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              setTitleText(slide.title);
              setSubtitleText(slide.subtitle);
            }}
            className="min-w-[100px] aspect-[14/16] transition-all opacity-80 hover:opacity-100 duration-200 px-1 rounded-md  shadow-md cursor-pointer"
          >
            <div className=" text-xs font-bold break-words text-wrap text-white mt-2 ">
              {slide.title}
            </div>
          </div>
        ))}

        {/* Add new slide placeholder */}
        <button
          onClick={() =>
            setSlides((prev) => {
              return [
                ...prev,
                {
                  title: `Slide ${slides?.length} title`,
                  subtitle: `Slide ${slides?.length} subtitle`,
                },
              ];
            })
          }
          className="min-w-[100px] border-2 border-dashed  rounded-md p-2 flex-shrink-0 flex items-center justify-center cursor-pointer text-muted-foreground bg-primary/20"
        >
          +
        </button>
      </div>
    </div>
    // </div>
  );
}
