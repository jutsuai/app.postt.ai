import Image from "@/components/Image";
import { Button } from "@/components/ui/button";

export default function ConnectSocial({ navigate }: { navigate: any }) {
  const handleSubmit = () => {
    navigate("/auth/signup/onboard-success");
  };
  return (
    <div className="flex pt-4 w-96  flex-col items-center gap-4">
      <Image
        src="/onboarding/social-linkedin.svg"
        alt=""
        className="size-[140px]"
      />
      <h3 className="text-lg font-semibold text-center w-dvw">
        Great, let's connect your
        <br /> Linkedin account
      </h3>

      <Button
        onClick={() => handleSubmit()}
        className="w-full rounded-full mt-4"
      >
        Connect
      </Button>
    </div>
  );
}