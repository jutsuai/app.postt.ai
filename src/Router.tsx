import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import LinkedinPage from "./pages/linkedin/LinkedinPage";
import CreatePostPage from "./pages/linkedin/CreatePostPage";
import LinkedinCallbackPage from "./pages/auth/linkedin/LinkedinCallbackPage";
import Layout from "./layout/Layout";
import SchedulePage from "./pages/schedule/SchedulePage";
import DiscoverPage from "./pages/discover/DiscoverPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AddWriter from "./pages/addWriter/AddWriter";
import SignupPage from "./pages/auth/signup/SignupPage";
import OnboardSuccess from "./pages/onboarding/_components/OnboardSuccess";
import ReportsPage from "./pages/reports/ReportsPage";
import CreatePage from "./pages/create/CreatePage";
import LinkedinCarouselPage from "./pages/restricted/RestrictedLinkedinCarouselPage";
import CarouselsPage from "./pages/create/carousel/CarouselsPage";
import EditCarouselPage from "./pages/create/carousel/editCarouselPage/EditCarouselPage";
import { useAuth } from "./context/AuthContext";
// import ConnectLinkedinPage from "./pages/auth/linkedin/ConnectLinkedinPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import ConnectLinkedinPage from "./pages/linkedin/connection/ConnectLinkedinPage";
import ConnectLinkedinCallbackPage from "./pages/linkedin/connection/ConnectLinkedinCallbackPage";
import ConnectLinkedinSuccessPage from "./pages/linkedin/connection/ConnectLinkedinSuccessPage";
import CreateTextPage from "./pages/create/text/CreateTextPage";
import SettingsPage from "./pages/settings/SettingsPage";
import OnboardingLayout from "./layout/OnboardingLayout";
import CreateDocumentPage from "./pages/create/CreateDocumentPage";
import { VscLoading } from "react-icons/vsc";
import PostsPage from "./pages/posts/PostsPage";

export default function Router() {
  const { isAuthenticated } = useAuth();
  // const isAuthenticated = true;

  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated === null ? (
    <div className="w-dvw h-dvh grid place-items-center">
      <VscLoading className="animate-spin text-5xl text-foreground" />
    </div>
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
        <Route
          path="linkedin/carousel/:carouselId/slide/:slideId"
          element={<LinkedinCarouselPage />}
        />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate replace to={"/login"} />} />

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
        {/* <Route path="auth/linkedin" element={<LinkedinCallbackPage />} /> */}

        <Route path="onboarding">
          <Route element={<OnboardingLayout />}>
            <Route index element={<OnboardingPage />} />

            <Route path="success" element={<OnboardSuccess />} />
          </Route>
        </Route>

        {/* Carousel */}
        <Route path="restricted">
          <Route path="linkedin/carousel" element={<LinkedinCarouselPage />} />
        </Route>

        <Route path="linkedin">
          <Route index element={<LinkedinPage />} />

          <Route path="connect" element={<OnboardingLayout />}>
            <Route index element={<ConnectLinkedinPage />} />
            <Route path="callback" element={<ConnectLinkedinCallbackPage />} />
            <Route path="success" element={<ConnectLinkedinSuccessPage />} />
          </Route>
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
          <Route path="text" element={<CreateTextPage />} />
          <Route path="image" element={<CreateDocumentPage />} />

          <Route path="carousel">
            <Route index element={<CarouselsPage />} />
            <Route path=":id" element={<EditCarouselPage />} />
          </Route>
        </Route>

        <Route path="posts">
          <Route index element={<PostsPage />} />
        </Route>

        <Route path="settings">
          <Route index element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Route>
    </Routes>
  );
};
