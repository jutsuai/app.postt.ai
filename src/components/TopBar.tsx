import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { GoBell } from "react-icons/go";
import { Button } from "./ui/button";

export default function TopBar() {
  return (
    <div className="flex items-center gap-4 justify-between">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/300" alt="Profile" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      <Button variant="outline" size="icon" className="rounded-full">
        <GoBell />
      </Button>
    </div>
  );
}
