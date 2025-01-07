import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { fetchProfiles } from "@/services/fetchProfiles";
import { Button } from "../ui/button";
import BoringAvatar from "../BoringAvatar";

export default function SelectProfileDialog({
  open,
  setOpen,
  onSubmit,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: any) => void;
}) {
  const {
    data: profiles,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["linkedin-profiles"],
    queryFn: () => fetchProfiles(),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Select a Profile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {profiles?.map((item) => (
            <ProfileCard key={item._id} data={item} onSubmit={onSubmit} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProfileCard({ data, onSubmit }: { data: any; onSubmit: any }) {
  return (
    <Button
      variant="outline"
      className="p-0"
      onClick={() => onSubmit(data.linkedinId)}
    >
      <div className="flex items-center">
        <BoringAvatar
          size={80}
          className="w-10 h-10 min-h-10"
          src={data?.logo}
          name={data.name}
        />
      </div>

      <div className="flex flex-col items-start">
        <h6 className="text-sm text-center font-medium py-1">{data?.name}</h6>
        <p className="text-xs text-center text-muted-foreground">
          {data?.slug}
        </p>
      </div>
    </Button>
  );
}
