import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "./custom-datepicker.css";
import { Button } from "@/components/ui/button";
import { MdOutlineInfo } from "react-icons/md";

export default function DateTimeSelectorDialog({
  open,
  setOpen,
  onClick,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: any;
}) {
  const [scheduledAt, setScheduledAt] = useState<any>(new Date());

  let handleColor = (time: any) => {
    return time.getHours() > 12 ? "text-primary" : "text-red-600";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Schedule a post</DialogTitle>
        </DialogHeader>

        <div className="flex h-32 flex-col justify-start gap-2">
          <Label className="flex leading-tight" htmlFor="datetime">
            Schedule Date
          </Label>

          <DatePicker
            id="datetime"
            showTimeSelect
            selected={scheduledAt}
            onChange={(date) => setScheduledAt(date)}
            timeClassName={handleColor}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
            calendarClassName="rounded-lg shadow-lg border border-gray-300"
            dayClassName={(date) =>
              "w-10 h-10 flex items-center justify-center rounded-lg hover:bg-blue-100"
            }
            todayButton="Today"
            popperClassName="z-50"
          />
          {}
          <p className="absolute top-[132px] text-sm text-gray-500">
            Your post will be published at {scheduledAt.toLocaleString()}
          </p>
        </div>

        <DialogFooter>
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center gap-2">
              <MdOutlineInfo />
              <p className="text-sm text-gray-500">
                Schedule a post for a later date and time
              </p>
            </div>

            <Button
              onClick={() => {
                onClick(scheduledAt);
                setOpen(false);
              }}
              className="w-full"
            >
              Schedule
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
