import React, { useState } from "react";

interface Event {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Moodboard & Concept",
      startTime: "07:30 AM",
      endTime: "09:30 AM",
      color: "border-orange-500 bg-orange-100",
    },
    {
      id: 2,
      title: "Sketching & Drawing",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      color: "border-indigo-500 bg-indigo-100",
    },
  ]);

  // Helper to generate days in month
  const generateDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar: (number | null)[] = Array(firstDay === 0 ? 6 : firstDay - 1)
      .fill(null)
      .concat([...Array(daysInMonth).keys()].map((i) => i + 1));
    return calendar;
  };

  // Toggle Calendar View
  const toggleCalendar = () => setIsExpanded(!isExpanded);

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 rounded-md shadow-md p-4 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h1>
        <button
          onClick={toggleCalendar}
          className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {/* Conditionally Render Full Calendar */}
      {isExpanded && (
        <>
          {/* Days of the Week */}
          <div className="grid grid-cols-7 text-center text-gray-500 mb-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="p-2 font-semibold">
                {day}
              </div>
            ))}
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-7 text-center">
            {generateDaysInMonth().map((day, idx) => (
              <div
                key={idx}
                className={`p-2 ${
                  day
                    ? "hover:bg-gray-200 cursor-pointer rounded-md"
                    : "invisible"
                } ${
                  day === currentDate.getDate()
                    ? "bg-indigo-500 text-white font-bold"
                    : ""
                }`}
              >
                {day || ""}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Event List */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Today</h2>
        {events.map((event) => (
          <div
            key={event.id}
            className={`border-l-4 ${event.color} rounded-lg p-3 mb-4`}
          >
            <h3 className="font-semibold text-gray-700">{event.title}</h3>
            <p className="text-sm text-gray-500">
              {event.startTime} - {event.endTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
