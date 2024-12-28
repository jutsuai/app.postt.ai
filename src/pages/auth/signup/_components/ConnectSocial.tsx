import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ConnectSocial() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/signup/onboard-success");
  };
  return (
    <div className="flex h-[80dvh] sm:h-auto sm:pt-6  max-w-md  justify-center flex-col items-center gap-4">
      <Image
        src="/onboarding/social-linkedin.svg"
        alt=""
        className="size-[140px]"
      />
      <h3 className="text-lg font-semibold text-center ">
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
