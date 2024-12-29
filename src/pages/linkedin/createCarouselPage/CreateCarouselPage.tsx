import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { RiAiGenerate } from "react-icons/ri";
import { LuWandSparkles } from "react-icons/lu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "./_components/ContentTab";
import SettingsTab from "./_components/SettingsTab";

import {
  RiPencilLine,
  RiSettings4Line,
  RiPaletteLine,
  RiEyeLine,
  RiDownloadLine,
} from "react-icons/ri";
import PreviewSection from "./_components/PreviewSection";
import { motion } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";
import Wrapper from "@/components/wrapper/Wrapper";
import DownloadTab from "./_components/DownloadTab";

const tabs = [
  { name: "Content", icon: <RiPencilLine /> },
  { name: "Settings", icon: <RiSettings4Line /> },
  { name: "Theme", icon: <RiPaletteLine /> },
  { name: "Preview", icon: <RiEyeLine /> },
  { name: "Download", icon: <RiDownloadLine /> },
];

const positionOptions = ["left", "center", "right"];

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
  const [avatarUrl, setAvatarUrl] = useState(
    "https://thispersondoesnotexist.com"
  );

  const [avatarNameEnabled, setAvatarNameEnabled] = useState(true);
  const [avatarName, setAvatarName] = useState("Test User");

  const [avatarUserNameEnabled, setAvatarUserNameEnabled] = useState(true);
  const [avatarUserName, setAvatarUserName] = useState("test");

  useEffect(() => {
    setTitleText(slides[0].title);
    setSubtitleText(slides[0].subtitle);
  }, []);

  return (
    <Wrapper>
      {/* // <div className="h-full w-full "> */}
      <div className="flex flex-col items-center pt-10 space-y-10  bg-muted w-full">
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

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.5 }}
          className="bg-background relative py-14 px-10 w-full h-full max-w-6xl rounded-t-[5rem] "
        >
          {/* Main Content Area */}

          <div className="space-y-8 container">
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

                {activeTab === "Download" && (
                  <DownloadTab
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
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(100px,1fr))]  ">
              {slides?.map((slide, index) => (
                <div key={index} className="relative">
                  <div
                    style={{
                      backgroundImage: backgroundImageUrl
                        ? `url(${backgroundImageUrl})`
                        : `url(https://ipfs.near.social/ipfs/bafkreihasoknfohlxfcngttgfevlluyrgwoapozojske3cc6yabozoajoe)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => {
                      setTitleText(slide.title);
                      setSubtitleText(slide.subtitle);
                    }}
                    className=" aspect-[14/16]  transition-all opacity-80 hover:opacity-100 duration-200 px-1 rounded-md  shadow-md cursor-pointer"
                  >
                    <p className=" text-[9px] font-bold break-words text-wrap text-white mt-2 pt-7 pl-1 ">
                      {slide.title}
                    </p>
                  </div>
                  {index > 0 && (
                    <button
                      onClick={() => {
                        setSlides((prev) => {
                          return prev?.filter((_, i) => i !== index);
                        });
                      }}
                      className="text-red-500 absolute  bottom-1 p-1 rounded-full bg-background right-1"
                    >
                      <MdDeleteOutline className="text-sm" />
                    </button>
                  )}
                </div>
              ))}

              {/* Add new slide placeholder */}
              <button
                onClick={() =>
                  setSlides((prev) => {
                    return [
                      ...prev,
                      {
                        title: `Slide ${prev?.length} title`,
                        subtitle: `Slide ${prev?.length} subtitle`,
                      },
                    ];
                  })
                }
                className="  border-2 aspect-[14/16] h-full border-dashed  rounded-md my-2 mb-0.5  flex items-center justify-center cursor-pointer text-muted-foreground bg-primary/20"
              >
                +
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      {/* // </div> */}
    </Wrapper>
  );
}
