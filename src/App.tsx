import { BrowserRouter } from "react-router";
import Router from "./Router";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./components/ui/sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <Router />
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
