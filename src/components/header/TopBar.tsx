import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GoBell } from "react-icons/go";
import { Button } from "../ui/button";
import HeaderSearch from "./HeaderSearch";
import useBreakpoint from "@/lib/useBreakpoint";

export default function TopBar() {
  const { sm } = useBreakpoint();
  return (
    <div className="flex h-full items-center -m-4 px-4 py-8 gap-4 justify-between sm:bg-background">
      {sm ? (
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/300" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      ) : (
        <h2 className=" text-muted-foreground">
          Let's start creating Johnathan
        </h2>
      )}
      {!sm && (
        <div className="ml-auto">
          <HeaderSearch />
        </div>
      )}
      <Button variant="outline" size="icon" className="rounded-full">
        <GoBell />
      </Button>
    </div>
  );
}
