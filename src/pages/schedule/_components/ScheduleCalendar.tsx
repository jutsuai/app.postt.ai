import { useState, useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdCalendarMonth } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { cn } from "@/lib/utils";
import useBreakpoint from "@/lib/useBreakpoint";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ScheduleCalendar({
  selectedDate,
  setSelectedDate,
  data,
  className,
}: {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  data: any;
  className?: string;
}) {
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const { md } = useBreakpoint();

  const scheduleDates = useMemo(() => {
    return new Set(
      data.map((item: any) => new Date(item?.date).toDateString())
    );
  }, [data]);

  const dates = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    // Calculate days from the previous month
    const prevMonthDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
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
  }, [selectedDate, scheduleDates]);
  const weekDates = useMemo(() => {
    const getDayFromMonday = (date: any) => {
      const day = date.getDay();
      return day === 0 ? 6 : day - 1; // Adjust Sunday (0) to 6, and shift others back by 1
    };

    const currentDayOfWeek = getDayFromMonday(selectedDate);

    const weekArray = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() - currentDayOfWeek + i);
      return { date, hasSchedule: scheduleDates.has(date.toDateString()) };
    });

    return weekArray;
  }, [selectedDate, scheduleDates]);

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
      <div className="flex  flex-col gap-4 h-full">
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => changeMonth(-1)} className="p-1">
              <FiChevronLeft className="h-4 w-4" />
            </button>
            <h4 className="text-xl font-bold">
              {selectedDate.toLocaleString("default", {
                month: "short",
                year: "numeric",
              })}
            </h4>
            <button onClick={() => changeMonth(1)} className="p-1">
              <FiChevronRight className="h-4 w-4" />
            </button>
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
          <div className="flex flex-col gap-2 h-full pb-0">
            <div className="grid grid-cols-7 items-stretch gap-2 justify-items-center  w-full">
              {days.map((day, index) => (
                <span
                  key={day}
                  className={cn(
                    "text-center text-sm w-10 font-medium",
                    (index + 1 === selectedDate.getDay() ||
                      (index === 6 && selectedDate.getDay() === 0)) &&
                      "text-primary"
                  )}
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 grid-rows-6 items-stretch gap-3 justify-items-center h-full w-full">
              {dates.map((item, index) => (
                <button
                  key={index}
                  className={cn(
                    "text-center relative py-2 text-sm w-full h-full hover:bg-primary-foreground rounded-xl ",
                    !item?.date && "pointer-events-none",
                    item?.date &&
                      item?.date.toDateString() === selectedDate.toDateString()
                      ? "bg-primary-foreground "
                      : "text-muted-foreground"
                  )}
                  onClick={() =>
                    item?.date && setSelectedDate(new Date(item.date))
                  }
                >
                  <span
                    className={cn(
                      "font-normal",
                      item?.isCurrentMonth && "text-foreground font-medium"
                    )}
                  >
                    {formatDate(item?.date)}
                  </span>
                  {item?.hasSchedule && (
                    <div className="absolute font-extrabold text-3xl text-primary -bottom-1 right-0 left-0">
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
              {days.map((day, index) => (
                <span
                  key={day}
                  className={cn(
                    "text-center text-sm w-10 font-medium",
                    (index + 1 === selectedDate.getDay() ||
                      (index === 6 && selectedDate.getDay() === 0)) &&
                      "text-primary"
                  )}
                >
                  {day}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-3 justify-items-center w-full ">
              {weekDates.map((item, index) => (
                <button
                  key={index}
                  className={cn(
                    "text-center relative py-2 text-sm w-full hover:bg-primary-foreground rounded-xl ",
                    selectedDate.toDateString() === item?.date.toDateString()
                      ? "bg-primary-foreground "
                      : "text-muted-foreground"
                  )}
                  onClick={() => setSelectedDate(item?.date)}
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
