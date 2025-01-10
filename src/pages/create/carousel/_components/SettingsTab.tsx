import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsTab({
  commentary,
  setCommentary,
}: {
  commentary: string;
  setCommentary: any;
}) {
  return (
    <div className="h-full w-full">
      {/* <h3 className="text-base font-semibold">Settings</h3> */}

      <div className="space-y-2">
        <Label>Commentary</Label>
        <Textarea
          // disabled={!customizations?.description?.visible}
          // value={slides[selectedSlide].description}
          // onChange={(e) => {
          //   const newSlides = [...slides];
          //   newSlides[selectedSlide] = {
          //     ...newSlides[selectedSlide],
          //     description: e.target.value,
          //   };
          //   setSlides(newSlides);
          // }}
          value={commentary}
          onChange={(e) => setCommentary(e.target.value)}
          rows={6}
          className="resize-none rounded-lg bg-background"
        />
      </div>
    </div>
  );
}
