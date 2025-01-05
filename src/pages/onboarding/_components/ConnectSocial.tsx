import Image from "@/components/Image";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

export default function ConnectSocial() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("?step=brand");
  };
  return (
    <div className="flex w-full justify-center flex-col items-center gap-4">
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
