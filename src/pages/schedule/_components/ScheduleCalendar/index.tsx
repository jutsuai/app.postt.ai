import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import useBreakpoint from "@/lib/useBreakpoint";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleMonthView from "./ScheduleMonthView";
import ScheduleWeekView from "./ScheduleWeekView";
import { DaysTypes } from "../../SchedulePage";

const initialDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  setStartDay: React.Dispatch<React.SetStateAction<DaysTypes>>;
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
      localStorage?.setItem("weekStartDay", "Sun");
      return initialDays;
    } else {
      localStorage?.setItem("weekStartDay", startDay);
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
      <div className="flex flex-col gap-4 h-full md:min-h-[768px]">
        <ScheduleHeader
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          changeMonth={changeMonth}
          startDay={startDay}
          setStartDay={setStartDay}
          showFullCalendar={showFullCalendar}
          setShowFullCalendar={setShowFullCalendar}
          initialDays={initialDays}
        />
        {!md || showFullCalendar ? (
          <ScheduleMonthView
            initialDays={initialDays}
            formatDate={formatDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            days={days}
            dates={dates}
          />
        ) : (
          <ScheduleWeekView
            days={days}
            weekDates={weekDates}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            initialDays={initialDays}
            formatDate={formatDate}
          />
        )}
      </div>
    </div>
  );
}
