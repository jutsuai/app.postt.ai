import BoringAvatar from "@/components/images/BoringAvatar";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import { HiDotsVertical } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import ConnectChannelDialog from "@/dialog/ConnectChannelDialog";

export default function ChannelsPage() {
  const { linkedinProfiles, getLinkedinProfiles } = useAuth();

  useEffect(() => {
    getLinkedinProfiles();
  }, []);

  return (
    <Wrapper>
      <WrapperContent className="h-dvh gap-2 overflow-y-auto sm:bg-muted/80">
        <Header />

        <div className="mx-auto w-full max-w-2xl gap-4 p-4">
          {/* Section */}
          <section className="flex w-full flex-col gap-8 overflow-hidden rounded-2xl bg-background p-8 pb-4 shadow-2xl shadow-blue-500/10">
            <div className="flex items-center justify-between">
              <h2 className="w-max whitespace-nowrap text-2xl font-semibold">
                Channels
              </h2>

              <ConnectChannelDialog>
                <Button className="rounded-full">Create Channel</Button>
              </ConnectChannelDialog>
            </div>

            <div className="w-full gap-6">
              {/*  */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {linkedinProfiles?.length}/3 channel connected
                </p>

                <div className="flex gap-0.5">
                  {linkedinProfiles?.map((i: any) => (
                    <div
                      key={i._id}
                      className={cn(
                        "h-2 w-6 rounded-full",

                        linkedinProfiles?.length <= 3
                          ? "bg-green-600"
                          : "bg-red-600",
                      )}
                    />
                  ))}

                  {/* {[...Array(3 - linkedinProfiles?.length)].map((_, i) => (
                    <div className="h-2 w-6 rounded-full bg-muted-foreground/25" />
                  ))} */}
                </div>
              </div>

              {/*  */}
              <div className="mt-6 flex flex-col gap-4">
                {linkedinProfiles?.map((profile: any) => (
                  <Profile key={profile._id} data={profile} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </WrapperContent>
    </Wrapper>
  );
}

const Profile = ({
  hideActions = false,
  data,
}: {
  hideActions?: boolean;
  data: any;
}) => {
  const { deleteLinkedinProfile } = useAuth();
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  return (
    <>
      <div className="flex items-center gap-4 rounded-md border bg-background p-2 px-4">
        <div className="relative">
          <BoringAvatar className="w-12" alt={data?.name} src={data.logo} />

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f8/LinkedIn_icon_circle.svg"
            className="absolute bottom-0 right-0 h-4 w-4"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">{data?.name}</p>
          <p className="text-xs font-medium capitalize text-muted-foreground">
            Linkedin {data?.type} Account
          </p>
        </div>

        {!hideActions && (
          <div className="ml-auto flex gap-2">
            <FaCircleCheck className="text-green-600" />

            <DropdownMenu>
              <DropdownMenuTrigger>
                <HiDotsVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer hover:!bg-primary/10 hover:!text-foreground">
                  Refresh Connection
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:!bg-primary/10 hover:!text-foreground"
                  onClick={() => setShowDisconnectDialog((e) => !e)}
                >
                  Disconnect Channel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <DisconnectDialog
        open={showDisconnectDialog}
        setOpen={setShowDisconnectDialog}
        onClick={() => deleteLinkedinProfile(data?._id)}
        profile={data}
      />
    </>
  );
};

const DisconnectDialog = ({
  open,
  setOpen,
  onClick,

  profile,
}: {
  open: boolean;
  setOpen: (e: boolean) => void;
  onClick: () => void;

  profile: any;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="px-0">
        <DialogHeader className="px-6">
          <DialogTitle>
            Are you sure you want to disconnect this channel?
          </DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-col gap-4 bg-[#f5f6f8] p-6">
          <Profile hideActions={true} data={profile} />

          <p className="text-xs text-muted-foreground">
            You will no longer be able to post to this account, all existing
            posts, analytics, campaigns, and data will be deleted and{" "}
            <span className="font-bold">
              cannot be recovered. This action cannot be undone.
            </span>
            <br />
            <br />
            Having issues with your connection? We advise using the refresh
            connection option.
          </p>
        </div>

        <DialogFooter className="px-6">
          <div className="flex gap-4 bg-background">
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => onClick()}
            >
              Disconnect Channel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
