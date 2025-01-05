import { useNavigate, useSearchParams } from "react-router-dom";
import AccountType from "@/pages/onboarding/_components/AccountType";
import ChooseAudience from "@/pages/onboarding/_components/ChooseAudience";
// import OnboardPreview from "@/pages/onboarding/_components/OnboardPreview";
import ConnectSocial from "@/pages/linkedin/ConnectLinkedinPage";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import { cn } from "@/lib/utils";
import BrandDetails from "./_components/BrandDetails";

export default function OnboardingPage() {
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");
  const navigate = useNavigate();

  return (
    <div className="lg:max-w-md w-full flex flex-col gap-2 px-4 items-start  pt-[7dvh]">
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        size="sm"
        className={cn(!step && "opacity-0 pointer-events-none")}
      >
        <IoChevronBack />
        Back
      </Button>
      {step === "audience" ? (
        <ChooseAudience />
      ) : step === "connect" ? (
        <ConnectSocial />
      ) : step === "brand" ? (
        <BrandDetails />
      ) : (
        <AccountType />
      )}
    </div>
  );
}
