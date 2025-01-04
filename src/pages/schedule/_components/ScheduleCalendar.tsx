import { useState, useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdCalendarMonth } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { cn } from "@/lib/utils";
import useBreakpoint from "@/lib/useBreakpoint";
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

const initialDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getFullDayName(abbreviation) {
  switch (abbreviation) {
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
      return "Invalid day abbreviation";
  }
}

function changeDays(days: string[], startDay: string) {
  const startIndex = days.indexOf(startDay);
  if (startIndex === -1) {
    throw new Error("Invalid start day");
  }
  return [...days.slice(startIndex), ...days.slice(0, startIndex)];
}

export default function ScheduleCalendar({
  selectedDate,
  setSelectedDate,
  data,
  startDay,
  setStartDay,
  className,
}: {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  data: any;
  startDay: string;
  setStartDay: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) {
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const { md } = useBreakpoint();

  const scheduleDates = useMemo(() => {
    return new Set(
      data.map((item: any) => new Date(item?.date).toDateString())
    );
  }, [data]);

  const days = useMemo(() => {
    if (startDay === "Sun") {
      return initialDays;
    } else {
      return changeDays(initialDays, startDay);
    }
  }, [startDay]);

  const dates = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const startingDayIndex = initialDays.indexOf(
      changeDays(initialDays, startDay)[0]
    );

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    // Calculate the offset based on the starting day
    const offset = (firstDayOfMonth - startingDayIndex + 7) % 7;

    // Calculate days from the previous month
    const prevMonthDays = offset;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const totalDaysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

    const daysArray = [];

    // Add days from the previous month
    for (let i = prevMonthDays; i > 0; i--) {
      const date = new Date(prevYear, prevMonth, totalDaysInPrevMonth - i + 1);
      daysArray.push({
        date,
        hasSchedule: scheduleDates.has(date.toDateString()),
        isCurrentMonth: false, // Indicates it's from the previous month
      });
    }

    // Add days from the current month
    for (let i = 1; i <= totalDaysInMonth; i++) {
      const date = new Date(year, month, i);
      daysArray.push({
        date,
        hasSchedule: scheduleDates.has(date.toDateString()),
        isCurrentMonth: true,
      });
    }

    // Add days from the next month
    const remainingDays = 42 - daysArray.length; // Assuming a 6x7 grid
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(nextYear, nextMonth, i);
      daysArray.push({
        date,
        hasSchedule: scheduleDates.has(date.toDateString()),
        isCurrentMonth: false, // Indicates it's from the next month
      });
    }

    return daysArray;
  }, [selectedDate, scheduleDates, startDay]);

  const weekDates = useMemo(() => {
    const startingDayIndex = initialDays.indexOf(
      changeDays(initialDays, startDay)[0]
    );

    const day = selectedDate.getDay();
    const offset = (day - startingDayIndex + 7) % 7;

    const weekArray = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() - offset + i);
      return { date, hasSchedule: scheduleDates.has(date.toDateString()) };
    });

    return weekArray;
  }, [selectedDate, scheduleDates, startDay]);

  const changeMonth = (increment: number) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date ? date.getDate().toString() : "";
  };

  return (
    <div className={cn(" w-full", className)}>
      <div className="flex  flex-col gap-4 h-full ">
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
            <Select value={startDay} onValueChange={setStartDay}>
              <SelectTrigger className="w-[120px] rounded-full h-11 ml-auto hidden pl-4 font-medium text-sm md:flex bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl w-40">
                <SelectGroup>
                  <SelectLabel>Day starts from:</SelectLabel>
                  {initialDays.map((day) => (
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
        {!md || showFullCalendar ? (
          <div className="flex flex-col h-full pb-0 gap-2 md:gap-0 overflow-hidden md:rounded-2xl rounded-lg md:bg-background">
            <div className="grid grid-cols-7 gap-2 md:gap-0 items-stretch  justify-items-center md:border-b  w-full">
              {days?.map((day, index) => (
                <span
                  key={day}
                  className={cn(
                    "text-center text-sm font-semibold md:border-r f w-full md:py-3",
                    index % 7 === 6 && "md:border-r-0",
                    initialDays[selectedDate?.getDay()] === day &&
                      "text-primary"
                  )}
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 grid-rows-6 md:gap-0 gap-3 items-stretch  justify-items-center h-full w-full">
              {dates?.map((item, index) => (
                <button
                  key={index}
                  className={cn(
                    "text-center relative md:border-b md:border-r rounded-xl md:rounded-none flex md:items-start items-center justify-center md:pt-2 text-sm w-full py-2 md:h-full hover:bg-primary-foreground/50 active:bg-primary-foreground/70 md:hover:bg-primary-accent/50 md:active:bg-primary-accent/70",
                    index % 7 === 6 && "md:border-r-0",
                    index >= 35 && "border-b-0",
                    !item?.isCurrentMonth && "bg-secondary-accent/15",
                    item?.date &&
                      item?.date.toDateString() === selectedDate.toDateString()
                      ? "bg-primary-foreground md:bg-primary-accent/60"
                      : "text-muted-foreground/80"
                  )}
                  onClick={() => {
                    if (item?.date) {
                      setSelectedDate(new Date(item?.date));
                    }
                  }}
                >
                  <span
                    className={cn(
                      "font-normal text-xs",
                      item?.isCurrentMonth && "text-foreground font-medium"
                    )}
                  >
                    {formatDate(item?.date)}
                  </span>
                  {item?.hasSchedule && (
                    <div className="absolute font-extrabold text-3xl md:text-4xl text-primary -bottom-1 md:bottom-1 right-0 left-0">
                      .
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-7 items-stretch gap-2 justify-items-center  w-full">
              {days.map((day) => (
                <span
                  key={day}
                  className={cn(
                    "text-center text-sm w-10 font-semibold",
                    initialDays[selectedDate?.getDay()] === day &&
                      "text-primary"
                  )}
                >
                  {day}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-3 justify-items-center w-full ">
              {weekDates?.map((item, index) => (
                <button
                  key={index}
                  className={cn(
                    "text-center relative py-2 text-xs w-full hover:bg-primary-foreground font-medium rounded-xl ",
                    selectedDate?.toDateString() ===
                      item?.date.toDateString() && "bg-primary-foreground "
                  )}
                  onClick={() => {
                    if (item?.date) {
                      setSelectedDate(new Date(item?.date));
                    }
                  }}
                >
                  <span className="">{formatDate(item?.date)}</span>

                  {/* // when there is a data in this date then show this */}
                  {item?.hasSchedule && (
                    <div className="absolute font-extrabold text-3xl text-primary -bottom-1 right-0 left-0">
                      .
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
