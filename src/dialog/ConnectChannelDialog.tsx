import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Link from "@/components/custom/Link";

const channels = [
  {
    name: "LinkedIn",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    link: "/channels/linkedin/connect",
  },
  {
    name: "Twitter / X",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg",
    disabled: true,
  },
  {
    name: "Facebook",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png",
    disabled: true,
  },
  {
    name: "Instagram",
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    disabled: true,
  },
  {
    name: "Bluesky",
    icon: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Bluesky_Logo.svg",
    disabled: true,
  },
  {
    name: "Youtube",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
    disabled: true,
  },
];

export default function ConnectChannelDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl bg-[#f5f6f8] px-0">
        <DialogHeader className="flex items-center justify-center px-6 py-6">
          <DialogTitle>Connect a new channel</DialogTitle>
        </DialogHeader>

        <div className="grid w-full grid-cols-3 gap-4 px-6">
          {channels.map((channel) => (
            <Link
              key={channel.name}
              to={channel.disabled ? "#" : channel.link}
              className={cn(
                "flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-xl bg-white p-4 transition",
                !channel.disabled &&
                  "hover:shadow-[2px_40px_50px_10px_rgba(74,58,255,0.09)]",
                channel.disabled && "cursor-default opacity-50",
              )}
            >
              <div className="flex items-center gap-4">
                <img
                  src={channel.icon}
                  alt={channel.name}
                  className="h-12 w-12"
                />
              </div>
              <div>
                <h6 className="text-lg font-semibold">{channel.name}</h6>

                <p className="text-center text-xs text-muted-foreground">
                  {channel.disabled ? "Coming soon" : "Connect"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
