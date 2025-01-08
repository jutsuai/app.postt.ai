import { Textarea } from "@/components/ui/textarea";

export default function SettingsTab({
  commentary,
  setCommentary,
}: {
  commentary: string;
  setCommentary: any;
}) {
  return (
    <div className="space-y-6 bg-muted border shadow-md p-4 rounded-lg h-full">
      <h3 className="text-base font-semibold">Settings</h3>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Commentary</span>
        </div>
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
          rows={4}
          className="bg-background"
        />
      </div>
    </div>
  );
}
