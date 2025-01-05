// Onboarding

import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import useBreakpoint from "@/lib/useBreakpoint";
import AccountType from "@/pages/auth/signup/_components/AccountType";
import ChooseAudience from "@/pages/auth/signup/_components/ChooseAudience";
import OnboardPreview from "@/pages/auth/signup/_components/OnboardPreview";
import ConnectSocial from "@/pages/auth/signup/_components/ConnectSocial";

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

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
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

  //   // Disable signup logic by short-circuiting the render
  //   if (!onboarding) {
  //     return null; // Return null or placeholder component when signup is disabled
  //   }

  //   return !bp?.sm && onboarding && onboarding !== "preview" ? (
  //     <div className="p-6 bg-background rounded-2xl w-[28rem]">
  //       <Button
  //         onClick={() => navigate(-1)}
  //         variant="ghost"
  //         size="sm"
  //         className="-ml-2"
  //       >
  //         <IoIosArrowBack /> Back
  //       </Button>
  //       {onboarding === "accounttype" ? (
  //         <AccountType setValue={setValue} />
  //       ) : onboarding === "audience" ? (
  //         <ChooseAudience
  //           handleSubmit={handleSubmit}
  //           register={register}
  //           watch={watch}
  //           errors={errors}
  //         />
  //       ) : onboarding === "connect" ? (
  //         <ConnectSocial />
  //       ) : null}
  //     </div>
  //   ) : (

  return (
    <div className="w-full h-full bg-red-100">
      {/* <OnboardPreview /> */}

      {step === "connect" ? (
        <ConnectSocial />
      ) : step === "audience" ? (
        <ChooseAudience
          handleSubmit={handleSubmit}
          register={register}
          watch={watch}
          errors={errors}
        />
      ) : (
        <AccountType setValue={setValue} />
      )}
    </div>
  );
}
