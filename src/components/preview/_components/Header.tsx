import BoringAvatar from "@/components/BoringAvatar";
import { Button } from "@/components/ui/button";
import { FaGlobeAmericas } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";

export default function Header({ createdBy }: { createdBy: any }) {
  return (
    <div className="flex items-start justify-between gap-3 px-4 pt-4">
      <BoringAvatar
        src={createdBy?.logo}
        alt={createdBy?.name}
        name={createdBy?.name}
        className="h-12 w-12 rounded-full object-cover object-center"
      />
      <div className="mr-auto flex flex-col leading-tight">
        <div className="flex w-full items-center gap-2">
          <span className="text-sm font-semibold">{createdBy?.name}</span>
          <span className="text-xs text-muted-foreground">●</span>
          <span className="text-sm text-muted-foreground">3rd+</span>
        </div>
        <div className="text-xs text-muted-foreground">
          postt.ai | LinkedIn Automation
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>3d</span>
          <span className="scale-75 text-xs text-muted-foreground">●</span>
          <FaGlobeAmericas />
        </div>
      </div>
      <Button
        className="ml-auto w-fit text-[#0072b1] hover:text-[#0072b1]"
        size="sm"
        variant="ghost"
      >
        <LuPlus /> Follow
      </Button>
    </div>
  );
}
