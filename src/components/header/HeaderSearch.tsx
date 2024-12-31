import React from "react";
import { IoIosSearch } from "react-icons/io";

export default function HeaderSearch() {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className="flex items-center bg-muted w-full rounded-3xl justify-between sm:max-w-sm sm:focus-within:max-w-md transition-[max-width] duration-200 h-12">
      <div className="w-20 h-full grid place-items-center text-muted-foreground">
        <IoIosSearch className="text-2xl" />
      </div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Search for a writer and more..."
        className="w-full pr-4 h-full py-2 bg-transparent outline-none border-none text-sm"
      />
    </div>
  );
}
