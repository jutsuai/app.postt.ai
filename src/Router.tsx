import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
  Outlet,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import LinkedinCallbackPage from "./components/LinkedinCallbackPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/auth/linkedin" element={<LinkedinCallbackPage />} />
    </Routes>
  );
}
