import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import ScheduleCalendar from "./_components/ScheduleCalendar";
import { useEffect, useMemo, useState } from "react";
import RenderDateSection from "./_components/RenderDateSection";
import { PiCalendarXDuotone } from "react-icons/pi";
import { fetchPosts } from "@/services/fetchPosts";
import { useQuery } from "@tanstack/react-query";

export type DaysTypes =
  | "Sun"
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | string;

/**
 * Convert ISO8601 date (e.g. "2025-01-11T09:26:05.126Z") into:
 *  - a date string "YYYY-MM-DD"
 *  - a slot time string "HH:00"
 */
function parseDateAndTime(isoDateString: any) {
  const d = new Date(isoDateString);

  // Extract date in YYYY-MM-DD format
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;

  // Bucket by hour; e.g. "09:00", "10:00", etc.
  const hour = String(d.getUTCHours()).padStart(2, "0");
  const timeStr = `${hour}:00`;

  return { dateStr, timeStr };
}

function transformToCalendarFormat(posts: any) {
  // dataMap will look like:
  // {
  //   "2025-01-11": {
  //     "09:00": [ {post1}, {post2} ],
  //     "10:00": [ {post3}, ... ],
  //   },
  //   "2025-01-12": {
  //     "18:00": [ {post5}, ... ]
  //   }
  // }
  const dataMap: any = {};

  // For incrementing slot IDs globally
  let slotIdCounter = 1;

  posts.forEach((post: any) => {
    // If there's no createdAt, skip or handle differently as needed
    if (!post.createdAt) return;

    const { dateStr, timeStr } = parseDateAndTime(post.createdAt);

    // Ensure the date bucket
    if (!dataMap[dateStr]) {
      dataMap[dateStr] = {};
    }

    // Ensure the hour/time bucket
    if (!dataMap[dateStr][timeStr]) {
      dataMap[dateStr][timeStr] = [];
    }

    // Push this post into the correct date/time array
    dataMap[dateStr][timeStr].push(post);
  });

  /**
   * Now convert dataMap into the requested final array structure:
   *
   * [
   *   {
   *     date: '2025-01-11',
   *     slots: [
   *       {
   *         id: 1,
   *         time: "09:00",
   *         posts: [ ...posts ],
   *       },
   *       {
   *         id: 2,
   *         time: "10:00",
   *         posts: [ ...posts ],
   *       }
   *     ]
   *   },
   *   {
   *     date: '2025-01-12',
   *     slots: [ ... ]
   *   }
   * ]
   */
  const finalArray = [];

  // Sort dates so output is consistent
  const sortedDates = Object.keys(dataMap).sort();

  for (const dateKey of sortedDates) {
    const timesObj = dataMap[dateKey];
    const sortedTimes = Object.keys(timesObj).sort();

    // Build the slots array
    const slots = sortedTimes.map((timeKey) => {
      const slot = {
        id: slotIdCounter++,
        time: timeKey,
        posts: timesObj[timeKey],
      };
      return slot;
    });

    finalArray.push({
      date: dateKey,
      slots: slots,
    });
  }

  return finalArray;
}

export default function SocialMediaSchedule() {
  const { data: posts, isLoading: loading } = useQuery<any>({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  const [updatedData, setUpdatedData] = useState<any>([]);
  console.log(posts);

  useEffect(() => {
    if (posts) {
      // console.log("Posts fetched: ", posts);
      const updatedData = transformToCalendarFormat(posts);
      setUpdatedData(updatedData);
    }
  }, [posts]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDay, setStartDay] = useState<DaysTypes>(
    localStorage?.getItem("weekStartDay") || "Sun",
  );

  const scheduleData = useMemo(() => {
    return updatedData.filter(
      (section: any) =>
        new Date(section.date).toLocaleDateString() ==
        selectedDate.toLocaleDateString(),
    );
  }, [selectedDate]);

  return (
    <Wrapper>
      <WrapperContent className="w-full grid-cols-6 gap-4 bg-primary-foreground/60 pb-0 md:grid md:bg-muted">
        <ScheduleCalendar
          data={updatedData}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          startDay={startDay}
          setStartDay={setStartDay}
          className="col-span-4 pb-4 md:h-[calc(100dvh-1rem)] md:px-4 md:pb-8"
        />

        <div className="relative col-span-2 -mx-4 rounded-t-[4rem] p-8 px-8 pb-10 md:-mx-0 md:mb-4 md:rounded-xl md:bg-background">
          {scheduleData && scheduleData?.length > 0 ? (
            <RenderDateSection section={scheduleData[0]} />
          ) : (
            <div className="relative z-10 mt-10 flex h-full flex-col items-center justify-center gap-2 pb-24 opacity-70 md:mt-0 md:pb-0">
              <PiCalendarXDuotone className="text-6xl text-muted-foreground/100" />

              <p className="text-lg font-semibold">
                No posts scheduled for this day
              </p>
              <h4 className="text-sm font-medium text-muted-foreground">
                {selectedDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
            </div>
          )}

          <div className="absolute inset-0 z-[1] rounded-t-[4rem] bg-background md:hidden" />
          <div className="absolute -top-6 bottom-0 left-0 right-0 mx-auto max-w-[95%] rounded-t-[6rem] bg-muted/50 md:hidden" />
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
