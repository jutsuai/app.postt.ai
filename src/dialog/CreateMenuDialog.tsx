import MenuCard from "@/components/MenuCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const menus = [
  {
    name: "Text",
    url: "/create/text",
    icon: "/dialog-menu/text-post-image.svg",
  },
  {
    name: "Image",
    // url: "/create?type=image",
    url: "/create/image",
    icon: "/dialog-menu/single-post-image.svg",
  },
  {
    name: "Carousel",
    url: "/create/carousel",
    icon: "/dialog-menu/carousel-post-image.svg",
  },
  {
    name: "Document",
    url: "/create?type=document",
    icon: "/dialog-menu/single-post-image.svg",
  },
];

export default function CreateMenuDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4">
          {menus.map((menu) => (
            <MenuCard
              key={menu.name}
              name={menu.name}
              url={menu.url}
              icon={menu.icon}
              setOpen={setOpen}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
