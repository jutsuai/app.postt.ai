import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import LinkedinCallbackPage from "./components/LinkedinCallbackPage";
import LinkedinCarouselPage from "./components/LinkedinCarouselPage";
import LinkedinOrgPage from "./components/LinkedinOrgPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/auth/linkedin" element={<LinkedinCallbackPage />} />
      <Route path="/linkedin/carousel" element={<LinkedinCarouselPage />} />
      <Route path="/linkedin/org" element={<LinkedinOrgPage />} />
    </Routes>
  );
}
