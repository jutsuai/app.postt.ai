import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { GoBell } from "react-icons/go";
import { IoIosFlash, IoIosSearch } from "react-icons/io";

export default function Header({
  inputValue,
  setInputValue,
  placeHolder,
  onClick,
  buttonText,
  buttonIcon,
}: {
  inputValue: string;
  setInputValue: any;
  placeHolder: string;
  onClick: any;
  buttonText: string;
  buttonIcon?: any;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 justify-between">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/300" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        <Button variant="outline" size="icon" className="rounded-full">
          <GoBell />
        </Button>
      </div>

      <h1 className="text-4xl font-normal mt-4 leading-tight">
        <span className="text-muted-foreground">Hello,</span>
        <br />
        <span className="font-semibold"> Adnan</span>
      </h1>

      <div className="flex items-center bg-muted rounded-3xl justify-between max-w-sm focus-within:max-w-md transition-[max-width] duration-200 h-12">
        <div className="w-20 h-full grid place-items-center text-muted-foreground">
          <IoIosSearch className="text-2xl" />
        </div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder={placeHolder}
          className="w-full pr-4 h-full py-2 bg-transparent outline-none border-none text-sm"
        />
        <Button
          onClick={onClick}
          size="sm"
          className="rounded-3xl mr-2 font-semibold text-foreground"
        >
          {buttonIcon && buttonIcon}
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
