import { Outlet } from "react-router";
import { Separator } from "@/components/ui/separator";
import arrayData from "@/pages/auth/_components/authpagebackgroundData";

export default function AuthLayout() {
  return (
    <div className="h-dvh w-dvw overflow-hidden bg-muted-foreground relative">
      <div className="rotate-12 z-0 pointer-events-none absolute inset-0 -translate-y-40 translate-x-9 scale-105 w-full grid gap-1 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] h-full">
        {arrayData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
      <Outlet />
    </div>
  );
}

const Card = ({ data }: { data: any }) => {
  return (
    <div className="h-fit scale-95 p-2 relative bg-white rounded-lg shadow-md">
      {/* Badge */}
      <div className="flex absolute top-4 left-4 justify-start">
        <span className="bg-background  text-[10px] font-semibold px-3 py-1 rounded-full">
          {data.category}
        </span>
      </div>

      <div className="bg-gray-300 h-32 w-full rounded-lg "></div>

      <h3 className="text-sm font-semibold mt-2">{data.title}</h3>

      <p className="text-[10px] text-muted-foreground">{data.organizer}</p>

      <Separator className="my-2" />
      <div className="flex justify-between items-center  text-[9px] text-muted-foreground">
        <span>{data.participants}</span>
        <span>{data.date}</span>
      </div>
      <div className="absolute top-4 right-4">
        <button className="text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
