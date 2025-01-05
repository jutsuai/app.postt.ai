import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CiBoxList } from "react-icons/ci";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdCalendarMonth } from "react-icons/md";
import { DaysTypes } from "../../SchedulePage";

function getFullDayName(day: string) {
  switch (day) {
    case "Sun":
      return "Sunday";
    case "Mon":
      return "Monday";
    case "Tue":
      return "Tuesday";
    case "Wed":
      return "Wednesday";
    case "Thu":
      return "Thursday";
    case "Fri":
      return "Friday";
    case "Sat":
      return "Saturday";
    default:
      return "Invalid day";
  }
}

export default function ScheduleHeader({
  selectedDate,
  setSelectedDate,
  changeMonth,
  startDay,
  setStartDay,
  showFullCalendar,
  setShowFullCalendar,
  initialDays,
}: {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  changeMonth: (value: number) => void;
  startDay: string;
  setStartDay: React.Dispatch<React.SetStateAction<DaysTypes>>;
  showFullCalendar: boolean;
  setShowFullCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  initialDays: string[];
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-full items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setSelectedDate(new Date())}
          className="md:h-11 h-9 px-4 md:px-6 text-sm  border-muted md:border-border  rounded-3xl"
        >
          Today
        </Button>
        <div className="flex items-center">
          <Button
            onClick={() => changeMonth(-1)}
            size="icon"
            variant="ghost"
            className="rounded-full"
          >
            <FiChevronLeft />
          </Button>
          <Button
            onClick={() => changeMonth(1)}
            size="icon"
            variant="ghost"
            className="rounded-full"
          >
            <FiChevronRight />
          </Button>
        </div>
        <h4 className="text-xl ">
          {selectedDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h4>
        <Select
          value={startDay}
          onValueChange={(value: DaysTypes) => setStartDay(value)}
        >
          <SelectTrigger className="w-36 rounded-full h-11 ml-auto hidden pl-4 font-medium text-sm md:flex bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-2xl w-40">
            <SelectGroup>
              <SelectLabel>Week starts from:</SelectLabel>
              {initialDays?.map((day) => (
                <SelectItem
                  className={cn(
                    day === startDay && "font-semibold",
                    "rounded-xl"
                  )}
                  key={day}
                  value={day}
                >
                  {getFullDayName(day)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex md:hidden transition-all  duration-200 bg-muted h-9 border rounded-full">
        <button
          onClick={() => setShowFullCalendar(true)}
          className={cn(
            "px-3 rounded-full border border-transparent",
            showFullCalendar && "border-border bg-background"
          )}
        >
          <MdCalendarMonth />
        </button>
        <button
          onClick={() => setShowFullCalendar(false)}
          className={cn(
            "px-3 rounded-full border border-transparent",
            !showFullCalendar && "border-border bg-background"
          )}
        >
          <CiBoxList />
        </button>
      </div>
    </div>
  );
}
