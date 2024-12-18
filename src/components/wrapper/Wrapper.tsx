import MobileNavbar from "../MobileNavbar";
import { SidebarInset } from "../ui/sidebar";
import AppSidebar from "./_components/AppSidebar";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-dvw">
      <AppSidebar />
      <SidebarInset className="w-full">{children}</SidebarInset>
      <MobileNavbar />
    </div>
  );
}
