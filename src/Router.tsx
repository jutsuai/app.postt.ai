import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import LinkedinPage from "./pages/linkedin/LinkedinPage";
import CreateCarouselPage from "./pages/linkedin/createCarouselPage/CreateCarouselPage";
import CreatePostPage from "./pages/linkedin/CreatePostPage";
import LinkedinCallbackPage from "./pages/auth/LinkedinCallbackPage";
import Layout from "./layout/Layout";
import SchedulePage from "./pages/schedule/SchedulePage";
import DiscoverPage from "./pages/discover/DiscoverPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AddWriter from "./pages/addWriter/AddWriter";
import AuthPage from "./pages/auth/AuthPage";
import SignupPage from "./pages/auth/signup/SignupPage";
import OnboardSuccess from "./pages/auth/signup/OnboardSuccess";

export default function Router() {
  // const { isAuthenticated  } = useAuth();
  const isAuthenticated = false;

  return isAuthenticated === null ? (
    <div>Loading...</div>
  ) : isAuthenticated ? (
    <AppRouter />
  ) : (
    <RootRouter />
  );
}

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<AuthPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="auth/linkedin" element={<LinkedinCallbackPage />} />

        <Route path="signup">
          <Route index element={<SignupPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="onboarding" element={<OnboardSuccess />} />

      <Route path="linkedin">
        <Route index element={<LinkedinPage />} />
        <Route path="carousel/create" element={<CreateCarouselPage />} />
        <Route path="post/create" element={<CreatePostPage />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="add" element={<AddWriter />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};
