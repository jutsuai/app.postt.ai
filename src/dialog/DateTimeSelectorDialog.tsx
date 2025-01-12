import { useEffect, useState } from "react";
import moment from "moment";
import { MdOutlineInfo } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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

interface DateTimeSelectorDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (date: Date) => void;
}

const getNextRoundedDateTime = () => {
  // get the current date and time but time should be next rounded 15 minutes and seconds should be 0

  const currentDate = new Date();
  const currentMinutes = currentDate.getMinutes();
  const nextRoundedMinutes = Math.ceil(currentMinutes / 15) * 15;
  const nextRoundedDate = new Date(currentDate);
  nextRoundedDate.setMinutes(nextRoundedMinutes, 0, 0);

  return nextRoundedDate;
};

export default function DateTimeSelectorDialog({
  open,
  setOpen,
  onClick,
}: DateTimeSelectorDialogProps) {
  const [time, setTime] = useState<string>(
    moment(getNextRoundedDateTime()).format("HH:mm"),
  );
  const [date, setDate] = useState<Date>(getNextRoundedDateTime());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const [hours, minutes] = time.split(":").map(Number);
      selectedDate.setHours(hours, minutes);
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    const [hours, minutes] = newTime.split(":").map(Number);
    const updatedDate = new Date(date);
    updatedDate.setHours(hours, minutes);
    setDate(updatedDate);
  };

  const resetToToday = () => {
    const today = new Date();
    setDate(today);
    setCurrentMonth(today);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Schedule a post</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label htmlFor="datetime" className="leading-tight">
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
                  onSelect={handleDateChange}
                  fromYear={new Date().getFullYear()}
                  toYear={new Date().getFullYear() + 50}
                  // disabled={(d) => d < new Date().setHours(0, 0, 0, 0)}
                  footer={
                    <Button
                      onClick={resetToToday}
                      variant="secondary"
                      className="w-full text-primary"
                    >
                      Today
                    </Button>
                  }
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                />
              </div>

              <Select
                defaultValue={time}
                onValueChange={handleTimeChange}
                open={true}
              >
                <SelectTrigger className="my-4 mr-2 w-[120px] font-normal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="fixed left-0 top-2 mr-2">
                  <ScrollArea className="h-[15rem]">
                    {Array.from({ length: 96 }).map((_, i) => {
                      const hour = String(Math.floor(i / 4)).padStart(2, "0");
                      const minute = String((i % 4) * 15).padStart(2, "0");
                      return (
                        <SelectItem key={i} value={`${hour}:${minute}`}>
                          {hour}:{minute}
                        </SelectItem>
                      );
                    })}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>

          <p className="text-sm text-gray-500">
            Your post will be published at {date.toLocaleString()}
          </p>
        </div>

        <DialogFooter>
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MdOutlineInfo />
              <p>Schedule a post for a later date and time</p>
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
