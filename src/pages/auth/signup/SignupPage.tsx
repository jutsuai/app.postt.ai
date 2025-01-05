import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import useBreakpoint from "@/lib/useBreakpoint";
import { IoIosArrowBack } from "react-icons/io";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import LocalSignup from "./_components/LocalSignup";
import AccountType from "../../onboarding/_components/AccountType";
import ChooseAudience from "../../onboarding/_components/ChooseAudience";
import OnboardPreview from "../../onboarding/_components/OnboardPreview";
import ConnectSocial from "../../linkedin/ConnectLinkedinPage";

export type SignupFormValues = {
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
  } = useForm<SignupFormValues>({
    defaultValues: {
      // Add default values here
    },
  });

  const [searchParams] = useSearchParams();
  const onboarding = searchParams.get("onboarding");

  const navigate = useNavigate();

  const bp = useBreakpoint();

  return !bp?.sm && onboarding && onboarding !== "preview" ? (
    <div className="p-6  bg-background rounded-2xl w-[28rem]">
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        size="sm"
        className="-ml-2"
      >
        <IoIosArrowBack /> Back
      </Button>
      {onboarding === "accounttype" ? (
        <AccountType setValue={setValue} />
      ) : onboarding === "audience" ? (
        <ChooseAudience
          handleSubmit={handleSubmit}
          register={register}
          watch={watch}
          errors={errors}
        />
      ) : onboarding === "connect" ? (
        <ConnectSocial />
      ) : null}
    </div>
  ) : (
    <>
      {onboarding === "preview" || onboarding === "connect" ? (
        <OnboardPreview />
      ) : (
        <LocalSignup
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          watch={watch}
        />
      )}
      <Drawer
        open={
          bp?.sm &&
          (onboarding === "accounttype" ||
            onboarding === "audience" ||
            onboarding === "connect")
        }
        onOpenChange={(open) => {
          if (!open) {
            navigate(-1);
          }
        }}
      >
        <DrawerContent className="px-6 pb-14 mx-4">
          <DrawerHeader>
            <DrawerTitle hidden />
          </DrawerHeader>
          {onboarding === "accounttype" ? (
            <AccountType setValue={setValue} />
          ) : onboarding === "audience" ? (
            <ChooseAudience
              handleSubmit={handleSubmit}
              register={register}
              watch={watch}
              errors={errors}
            />
          ) : onboarding === "connect" ? (
            <ConnectSocial />
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
}
