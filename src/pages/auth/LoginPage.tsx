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
import { Link } from "react-router-dom";
import authButtons from "./_components/authButtonData";
import { cn } from "@/lib/utils";
import Image from "@/components/Image";
import CustomInput from "@/components/custom/CustomInput";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { FaLinkedin } from "react-icons/fa";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import useBreakpoint from "@/lib/useBreakpoint";
import { useEffect, useRef, useState } from "react";

type FormValue = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      // Add default values here
    },
  });

  const { loginWithLinkedin } = useAuth();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const { sm } = useBreakpoint();

  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {

      if (dotLottie) {
        dotLottie?.pause();
      }
      
    }, 7000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [dotLottie]);
  return (
    <div className="h-[calc(100dvh-4rem)] min-h-[500px] w-full sm:max-w-md flex items-center sm:bg-transparent bg-background">
      <Card className=" sm:h-auto w-full border-none shadow-none  rounded-none sm:rounded-3xl">
        <CardHeader className="sm:-mb-12 -mb-4 ">
          <CardTitle className="text-2xl text-center">
            Connect your account
          </CardTitle>
          <CardDescription className="text-center">
            You're so close to transforming your LinkedIn experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col  items-center justify-center gap-8 ">
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
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
                    value: 6,
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
            </div>
          </form> */}

          <DotLottieReact
            src="/auth/loginPageAnimation.lottie"
            loop={false}
            autoplay
           dotLottieRefCallback={setDotLottie}
            speed={1.2}
            style={
              sm
                ? {
                    width: "300px",
                    height: "150px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : {
                    width: "600px",
                    height: "300px",
                    margin: "0 auto",
                    display: "block",
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }
            }
          />
          <Button
            onClick={() => loginWithLinkedin("code")}
            className="w-full text-sm rounded-full  bg-primary"
          >
            <FaLinkedin className="h-12 size-12 w-12" /> LinkedIn
          </Button>

          {/* <div className="flex items-center gap-4 w-full max-w-sm mx-auto">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">
              Or continue with
            </span>

            <Separator className="flex-1" />
          </div>
          <div className="flex gap-4 mx-auto">
            {authButtons.map((button, index) => (
              <Link key={index} to={button.link}>
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
              </Link>
            ))}
          </div>
          <p className="text-xs text-center"></p> */}
        </CardContent>
        {/* <CardFooter className="text-center flex items-center justify-center text-xs -mt-6 gap-1 ">
          Don't have an account?{" "}
          <Link className="text-primary" to={"/signup"}>
            Sign up
          </Link>
        </CardFooter> */}
      </Card>
    </div>
  );
}
