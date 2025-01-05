import { cn } from "@/lib/utils";

export default function ScheduleMonthView({
  days,
  dates,
  selectedDate,
  setSelectedDate,
  initialDays,
  formatDate,
}: {
  days: string[];
  dates: any[];
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  initialDays: string[];
  formatDate: (date: Date) => string;
}) {
  return (
    <div className="flex flex-col h-full pb-0 gap-2 md:gap-0 overflow-hidden md:rounded-2xl rounded-lg md:bg-background">
      <div className="grid grid-cols-7 gap-2 md:gap-0 items-stretch  justify-items-center md:border-b  w-full">
        {days?.map((day, index) => (
          <span
            key={day}
            className={cn(
              "text-center text-sm font-semibold md:border-r f w-full md:py-3",
              index % 7 === 6 && "md:border-r-0",
              initialDays[selectedDate?.getDay()] === day && "text-primary"
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
              "text-center relative md:border-b transition-all duration-200 md:border-r rounded-xl md:rounded-none flex md:items-start items-center justify-center md:pt-2 text-sm w-full py-2 md:h-full hover:bg-primary-foreground/50 active:bg-primary-foreground/70 md:hover:bg-primary-accent/50 md:active:bg-primary-accent/70",
              index % 7 === 6 && "md:border-r-0",
              index >= 35 && "border-b-0",
              index === 35 && "md:rounded-bl-2xl ",
              index === 41 && "md:rounded-br-2xl ",
              !item?.isCurrentMonth && "md:bg-secondary-accent/15",
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
  );
}
