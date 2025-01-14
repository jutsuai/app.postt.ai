import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import CreatePostPage from "./pages/linkedin/CreatePostPage";
import LinkedinCallbackPage from "./pages/auth/linkedin/LinkedinCallbackPage";
import Layout from "./layout/Layout";
import SchedulePage from "./pages/schedule/SchedulePage";
import SignupPage from "./pages/auth/signup/SignupPage";
import OnboardSuccess from "./pages/onboarding/_components/OnboardSuccess";
import ReportsPage from "./pages/reports/ReportsPage";
import CreatePage from "./pages/create/CreatePage";
import LinkedinCarouselPage from "./pages/restricted/RestrictedLinkedinCarouselPage";
import CreateCarouselPage from "./pages/create/carousel/CreateCarouselPage";
import { useAuth } from "./context/AuthContext";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import ConnectLinkedinPage from "./pages/linkedin/connection/ConnectLinkedinPage";
import ConnectLinkedinCallbackPage from "./pages/linkedin/connection/ConnectLinkedinCallbackPage";
import ConnectLinkedinSuccessPage from "./pages/linkedin/connection/ConnectLinkedinSuccessPage";
import CreateTextPage from "./pages/create/text/CreateTextPage";
import SettingsPage from "./pages/settings/SettingsPage";
import OnboardingLayout from "./layout/OnboardingLayout";
import CreateDocumentPage from "./pages/create/image/CreateImagePage";
import { VscLoading } from "react-icons/vsc";
import PostsPage from "./pages/posts/PostsPage";
import InitializeCarouselPage from "./pages/create/carousel/InitializeCarouselPage";
import ChannelsPage from "./pages/channels/ChannelsPage";
import InitializeTextPage from "./pages/create/text/InitializeTextPage";
import InitializeImagePage from "./pages/create/image/InitializeImagePage";
import CreateImagePage from "./pages/create/image/CreateImagePage";

export default function Router() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated === null ? (
    <div className="grid h-dvh w-dvw place-items-center">
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
        <Route path="onboarding">
          <Route element={<OnboardingLayout />}>
            <Route index element={<OnboardingPage />} />

            <Route path="success" element={<OnboardSuccess />} />
          </Route>
        </Route>

        {/*  */}
        <Route path="channels">
          <Route index element={<ChannelsPage />} />

          <Route path="linkedin/connect" element={<OnboardingLayout />}>
            <Route index element={<ConnectLinkedinPage />} />
            <Route path="callback" element={<ConnectLinkedinCallbackPage />} />
            <Route path="success" element={<ConnectLinkedinSuccessPage />} />
          </Route>
        </Route>

        {/*  */}
        <Route index element={<HomePage />} />

        <Route path="schedule" element={<SchedulePage />} />

        <Route path="reports" element={<ReportsPage />} />

        <Route path="posts">
          <Route index element={<PostsPage />} />
        </Route>

        <Route path="create">
          <Route index element={<CreatePage />} />
          <Route path="post" element={<CreatePostPage />} />

          <Route path="text">
            <Route index element={<InitializeTextPage />} />
            <Route path=":postId" element={<CreateTextPage />} />
          </Route>

          <Route path="image">
            <Route index element={<InitializeImagePage />} />
            <Route path=":postId" element={<CreateImagePage />} />
          </Route>
          {/* <Route path="image" element={<CreateDocumentPage />} /> */}

          <Route path="carousel">
            <Route index element={<InitializeCarouselPage />} />
            <Route path=":carouselId" element={<CreateCarouselPage />} />
          </Route>
        </Route>

        <Route path="settings">
          <Route index element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Route>
    </Routes>
  );
};
