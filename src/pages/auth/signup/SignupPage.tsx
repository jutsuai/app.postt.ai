import CustomInput from "@/components/custom/CustomInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm, SubmitHandler } from "react-hook-form";
import authButtons from "../_components/authButtonData";
import Image from "@/components/Image";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import useBreakpoint from "@/lib/useBreakpoint";
import { IoIosArrowBack } from "react-icons/io";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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

  return !bp?.sm && onboarding ? (
    <div className="absolute inset-0 grid place-items-center z-10 bg-background sm:bg-transparent  sm:bg-gradient-to-b from-foreground/50 via-transparent to-foreground/50">
      <div className="p-4 border bg-background rounded-xl max-w-sm shadow-lg">
        <Button
          onClick={() => window.history.back()}
          variant="ghost"
          size="sm"
          // className="hover:text-muted-foreground"
        >
          <IoIosArrowBack /> Back
        </Button>
        {onboarding === "accounttype" ? (
          <AccountType setValue={setValue} navigate={navigate} />
        ) : onboarding === "audience" ? (
          <ChooseAudience />
        ) : null}
      </div>
    </div>
  ) : (
    <>
      <LocalSignup
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        register={register}
        acceptTerms={acceptTerms}
        setAcceptTerms={setAcceptTerms}
      />
      <Drawer
        open={
          bp?.sm && (onboarding === "accounttype" || onboarding === "audience")
        }
        onOpenChange={(open) => {
          if (!open) {
            window.history.back();
          }
        }}
      >
        <DrawerContent className="px-4 pb-10 mx-4">
          <DrawerHeader>
            <DrawerTitle />
          </DrawerHeader>
          {onboarding === "accounttype" ? (
            <AccountType setValue={setValue} navigate={navigate} />
          ) : onboarding === "audience" ? (
            <ChooseAudience />
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
}

function LocalSignup({
  handleSubmit,
  onSubmit,
  errors,
  register,
  acceptTerms,
  setAcceptTerms,
}: {
  handleSubmit: any;
  onSubmit: any;
  errors: any;
  register: any;
  acceptTerms: any;
  setAcceptTerms: any;
}) {
  return (
    <div className="absolute grid place-items-center z-10 bg-background sm:bg-transparent inset-0 sm:bg-gradient-to-b from-foreground/50 via-transparent to-foreground/50">
      <Card className="sm:max-w-md w-full border-none shadow-none sm:border sm:shadow  rounded-none sm:rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Create an account to get started with Postt
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-8 flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <CustomInput
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  id="firstName"
                  label="First Name"
                  errors={errors}
                  type="text"
                  placeholder="John"
                  autoComplete="first-name name"
                />
                <CustomInput
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  id="lastName"
                  label="Last Name"
                  errors={errors}
                  type="text"
                  placeholder="Doe"
                  autoComplete="last-name name"
                />
              </div>
              <CustomInput
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                id="email"
                type="email"
                placeholder="user@jutsu.ai"
                autoComplete="email"
                label="Email"
                errors={errors}
              />
              <CustomInput
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  // validate: (value) => validateStrongPass(value),
                })}
                id="password"
                type="password"
                placeholder="********"
                autoComplete="new-password"
                label="Password"
                errors={errors}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={acceptTerms}
                  onCheckedChange={(e) => setAcceptTerms(e)}
                />
                <Label
                  htmlFor="acceptTerms"
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I Agree with{" "}
                  <Link className="text-primary" to={"/termsandservice"}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link className="text-primary" to="/privacypolicy">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>
            <Button
              disabled={!acceptTerms}
              type="submit"
              className="w-full rounded-3xl text-black mt-6"
            >
              Register
            </Button>
          </form>
          <div className="flex items-center gap-4 w-full max-w-sm mx-auto">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">
              Or sign up with
            </span>

            <Separator className="flex-1" />
          </div>
          <div className="flex gap-4 mx-auto">
            {authButtons.map((button, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className={cn("rounded-lg", `text-[${button.accent}`)}
              >
                {button.logo ? (
                  <Image
                    src={button.logo}
                    className="h-4 w-4"
                    alt={button.label}
                  />
                ) : (
                  button.icon
                )}
              </Button>
            ))}
          </div>
          <p className="text-xs text-center"></p>
        </CardContent>
        <CardFooter className="text-center flex items-center justify-center text-xs -mt-4 text-muted-foreground ">
          Don't have an account?{" "}
          <Link className="text-primary" to={"/auth/login"}>
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

function AccountType({ setValue, navigate }: { setValue: any; navigate: any }) {
  return (
    <div className="flex pt-4 flex-col items-center gap-3">
      <Image
        src="/onboarding/account-type.svg"
        alt=""
        className="size-[140px]"
      />
      <h3 className="text-lg font-semibold">Choose your Account Type</h3>
      <p className="text-muted-foreground text-sm -mt-2 text-center">
        Create your account and collaborate multi-agent content creators
      </p>

      <Button
        onClick={() => {
          setValue("accountType", "personal");
          navigate("?onboarding=audience");
        }}
        className="w-full mt-4 h-11 justify-start active:border-primary hover:border-primary rounded-lg hover:text-foreground hover:bg-primary/20"
        variant="outline"
      >
        Personal
      </Button>
      <Button
        onClick={() => {
          setValue("accountType", "business");
          navigate("?onboarding=audience");
        }}
        className="w-full  h-11 justify-start active:border-primary hover:border-primary rounded-lg hover:text-foreground hover:bg-primary/20"
        variant="outline"
      >
        Business
      </Button>
    </div>
  );
}

function ChooseAudience() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src="/onboarding/choose-audience.svg"
        alt=""
        className="size-[140px]"
      />
      <h3 className="text-lg font-medium">
        Hi Adnan, let's give you full experience
      </h3>
      <p className="text-muted-foreground text-sm -mt-2 text-center">
        answer to get a Linkedin Post
      </p>

      <div>
        <p>What is your audience?</p>
        <Textarea />
      </div>
    </div>
  );
}
