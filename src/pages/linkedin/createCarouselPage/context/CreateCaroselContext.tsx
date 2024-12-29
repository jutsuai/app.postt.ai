import { createContext, useContext, useEffect, useState } from "react";
import {
  RiPencilLine,
  RiSettings4Line,
  RiPaletteLine,
  RiEyeLine,
  RiDownloadLine,
} from "react-icons/ri";

const CreateCaroselContext = createContext(undefined);

const tabs = [
  { name: "Content", icon: <RiPencilLine /> },
  { name: "Settings", icon: <RiSettings4Line /> },
  { name: "Theme", icon: <RiPaletteLine /> },
  { name: "Preview", icon: <RiEyeLine /> },
  { name: "Download", icon: <RiDownloadLine /> },
];

const positionOptions = ["left", "center", "right"];

export function CreateCaroselProvider({ children }: { children: any }) {
  const [topic, setTopic] = useState("");
  const [activeTab, setActiveTab] = useState("Content");

  const [slides, setSlides] = useState([
    {
      title: "Your catchy title heree",
      subtitle:
        "Unlock the Power of Buffer Without Overwhelm dfsgf dsfgfjhj sdfgfhjdsgfhj k sdgfhjkl",
    },
  ]);

  const [previewIndex, setPreviewIndex] = useState(0);

  // Content Tab State
  const [titleEnabled, setTitleEnabled] = useState(true);
  // const [titleText, setTitleText] = useState("");
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

  const value: any = {
    topic,
    setTopic,
    activeTab,
    setActiveTab,
    slides,
    setSlides,
    titleEnabled,
    setTitleEnabled,
    // titleText,
    // setTitleText,
    titlePosition,
    setTitlePosition,
    subtitleEnabled,
    setSubtitleEnabled,
    subtitleText,
    setSubtitleText,
    subtitlePosition,
    setSubtitlePosition,
    backgroundImageUrl,
    setBackgroundImageUrl,
    avatarPosition,
    setAvatarPosition,
    avatarEnabled,
    setAvatarEnabled,
    avatarUrl,
    setAvatarUrl,
    avatarNameEnabled,
    setAvatarNameEnabled,
    avatarName,
    setAvatarName,
    avatarUserNameEnabled,
    setAvatarUserNameEnabled,
    avatarUserName,
    setAvatarUserName,
    positionOptions,
    tabs,
    previewIndex,
    setPreviewIndex,
  };
  return (
    <CreateCaroselContext.Provider value={value}>
      {children}
    </CreateCaroselContext.Provider>
  );
}

export const useCarosel = () => {
  const context = useContext(CreateCaroselContext);
  if (context === undefined) {
    throw new Error("useCarosel must be used within a CreateCaroselProvider");
  }
  return context;
};
