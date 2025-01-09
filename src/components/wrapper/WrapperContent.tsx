import { cn } from "@/lib/utils";

export default function WrapperContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("p-4 pb-20 sm:pb-4 flex flex-col", className)}>
      {children}
    </div>
  );
}
