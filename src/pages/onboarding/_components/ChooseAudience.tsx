import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignupFormValues } from "../../auth/signup/SignupPage";
import { cn } from "@/lib/utils";
import httpClient from "@/lib/httpClient";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";

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
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
    setLoading(true);

    httpClient()
      .put(`/users/${user?._id}/profile`, data)
      .then((res) => {
        console.log(res.data);
        if (data?.type === "organization") {
          navigate("?step=brand");
        } else {
          navigate("?step=connect");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 ">
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
                required: false,
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
