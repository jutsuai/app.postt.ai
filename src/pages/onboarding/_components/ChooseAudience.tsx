import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import httpClient from "@/lib/httpClient";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import useAccountUpdater from "@/lib/useAccountUpdater";
import React from "react";

import {
  FaUsers,
  FaRocket,
  FaBriefcase,
  FaHandHoldingUsd,
  FaEllipsisH,
  FaFileAlt,
  FaImages,
  FaNewspaper,
  FaVideo,
  FaSuitcase,
  FaComments,
  FaSmile,
  FaBeer,
  FaQuestion,
  FaUserTie,
  FaBullhorn,
  FaChartLine,
  FaCircleNotch,
} from "react-icons/fa";
import {
  IoBriefcaseOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

import {
  LiaFileAlt,
  LiaHandHoldingUsdSolid,
  LiaUserTieSolid,
} from "react-icons/lia";
import { CiBullhorn } from "react-icons/ci";
import { PiChartLineUpThin, PiImagesSquareLight } from "react-icons/pi";
import { PiCircleNotch } from "react-icons/pi";
import { GoRocket } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { PiNewspaper } from "react-icons/pi";
import { BsCameraVideo } from "react-icons/bs";

const steps = [
  {
    question: "What's your primary goal for using Postt?",
    dataId: "brandPersonality",
    options: [
      {
        text: "Build a Personal Brand",
        icon: <LiaUserTieSolid />,
      },
      { text: "Generate Leads", icon: <CiBullhorn /> },
      {
        text: "Increase Engagement",
        icon: <PiChartLineUpThin />,
      },
      { text: "Other", icon: <PiCircleNotch /> },
    ],
  },
  {
    question: "Who is your primary audience on LinkedIn?",
    dataId: "targetAudience",
    options: [
      { text: "Entrepreneurs", icon: <GoRocket /> },
      { text: "Tech Enthusiasts", icon: <LuUsers /> },
      { text: "Recruiters", icon: <IoBriefcaseOutline /> },
      { text: "Clients", icon: <LiaHandHoldingUsdSolid /> },
      { text: "Other", icon: <PiCircleNotch /> },
    ],
  },
  {
    question: "What types of content do you post most often?",
    dataId: "industry",
    options: [
      { text: "Text Posts", icon: <LiaFileAlt /> },
      { text: "Carousels", icon: <PiImagesSquareLight /> },
      { text: "Articles", icon: <PiNewspaper /> },
      { text: "Videos", icon: <BsCameraVideo /> },
    ],
  },
];
export default function ChooseAudience() {
  const accountUpdate = useAccountUpdater();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<any>({});

  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<any> = () => {
    setLoading(true);

    const data = Object.fromEntries(
      Object.entries(selectedOptions).map(([key, value]) => [
        key,
        (value as string[]).join(", "),
      ]),
    );

    console.log(data);

    httpClient()
      .put(`/users/${user?._id}/profile`, data)
      .then((res) => {
        console.log(res.data);
        goToNextStep();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const goToNextStep = () => {
    accountUpdate({
      path: "onboarding.step1",
      value: true,
    }).finally(() => navigate("?step=connect"));
  };

  const [currentStep, setCurrentStep] = useState(1); // Step tracker
  const [selectedOptions, setSelectedOptions] = useState<any>({}); // Store selected values

  // Handle Selection with Toggle
  const handleSelect = (stepKey: any, optionId: any) => {
    setSelectedOptions((prev: any) => {
      const currentSelections = prev[stepKey] || [];
      if (currentSelections.includes(optionId)) {
        // If already selected, remove it
        return {
          ...prev,
          [stepKey]: currentSelections.filter((id: any) => id !== optionId),
        };
      } else {
        // Otherwise, add it
        return {
          ...prev,
          [stepKey]: [...currentSelections, optionId],
        };
      }
    });
  };

  // Navigate to the next step
  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Navigate to the previous step
  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Render options for a step
  const renderOptionsSlim = (stepData: any, stepKey: any) => (
    <div className="mb-8">
      <h3 className="mb-4 text-center text-2xl font-semibold">
        {stepData.question}
      </h3>
      <div className="flex flex-col justify-center gap-4">
        {stepData.options.map((option: any) => (
          <div
            key={option.text}
            onClick={() => handleSelect(stepKey, option.text)}
            className={`flex h-12 cursor-pointer items-center gap-2 rounded-xl border-2 bg-muted px-4 py-2 ${
              selectedOptions[stepKey]?.includes(option.text)
                ? "border-primary"
                : ""
            }`}
          >
            <span className="text-sm text-primary">{option.icon}</span>

            <span className="text-xs font-medium">{option.text}</span>
            {selectedOptions[stepKey]?.includes(option.text) ? (
              <IoCheckmarkCircleSharp className="ml-auto text-primary" />
            ) : (
              <MdOutlineRadioButtonUnchecked className="ml-auto text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Render options for a step
  const renderOptions = (stepData: any, stepKey: any) => (
    <div className="mb-8">
      <h3 className="mb-8 text-center text-2xl font-semibold">
        {stepData.question}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {stepData.options.map((option: any) => (
          <div
            key={option.text}
            onClick={() => handleSelect(stepKey, option.text)}
            className={cn("group/onboardingCard flex cursor-pointer flex-col items-center justify-between gap-4 rounded-xl border p-4 shadow-md transition-all duration-200",
              selectedOptions[stepKey]?.includes(option.text)
                && "border-primary bg-primary/5"
                
            )}
          >
            <span
              className={cn(
                "my-auto text-4xl transition-all duration-200 group-hover/onboardingCard:text-primary",
                selectedOptions[stepKey]?.includes(option.text)
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {option.icon}
            </span>

            <span className="text-center text-xs font-semibold">
              {option.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col gap-4"
      >
        <ProgressIndicator
          steps={steps?.length}
          currentStep={currentStep}
          handlePrevStep={handlePrevStep}
        />

        {steps?.map(
          (step, index) =>
            index + 1 === currentStep && renderOptions(step, step?.dataId),
        )}

        {currentStep === steps?.length && (
          <div className="mt-auto flex w-full items-center gap-2">
            <Button
              className="mt-2 w-full rounded-full text-foreground hover:text-foreground/80"
              type="button"
              onClick={() => goToNextStep()}
              variant="secondary"
              disabled={loading}
            >
              Skip
            </Button>

            <Button
              className="mt-2 w-full rounded-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading className="!size-4 animate-spin" />
              ) : (
                "Finish"
              )}
            </Button>
          </div>
        )}
      </form>
      {currentStep < steps?.length && (
        <div className="mt-auto flex w-full items-center gap-2">
          <Button
            className="mt-2 w-full rounded-full text-foreground hover:text-foreground/80"
            type="button"
            onClick={() => goToNextStep()}
            variant="secondary"
            disabled={loading}
          >
            Skip
          </Button>

          <Button
            className="mt-2 w-full rounded-full"
            type="button"
            onClick={() => handleNextStep()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

const ProgressIndicator = ({
  steps,
  currentStep,

  handlePrevStep,
}: any) => {
  return (
    <div className="mb-12 flex w-full items-center px-4 transition-all duration-200">
      {[...Array(steps)].map((step, index) => (
        <React.Fragment key={index}>
          {index !== 0 && (
            <div
              className={`h-0.5 flex-1 transition-all duration-200 ${
                currentStep > index ? "bg-primary" : "bg-gray-300"
              }`}
            />
          )}

          <div
            className={cn(
              "relative transition-all duration-200",
              currentStep > index + 1 ? "cursor-pointer" : "cursor-default",
            )}
            onClick={() => {
              if (currentStep > index + 1) {
                handlePrevStep();
              }
            }}
          >
            <div
              className={`flex aspect-square w-6 items-center justify-center rounded-full transition-all duration-200 ${
                currentStep === index + 1
                  ? "bg-primary text-background"
                  : currentStep > index
                    ? "bg-primary text-background"
                    : "bg-gray-300 text-gray-800"
              } text-xs font-semibold`}
            >
              <span className="text-background">●</span>
            </div>
            <span className="absolute -bottom-5 right-0 translate-x-[25%] whitespace-nowrap text-xs font-semibold text-foreground transition-all duration-200">
              Step {index + 1}
            </span>
          </div>

          {index !== steps - 1 && (
            <div
              className={`h-0.5 flex-1 transition-all duration-200 ${
                currentStep > index + 1 ? "bg-primary" : "bg-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
