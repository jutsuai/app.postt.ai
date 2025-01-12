import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineInfo } from "react-icons/md";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import moment from "moment";

export default function DateTimeSelectorDialog({
  open,
  setOpen,
  onClick,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: any;
}) {
  const [time, setTime] = useState<string>("05:00");
  const [date, setDate] = useState<any>(new Date());

  // let handleColor = (time: any) => {
  //   return time.getHours() > 12 ? "text-primary" : "text-red-600";
  // };
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const changeDateProgrammatically = () => {
    const newDate = new Date(); // January 15, 2025
    setDate(newDate);
    setCurrentMonth(newDate); // Update the preview to the selected date
  };

  console.log(date, "date =>>.");
  console.log(Date(), "time =>>.");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Schedule a post</DialogTitle>
        </DialogHeader>

        <div className="flex h-32 flex-col justify-start gap-2">
          <Label className="flex leading-tight" htmlFor="datetime">
            Schedule Date
          </Label>

          <Popover>
            <PopoverTrigger>
              <Button
                variant="outline"
                className="w-full hover:bg-muted hover:text-foreground"
              >
                {date ? (
                  moment(date).format("MMMM DD, YYYY, HH:mm")
                ) : (
                  <span className="text-muted-foreground">Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-full rounded-lg p-2">
              <div className="flex flex-col gap-2">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={date}
                  onSelect={(selectedDate) => {
                    // console.log(selectedDate, "time =>>.");
                    const [hours, minutes] = time?.split(":")!;
                    selectedDate?.setHours(parseInt(hours), parseInt(minutes));
                    setDate(selectedDate!);
                  }}
                  fromYear={new Date().getFullYear()}
                  toYear={new Date().getFullYear() + 50}
                  disabled={(date) =>
                    Number(date) < Date.now() - 1000 * 60 * 60 * 24
                  }
                  footer={
                    <Button
                      onClick={() => changeDateProgrammatically()}
                      // disabled={date.get !== Date()}
                      variant="secondary"
                      className="w-full text-foreground hover:text-foreground"
                    >
                      Today
                    </Button>
                  }
                  month={currentMonth} // Controls the displayed month
                  onMonthChange={setCurrentMonth} // Keeps track of the displayed month
                />
              </div>
              <Select
                defaultValue={time!}
                onValueChange={(e) => {
                  setTime(e);
                  if (date) {
                    const [hours, minutes] = e.split(":");
                    const newDate = new Date(date.getTime());
                    newDate.setHours(parseInt(hours), parseInt(minutes));
                    setDate(newDate);
                  }
                }}
                open={true}
              >
                <SelectTrigger className="my-4 mr-2 w-[120px] font-normal focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="fixed left-0 top-2 mr-2 border-none shadow-none">
                  <ScrollArea className="h-[15rem]">
                    {Array.from({ length: 96 }).map((_, i) => {
                      const hour = Math.floor(i / 4)
                        .toString()
                        .padStart(2, "0");
                      const minute = ((i % 4) * 15).toString().padStart(2, "0");
                      return (
                        <SelectItem key={i} value={`${hour}:${minute}`}>
                          {hour}:{minute}
                        </SelectItem>
                      );
                    })}
                  </ScrollArea>
                </SelectContent>
              </Select>
              {/* </div> */}
            </PopoverContent>
          </Popover>
          <p className="absolute top-[132px] text-sm text-gray-500">
            Your post will be published at {date.toLocaleString()}
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
                onClick(date);
                setOpen(false);
              }}
              className="h-10 w-full rounded-full"
            >
              Schedule
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
