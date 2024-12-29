import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignupFormValues } from "../SignupPage";
import { cn } from "@/lib/utils";
import httpClient from "@/lib/httpClient";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";

export default function ChooseAudience({
  handleSubmit,
  register,
  watch,
  errors,
}: {
  handleSubmit: any;
  register: any;
  watch: any;
  errors: any;
}) {
  const { signupWithEmail } = useAuth();

  const linkedInAudience = [
    {
      dataName: "targetAudience",
      question: "What is your audience?",
    },
    {
      dataName: "industry",
      question: "What is your industry?",
    },
    {
      dataName: "valueProposition",
      question: "What is your value proposition?",
    },
    {
      dataName: "brandPersonality",
      question: "What tone and style do you prefer?",
    },
  ];

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
    signupWithEmail(data);
    // setLoading(true);
    // console.log("submitted");

    // console.log("navigating to next page");
    // console.log(data);

    // httpClient()
    //   .post("/auth/signup", data)
    //   .then((res) => {
    //     const data = res.data;
    //     console.log("====== onSubmit: ", data);

    //     saveUserData(data);

    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.log("====== onSubmit: ", err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };
  return (
    <div className="flex pt-6 -mx-6 -mb-14 sm:-mb-10  px-6 pb-10 flex-col items-center gap-4 max-h-[90dvh] sm:max-h-none overflow-y-auto">
      <Image
        src="/onboarding/choose-audience.svg"
        alt=""
        className="size-[140px]"
      />
      <h3 className="text-xl text-center font-semibold">
        Hi {watch("firstName") || "there"}, let's give you full experience
      </h3>
      <p className="text-muted-foreground text-sm -mt-2 text-center">
        Answer to get a Linkedin Post
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 mt-3"
      >
        {linkedInAudience.map((data, index) => (
          <div
            key={index}
            className={cn(
              " h-16 border rounded-xl px-3 py-2 flex flex-col gap-1 w-full",
              errors[data?.dataName]
                ? "border-red-500 focus-within:border-red-500"
                : "focus-within:border-primary-foreground"
            )}
          >
            <p className="text-sm font-medium">
              {data?.question}{" "}
              <span className="text-base font-medium leading-none text-red-800">
                *
              </span>
            </p>
            <input
              type="text"
              {...register(data?.dataName, {
                required: "This field is required",
              })}
              placeholder="Type the answer here.."
              className="w-full border-none p-0 outline-none text-xs h-6 "
            />
          </div>
        ))}

        <Button className="rounded-full mt-2" type="submit" disabled={loading}>
          {loading ? (
            <AiOutlineLoading className="animate-spin !size-4" />
          ) : (
            "Next"
          )}
        </Button>
      </form>
    </div>
  );
}
