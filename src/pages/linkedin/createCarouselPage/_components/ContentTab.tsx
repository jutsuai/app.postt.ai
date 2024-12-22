import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import UploadTool from "@/components/UploadTool";
import { cn } from "@/lib/utils";
import PositionStyle from "./PositionStyle";

export default function ContentTab({
  titleEnabled,
  setTitleEnabled,
  titleText,
  setTitleText,
  subtitleEnabled,
  setSubtitleEnabled,
  subtitleText,
  setSubtitleText,
  backgroundImageUrl,
  setBackgroundImageUrl,
  titlePosition,
  setTitlePosition,
  subtitlePosition,
  setSubtitlePosition,
  positionOptions,
}: {
  titleEnabled: boolean;
  setTitleEnabled: (value: boolean) => void;
  titleText: string;
  setTitleText: (value: string) => void;
  subtitleEnabled: boolean;
  setSubtitleEnabled: (value: boolean) => void;
  subtitleText: string;
  setSubtitleText: (value: string) => void;
  backgroundImageUrl?: string;
  setBackgroundImageUrl?: (value: string) => void;
  titlePosition: string;
  setTitlePosition: (value: string) => void;
  subtitlePosition: string;
  setSubtitlePosition: (value: string) => void;
  positionOptions: string[];
}) {
  return (
    <div className="space-y-6 bg-muted shadow-md p-4 border rounded-lg h-full">
      <h3 className="text-base font-semibold">Content Edit</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Title</span>
          <PositionStyle
            positionOptions={positionOptions}
            position={titlePosition}
            setPosition={setTitlePosition}
          />
          <Switch checked={titleEnabled} onCheckedChange={setTitleEnabled} />
        </div>

        <Input
          type="text"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
          disabled={!titleEnabled}
          className="bg-background"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Subtitle</span>
          <PositionStyle
            positionOptions={positionOptions}
            position={subtitlePosition}
            setPosition={setSubtitlePosition}
          />
          <Switch
            checked={subtitleEnabled}
            onCheckedChange={setSubtitleEnabled}
          />
        </div>

        <Input
          type="text"
          value={subtitleText}
          onChange={(e) => setSubtitleText(e.target.value)}
          disabled={!subtitleEnabled}
          className="bg-background"
        />
      </div>
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
