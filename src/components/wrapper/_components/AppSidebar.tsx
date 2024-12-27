import { Sidebar, SidebarRail } from "@/components/ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import AppSidebarContent from "./AppSidebarContent";
import AppSidebarFooter from "./AppSidebarFooter";

export default function AppSidebar() {
  return (
    <>
      <Sidebar id="app-sidebar" collapsible="icon">
        {/* Sidebar Header Section */}
        <AppSidebarHeader />

        {/* Sidebar Content Section */}
        <AppSidebarContent />

        {/* Sidebar Footer Section */}
        <AppSidebarFooter />

        <SidebarRail />
      </Sidebar>
    </>
  );
}
