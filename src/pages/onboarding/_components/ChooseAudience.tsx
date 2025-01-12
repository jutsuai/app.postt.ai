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
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

const step1 = {
  question: "Who is your primary audience on LinkedIn?",
  dataId: "targetAudience",
  options: [
    { text: "Entrepreneurs", icon: <FaRocket /> },
    { text: "Tech Enthusiasts", icon: <FaUsers /> },
    { text: "Recruiters", icon: <FaBriefcase /> },
    { text: "Clients", icon: <FaHandHoldingUsd /> },
    { text: "Other", icon: <FaCircleNotch /> },
  ],
  question2: "What types of content do you post most often?",
  dataId2: "industry",
  options2: [
    { text: "Text Posts", icon: <FaFileAlt /> },
    { text: "Carousels", icon: <FaImages /> },
    { text: "Articles", icon: <FaNewspaper /> },
    { text: "Videos", icon: <FaVideo /> },
  ],
};

const step2 = {
  question: "What tone or style best represents your voice?",
  dataId: "valueProposition",
  options: [
    { text: "Professional", icon: <FaSuitcase /> },
    { text: "Conversational", icon: <FaComments /> },
    { text: "Witty", icon: <FaSmile /> },
    { text: "Casual", icon: <FaBeer /> },
    { text: "Other", icon: <FaCircleNotch /> },
  ],
  question2: "What's your primary goal for using Postt?",
  dataId2: "brandPersonality",
  options2: [
    {
      text: "Build a Personal Brand",
      icon: <FaUserTie />,
    },
    { text: "Generate Leads", icon: <FaBullhorn /> },
    {
      text: "Increase Engagement",
      icon: <FaChartLine />,
    },
    { text: "Other", icon: <FaCircleNotch /> },
  ],
};
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
  const renderOptions = (stepData: any, stepKey: any) => (
    <div className="mb-8">
      <h3 className="mb-4 text-center text-lg font-semibold">
        {stepData.question}
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {stepData.options.map((option: any) => (
          <div
            key={option.text}
            onClick={() => handleSelect(stepKey, option.text)}
            className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 px-4 py-2 ${
              selectedOptions[stepKey]?.includes(option.text)
                ? "border-primary"
                : ""
            }`}
          >
            <span className="text-sm text-primary">{option.icon}</span>

            <span className="text-xs font-medium">{option.text}</span>
            {selectedOptions[stepKey]?.includes(option.text) ? (
              <IoCheckmarkCircleSharp className="ml-2 text-primary" />
            ) : (
              <MdOutlineRadioButtonUnchecked className="ml-2 text-muted-foreground" />
            )}
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
          steps={2}
          currentStep={currentStep}
          handlePrevStep={handlePrevStep}
        />

        {currentStep === 1 && (
          <>
            {renderOptions(step1, step1.dataId)}
            {renderOptions(
              { question: step1.question2, options: step1.options2 },
              step1.dataId2,
            )}
          </>
        )}
        {currentStep === 2 && (
          <>
            {renderOptions(step2, step2.dataId)}
            {renderOptions(
              { question: step2.question2, options: step2.options2 },
              step2.dataId2,
            )}
          </>
        )}

        {currentStep === 2 && (
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
      {currentStep === 1 && (
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
    <div className="mb-12 flex w-full items-center px-4">
      {[...Array(steps)].map((step, index) => (
        <React.Fragment key={index}>
          {index !== 0 && (
            <div
              className={`h-0.5 flex-1 ${
                currentStep > index ? "bg-primary" : "bg-gray-300"
              }`}
            />
          )}

          <div
            className={cn(
              "relative",
              currentStep > index + 1 ? "cursor-pointer" : "cursor-default",
            )}
            onClick={() => {
              if (currentStep > index + 1) {
                handlePrevStep();
              }
            }}
          >
            <div
              className={`flex aspect-square w-6 items-center justify-center rounded-full ${
                currentStep === index + 1
                  ? "bg-primary text-background"
                  : currentStep > index
                    ? "bg-primary text-background"
                    : "bg-gray-300 text-gray-800"
              } text-xs font-semibold`}
            >
              <span className="text-background">●</span>
            </div>
            <span className="absolute -bottom-5 right-0 translate-x-[25%] whitespace-nowrap text-xs font-semibold text-foreground">
              Step {index + 1}
            </span>
          </div>

          {index !== steps - 1 && (
            <div
              className={`h-0.5 flex-1 ${
                currentStep > index + 1 ? "bg-primary" : "bg-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
