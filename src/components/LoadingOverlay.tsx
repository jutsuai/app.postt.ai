import { cn } from "@/lib/utils";
import { VscLoading } from "react-icons/vsc";

export default function LoadingOverlay({
  className,
  loading = true,
  message,
}: {
  className?: string;
  loading?: boolean;
  message?: string;
}) {
  return (
    loading && (
      <div
        className={cn(
          "absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 rounded-md bg-background/25 backdrop-blur-sm",
          className,
        )}
      >
        <VscLoading className="size-16 animate-spin text-foreground" />

        {message && <p>{message}</p>}
      </div>
    )
  );
}
