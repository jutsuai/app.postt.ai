import { BrowserRouter } from "react-router";
import Router from "./Router";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "sonner";
import TanstackQueryProvider from "./lib/tanstackQueryProvider";

export default function App() {
  return (
    <>
      <TanstackQueryProvider>
        <BrowserRouter>
          <AuthProvider>
            <SidebarProvider>
              <Router />
            </SidebarProvider>
          </AuthProvider>
        </BrowserRouter>

        <Toaster />
      </TanstackQueryProvider>
    </>
  );
}
