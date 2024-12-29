import { cn } from "@/lib/utils";
import MobileNavbar from "../MobileNavbar";
import { SidebarInset } from "../ui/sidebar";
import AppSidebar from "./_components/AppSidebar";

export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex h-full w-full items-start justify-start">
      <AppSidebar />
      <SidebarInset className={cn("w-full", className)}>
        {children}
      </SidebarInset>
      <MobileNavbar />
    </div>
  );
}
