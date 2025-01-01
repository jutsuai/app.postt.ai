import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import ScheduleCalendar from "./_components/ScheduleCalendar";
import { useMemo, useState } from "react";
import RenderDateSection from "./_components/RenderDateSection";
import { PiCalendarXDuotone } from "react-icons/pi";

const data = [
  {
    id: "friday-25",
    date: "2025-08-25", // Changed from "Friday 25"
    slots: [
      {
        id: "friday-25-slot-1",
        time: "09:00",
        posts: [
          {
            id: "post-1",
            title: "Adalan Motivation",
            platform: "Twitter",
            image:
              "https://images.unsplash.com/a-person-holding-a-white-cat-in-their-hands-411UrGnMfmc?q=20&w=100",
            caption: "Rise and shine! Here's to a productive day ahead. ☀️",
          },
        ],
      },
      {
        id: "friday-25-slot-2",
        time: "15:00",
        posts: [
          {
            id: "post-2",
            title: "Team Spotlight",
            platform: "LinkedIn",
            image:
              "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=20&w=100",
            caption: "Meet Alice, the powerhouse behind our operations. 💼",
          },
        ],
      },
    ],
  },
  {
    id: "saturday-26",
    date: "2024-12-31", // Changed from "Saturday 26"
    slots: [
      {
        id: "saturday-26-slot-1",
        time: "11:00",
        posts: [
          {
            id: "post-3",
            title: "Weekend Offer",
            platform: "Facebook",
            image:
              "https://images.unsplash.com/photo-1519340333755-56e9c22bdf9a?q=20&w=100",
            caption: "Exclusive weekend deals live now! 🔥 #ShopNow",
          },
        ],
      },
      {
        id: "saturday-26-slot-2",
        time: "17:00",
        posts: [
          {
            id: "post-4",
            title: "User Poll",
            platform: "Twitter",
            image: "",
            caption:
              "What's your go-to productivity hack? 🛠️ #ShareYourThoughts",
          },
        ],
      },
    ],
  },
  {
    id: "sunday-27",
    date: "2025-01-27", // Changed from "Sunday 27"
    slots: [
      {
        id: "sunday-27-slot-1",
        time: "10:00",
        posts: [
          {
            id: "post-5",
            title: "Inspirational Quote",
            platform: "Instagram",
            image:
              "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=20&w=100",
            caption:
              "Do what you can, with what you have, where you are. – Roosevelt 🌟",
          },
        ],
      },
      {
        id: "sunday-27-slot-2",
        time: "19:00",
        posts: [
          {
            id: "post-6",
            title: "Weekly Recap",
            platform: "LinkedIn",
            image:
              "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=20&w=100",
            caption:
              "Highlights from this week! What was your favorite moment? 🚀",
          },
        ],
      },
    ],
  },
  {
    id: "monday-28",
    date: "2025-01-2", // Changed from "Monday 28"
    slots: [
      {
        id: "monday-28-slot-1",
        time: "08:30",
        posts: [
          {
            id: "post-7",
            title: "Morning Motivation",
            platform: "Twitter",
            image:
              "https://images.unsplash.com/photo-1557682262-4f5d17a2f64d?q=20&w=100",
            caption: "Start the week strong with a positive mindset! 💪",
          },
        ],
      },
      {
        id: "monday-28-slot-2",
        time: "13:00",
        posts: [
          {
            id: "post-8",
            title: "Product Update",
            platform: "Facebook",
            image:
              "https://images.unsplash.com/photo-1557682224-dfb2d948f352?q=20&w=100",
            caption:
              "Exciting new features have landed in our app! 🚀 #Innovation",
          },
        ],
      },
      {
        id: "friday-25-slot-1",
        time: "09:00",
        posts: [
          {
            id: "post-1",
            title: "Adalan Motivation",
            platform: "Twitter",
            image:
              "https://images.unsplash.com/a-person-holding-a-white-cat-in-their-hands-411UrGnMfmc?q=20&w=100",
            caption: "Rise and shine! Here's to a productive day ahead. ☀️",
          },
        ],
      },
      {
        id: "friday-25-slot-2",
        time: "15:00",
        posts: [
          {
            id: "post-2",
            title: "Team Spotlight",
            platform: "LinkedIn",
            image:
              "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=20&w=100",
            caption: "Meet Alice, the powerhouse behind our operations. 💼",
          },
        ],
      },
    ],
  },
];

export default function SocialMediaSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const scheduleData = useMemo(() => {
    return data.filter(
      (section) =>
        new Date(section.date).toLocaleDateString() ==
        selectedDate.toLocaleDateString()
    );
  }, [selectedDate]);

  return (
    <Wrapper>
      <WrapperContent className="bg-primary-foreground/60 md:grid gap-8 grid-cols-6 pb-0 w-full">
        <ScheduleCalendar
          data={data}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          className="col-span-4 md:h-[calc(100dvh-1rem)] pb-4"
        />

        <div className="rounded-t-[4rem] md:rounded-xl md:bg-background col-span-2 relative p-8 pb-10 -mx-4 md:-mx-0 md:mb-4 px-8">
          {scheduleData && scheduleData?.length > 0 ? (
            <RenderDateSection section={scheduleData[0]} />
          ) : (
            <div className="flex items-center flex-col relative z-10 md:mt-0  pb-24 md:pb-0 mt-10 gap-2 justify-center h-full opacity-70">
              <PiCalendarXDuotone className="text-6xl text-muted-foreground/100" />

              <p className=" text-lg font-semibold">
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
          {/* )
          )} */}
          <div className="absolute md:hidden inset-0 bg-background rounded-t-[4rem] z-[1]" />
          <div className="absolute md:hidden bottom-0 -top-6 max-w-[95%] mx-auto left-0 right-0 bg-muted/50 rounded-t-[6rem]" />
        </div>
      </WrapperContent>
    </Wrapper>
  );
}
