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
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="h-full w-full sm:max-w-md flex items-center sm:bg-transparent bg-background">
      <Card className=" sm:h-auto w-full border-none shadow-none  rounded-none sm:rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-8 flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  // validate: (value) => validateStrongPass(value),
                })}
                id="password"
                type="password"
                placeholder="********"
                autoComplete="password"
                label="Password"
                errors={errors}
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-full text-black mt-6"
            >
              Login
            </Button>
          </form>
          <div className="flex items-center gap-4 w-full max-w-sm mx-auto">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">
              Or continue with
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
        <CardFooter className="text-center flex items-center justify-center text-xs -mt-6 gap-1 ">
          Don't have an account?{" "}
          <Link className="text-primary" to={"/signup"}>
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
