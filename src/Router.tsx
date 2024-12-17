import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import LinkedinPage from "./pages/linkedin/LinkedinPage";
import CreateCarouselPage from "./pages/linkedin/createCarouselPage/CreateCarouselPage";
import CreatePostPage from "./pages/linkedin/CreatePostPage";
import LinkedinCallbackPage from "./pages/auth/LinkedinCallbackPage";
import Layout from "./layout/Layout";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import OnboardingFInish from "./pages/onboarding/OnboardingFInish";
import SchedulePage from "./pages/schedule/SchedulePage";
import DiscoverPage from "./pages/discover/DiscoverPage";
import ProfilePage from "./pages/profile/ProfilePage";

export default function Router() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="auth/linkedin" element={<LinkedinCallbackPage />} />
      </Route>

      <Route path="linkedin">
        <Route index element={<LinkedinPage />} />
        <Route path="carousel/create" element={<CreateCarouselPage />} />
        <Route path="post/create" element={<CreatePostPage />} />
      </Route>

      <Route path="onboarding">
        <Route path="" element={<OnboardingPage />} />
        <Route path="finished" element={<OnboardingFInish />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
