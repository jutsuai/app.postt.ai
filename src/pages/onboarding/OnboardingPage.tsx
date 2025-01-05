// Onboarding

import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import useBreakpoint from "@/lib/useBreakpoint";
import AccountType from "@/pages/onboarding/_components/AccountType";
import ChooseAudience from "@/pages/onboarding/_components/ChooseAudience";
import OnboardPreview from "@/pages/onboarding/_components/OnboardPreview";
import ConnectSocial from "@/pages/onboarding/_components/ConnectSocial";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import { cn } from "@/lib/utils";
import BrandDetails from "./_components/BrandDetails";

export type OnboardingFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms: boolean;

  type: "personal" | "organization";

  targetAudience: string;
  industry: string;
  valueProposition: string;
  brandPersonality: string;
};

export default function OnboardingPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: { errors },
  } = useForm<OnboardingFormValues>({
    defaultValues: {
      // Add default values here
    },
  });

  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");

  const navigate = useNavigate();

  const bp = useBreakpoint();

  console.log("step", step);
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
        <ChooseAudience
          handleSubmit={handleSubmit}
          register={register}
          watch={watch}
          errors={errors}
        />
      ) : step === "connect" ? (
        <ConnectSocial />
      ) : step === "brand" ? (
        <BrandDetails />
      ) : (
        <AccountType setValue={setValue} />
      )}
    </div>
  );
}
