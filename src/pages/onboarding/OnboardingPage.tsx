import { Button } from "@/components/ui/button";
import Image from "../../components/Image";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const socials = [
  {
    title: "Facebook",
    icon: "/onboarding/icons/facebook.svg",
    isConnected: false,
  },
  {
    title: "Twitter",
    icon: "/onboarding/icons/twitter.svg",
    isConnected: true,
  },
  {
    title: "Instagram",
    icon: "/onboarding/icons/instagram.svg",
    isConnected: false,
  },
  {
    title: "LinkedIn",
    icon: "/onboarding/icons/linkedin.svg",
    isConnected: false,
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/onboarding/finished");
  };
  return (
    <div className="flex flex-col w-full items-center ">
      <div className="my-8 flex items-center gap-2">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`w-6 h-2 rounded ${
              index === step ? "bg-primary" : "bg-muted"
            }`}
          ></div>
        ))}
      </div>

      {step === 0 ? (
        <Image src="/onboarding/phone-images.svg" alt="" className="w-full" />
      ) : step === 1 ? (
        <Image
          src="/onboarding/phone-image-single.svg"
          alt=""
          className="w-full"
        />
      ) : (
        <div className="mr-auto px-4 overflow-y-auto h-[calc(100dvh-170px)] flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">Link your accounts</h3>
          <p className="text-sm text-muted-foreground">
            Connect your platforms to handle scheduling and publishing across
            all your favorite networks.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {socials.map((social, index) => (
              <LinkCard
                key={index}
                title={social.title}
                icon={social.icon}
                isConnected={social.isConnected}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 bg-background flex flex-col w-full p-8 gap-8">
        {step === 0 ? (
          <h1 className="text-2xl font-semibold">
            Your automated{" "}
            <span className="text-primary">content creation</span> companion!
            plan, create, and publish content.
          </h1>
        ) : step === 1 ? (
          <h1 className="text-2xl font-semibold">
            <span className="text-primary">Save your time</span> with Jutsu.
            Collaborate, create faster, and publish smarter.
          </h1>
        ) : null}
        <div className="flex flex-col gap-4 -mb-4">
          <Separator />
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => handleSubmit()}>
              Skip
            </Button>
            <Button
              variant="ghost"
              onClick={() => (step < 3 ? setStep(step + 1) : handleSubmit())}
            >
              {step < 2 ? "Next" : "Finish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkCard({
  title,
  icon,
  onClick,
  isConnected,
}: {
  title: string;
  icon: string;
  onClick: () => void;
  isConnected?: boolean;
}) {
  return (
    <div className="flex flex-col shadow-md rounded-xl gap-2 p-4 bg-muted">
      <div className="p-2 bg-background rounded-xl w-fit">
        <Image src={icon} alt="" className="size-7" />
      </div>
      <p className="text-sm font-semibold">{title}</p>

      <Button
        className={cn(
          "w-full rounded-lg",
          isConnected ? "bg-primary text-white" : "bg-background"
        )}
        variant="outline"
        size="sm"
        onClick={onClick}
      >
        {isConnected ? "Connected" : "Connect"}
      </Button>
    </div>
  );
}
