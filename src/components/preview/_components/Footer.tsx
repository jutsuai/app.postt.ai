import { AiTwotoneHeart, AiTwotoneLike } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import BoringAvatar from "@/components/BoringAvatar";
import { SlLike } from "react-icons/sl";
import { TfiCommentAlt } from "react-icons/tfi";
import { LiaShareSolid } from "react-icons/lia";
import { IoBookmarkOutline } from "react-icons/io5";

export default function Footer({ createdBy }: { createdBy: any }) {
  return (
    <div className="flex flex-col gap-3 px-4 pb-4">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1">
          <div className="flex w-fit items-center justify-center rounded-full border bg-blue-600/70 p-0.5 text-xs">
            <AiTwotoneLike className="-scale-x-[1]" />
          </div>
          <div className="flex w-fit items-center justify-center rounded-full border bg-red-600/70 p-0.5 text-xs">
            <AiTwotoneHeart />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Alex Colen and 230 others
        </p>
        <p className="ml-auto text-xs text-muted-foreground">15 comments</p>
      </div>
      <Separator />
      <div className="flex items-center justify-around">
        <BoringAvatar
          src={createdBy?.logo}
          alt={createdBy?.name}
          name={createdBy?.name}
          className="h-6 w-6 rounded-full object-cover object-center"
        />
        <div className="flex items-center gap-2 text-sm font-medium">
          <SlLike className="-scale-x-[1] text-base" />
          Like
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <TfiCommentAlt className="-scale-x-[1] text-base" />
          Comment
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <LiaShareSolid className="text-base" />
          Share
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <IoBookmarkOutline className="text-base" />
          Save
        </div>
      </div>
    </div>
  );
}
