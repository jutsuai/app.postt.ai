import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import useBreakpoint from "@/lib/useBreakpoint";
import { IoIosArrowBack } from "react-icons/io";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import LocalSignup from "./_components/LocalSignup";
import AccountType from "./_components/AccountType";
import ChooseAudience from "./_components/ChooseAudience";
import OnboardPreview from "./_components/OnboardPreview";
import ConnectSocial from "./_components/ConnectSocial";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  accountType: "personal" | "business";
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const onboarding = searchParams.get("onboarding");

  const bp = useBreakpoint();

  const [acceptTerms, setAcceptTerms] = useState(true);

  const onSubmit: SubmitHandler<FormValues> = (initialData) => {
    const data = { ...initialData, acceptTerms: acceptTerms };
    console.log(data);
    navigate("?onboarding=accounttype");
  };

  return !bp?.sm && onboarding && onboarding !== "preview" ? (
    <div className="p-4 border bg-background rounded-2xl min-w-96 shadow-lg">
      <Button onClick={() => window.history.back()} variant="ghost" size="sm">
        <IoIosArrowBack /> Back
      </Button>
      {onboarding === "accounttype" ? (
        <AccountType setValue={setValue} navigate={navigate} />
      ) : onboarding === "audience" ? (
        <ChooseAudience navigate={navigate} />
      ) : onboarding === "connect" ? (
        <ConnectSocial navigate={navigate} />
      ) : null}
    </div>
  ) : (
    <>
      {onboarding === "preview" || onboarding === "connect" ? (
        <OnboardPreview navigate={navigate} />
      ) : (
        <LocalSignup
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          register={register}
          acceptTerms={acceptTerms}
          setAcceptTerms={setAcceptTerms}
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
            window.history.back();
          }
        }}
      >
        <DrawerContent className="px-6 pb-14 mx-4">
          <DrawerHeader>
            <DrawerTitle hidden />
          </DrawerHeader>
          {onboarding === "accounttype" ? (
            <AccountType setValue={setValue} navigate={navigate} />
          ) : onboarding === "audience" ? (
            <ChooseAudience navigate={navigate} />
          ) : onboarding === "connect" ? (
            <ConnectSocial navigate={navigate} />
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
}
