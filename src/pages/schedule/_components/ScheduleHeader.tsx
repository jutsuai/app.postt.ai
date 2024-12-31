import { useState, useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdCalendarMonth } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { cn } from "@/lib/utils";
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ScheduleHeader({
  selectedDate,
  setSelectedDate,
  data,
}: {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  data: any;
}) {
  const [showFullCalendar, setShowFullCalendar] = useState(false);

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

    const daysArray = Array(firstDayOfMonth).fill(null);

    for (let i = 1; i <= totalDaysInMonth; i++) {
      const date = new Date(year, month, i);
      daysArray.push({
        date,
        hasSchedule: scheduleDates.has(date.toDateString()),
      });
    }
    return daysArray;
  }, [selectedDate, scheduleDates]);

  const weekDates = useMemo(() => {
    const currentDayOfWeek = selectedDate.getDay();
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
    <div className="flex col-span-2  flex-col gap-4 w-full pb-12">
      <div className="flex items-center justify-between mb-2">
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
        <div className="flex transition-all duration-200 bg-muted h-9 border rounded-full">
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
      {showFullCalendar ? (
        <div className="flex flex-col gap-2">
          <div className="flex justify-around items-center">
            {days.map((day, index) => (
              <span
                key={day}
                className={cn(
                  "text-center text-sm w-10 font-medium",
                  index === selectedDate.getDay() && "text-primary"
                )}
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 justify-items-center w-full">
            {dates.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "text-center relative py-2 text-sm w-10 hover:bg-primary-foreground rounded-md ",
                  !item?.date && "pointer-events-none",
                  item?.date &&
                    item?.date.toDateString() === selectedDate.toDateString()
                    ? "bg-primary-foreground "
                    : "text-muted-foreground"
                )}
                onClick={() => item?.date && setSelectedDate(item?.date)}
              >
                <span className="">{formatDate(item?.date)}</span>
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
          <div className="flex justify-around items-center">
            {days.map((day, index) => (
              <span
                key={day}
                className={cn(
                  "text-center text-sm w-10 font-medium",
                  index === selectedDate.getDay() && "text-primary"
                )}
              >
                {day}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 justify-items-center w-full ">
            {weekDates.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "text-center relative py-2 text-sm w-10 hover:bg-primary-foreground rounded-md ",
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
  );
}
