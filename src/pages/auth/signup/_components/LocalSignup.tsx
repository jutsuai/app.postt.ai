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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import authButtons from "../../_components/authButtonData";
import { cn } from "@/lib/utils";
import Image from "@/components/Image";

export default function LocalSignup({
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
    // <div className="absolute grid place-items-center z-10  inset-0 ">
    <Card className="sm:max-w-md  sm:h-auto w-full border-none shadow-none sm:border sm:shadow rounded-none sm:rounded-3xl">
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
          <span className="text-xs text-muted-foreground">Or sign up with</span>

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
    // </div>
  );
}
