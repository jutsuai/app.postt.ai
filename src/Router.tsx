import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import LinkedinPage from "./pages/linkedin/LinkedinPage";
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
import { useAuth } from "./context/AuthContext";
import ReportsPage from "./pages/reports/ReportsPage";
import CreatePage from "./pages/create/CreatePage";
import LinkedinCarouselPage from "./pages/restricted/RestrictedLinkedinCarouselPage";
import CarouselsPage from "./pages/linkedin/carousel/CarouselsPage";
import EditCarouselPage from "./pages/linkedin/carousel/editCarouselPage/EditCarouselPage";

export default function Router() {
  const { isAuthenticated } = useAuth();
  // const isAuthenticated = false;

  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated === null ? (
    <div>...Loading...</div>
  ) : isAuthenticated ? (
    <AppRouter />
  ) : (
    <RootRouter />
  );
}

const RootRouter = () => {
  return (
    <Routes>
      {/* Carousel */}
      <Route path="restricted">
        <Route path="linkedin/carousel" element={<LinkedinCarouselPage />} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route index element={<AuthPage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="auth/linkedin" element={<LinkedinCallbackPage />} />

        <Route path="signup">
          <Route index element={<SignupPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="onboarding" element={<OnboardSuccess />} />

        {/* Carousel */}
        <Route path="restricted">
          <Route path="linkedin/carousel" element={<LinkedinCarouselPage />} />
        </Route>

        <Route path="linkedin">
          <Route index element={<LinkedinPage />} />
        </Route>

        <Route index element={<HomePage />} />
        <Route path="add" element={<AddWriter />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="discover" element={<DiscoverPage />} />
        <Route path="profile" element={<ProfilePage />} />

        <Route path="reports" element={<ReportsPage />} />

        <Route path="create">
          <Route index element={<CreatePage />} />
          <Route path="post" element={<CreatePostPage />} />

          <Route path="carousel">
            <Route index element={<CarouselsPage />} />
            <Route path=":id" element={<EditCarouselPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
