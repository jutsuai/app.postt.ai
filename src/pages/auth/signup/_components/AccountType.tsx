import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AccountType({ setValue }: { setValue: any }) {
  const navigate = useNavigate();
  return (
    <div className="flex pt-6 flex-col items-center gap-4 sm:max-w-md">
      <Image
        src="/onboarding/account-type.svg"
        alt=""
        className="size-[140px]"
      />
      <h3 className="text-lg font-semibold">Choose your Account Type</h3>
      <p className="text-muted-foreground text-sm -mt-2 text-center">
        Create your account and collaborate multi-agent content creators
      </p>

      <Button
        onClick={() => {
          setValue("type", "personal");
          navigate("?onboarding=audience");
        }}
        className="w-full mt-4 h-[52px] justify-start active:border-primary hover:border-primary rounded-lg hover:text-foreground hover:bg-primary/20"
        variant="outline"
      >
        Personal
      </Button>
      <Button
        onClick={() => {
          setValue("type", "organization");
          navigate("?onboarding=audience");
        }}
        className="w-full h-[52px] justify-start active:border-primary hover:border-primary rounded-lg hover:text-foreground hover:bg-primary/20"
        variant="outline"
      >
        Organization
      </Button>
    </div>
  );
}
