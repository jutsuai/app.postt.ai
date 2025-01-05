import { BrowserRouter } from "react-router";
import Router from "./Router";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SidebarProvider>
            <Router />
          </SidebarProvider>
        </AuthProvider>
      </BrowserRouter>

      <Toaster />
    </>
  );
}
