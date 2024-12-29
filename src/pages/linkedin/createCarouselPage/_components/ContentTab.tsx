import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import UploadTool from "@/components/UploadTool";

import PositionStyle from "./PositionStyle";
import { useCarosel } from "../context/CreateCaroselContext";

export default function ContentTab() {
  const {
    titleEnabled,
    setTitleEnabled,
    titleText,
    setTitleText,
    backgroundImageUrl,
    subtitleEnabled,
    setSubtitleEnabled,
    subtitleText,
    setSubtitleText,
    setBackgroundImageUrl,
    titlePosition,
    setTitlePosition,
    subtitlePosition,
    setSubtitlePosition,
    previewIndex,
    slides,
    setSlides,
  }: any = useCarosel();
  return (
    <div className="space-y-6 bg-muted shadow-md p-4 border rounded-lg h-full">
      <h3 className="text-base font-semibold">Content Edit</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Title</span>
          {/* <PositionStyle
            position={titlePosition}
            setPosition={setTitlePosition}
          /> */}
          <Switch checked={titleEnabled} onCheckedChange={setTitleEnabled} />
        </div>

        <Input
          type="text"
          value={slides[previewIndex].title}
          onChange={(e) => {
            const newSlides = [...slides];
            newSlides[previewIndex] = {
              ...newSlides[previewIndex],
              title: e.target.value,
            };
            setSlides(newSlides);
          }}
          disabled={!titleEnabled}
          className="bg-background"
        />
      </div>

      {previewIndex > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Subtitle</span>
            {/* <PositionStyle
            position={subtitlePosition}
            setPosition={setSubtitlePosition}
          /> */}
            <Switch
              checked={subtitleEnabled}
              onCheckedChange={setSubtitleEnabled}
            />
          </div>

          <Input
            type="text"
            value={slides[previewIndex].subtitle}
            onChange={(e) => {
              const newSlides = [...slides];
              newSlides[previewIndex] = {
                ...newSlides[previewIndex],
                subtitle: e.target.value,
              };
              setSlides(newSlides);
            }}
            disabled={!subtitleEnabled}
            className="bg-background"
          />
        </div>
      )}
      {/* Background Image URL */}
      <UploadTool
        label="Background Image"
        value={backgroundImageUrl}
        onChange={setBackgroundImageUrl}
        placeholder="https://example.com/image.jpg"
      />
    </div>
  );
}
