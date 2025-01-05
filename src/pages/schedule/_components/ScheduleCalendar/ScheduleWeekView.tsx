import { cn } from "@/lib/utils";

export default function ScheduleWeekView({
  days,
  weekDates,
  selectedDate,
  setSelectedDate,
  initialDays,
  formatDate,
}: {
  days: string[];
  weekDates: any[];
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  initialDays: string[];
  formatDate: (date: Date) => string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-7 items-stretch gap-2 justify-items-center  w-full">
        {days.map((day) => (
          <span
            key={day}
            className={cn(
              "text-center text-sm w-10 font-semibold",
              initialDays[selectedDate?.getDay()] === day && "text-primary"
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
              selectedDate?.toDateString() === item?.date.toDateString() &&
                "bg-primary-foreground "
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
  );
}
