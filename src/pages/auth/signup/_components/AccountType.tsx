import Image from "@/components/Image";
import { Button } from "@/components/ui/button";

export default function AccountType({
  setValue,
  navigate,
}: {
  setValue: any;
  navigate: any;
}) {
  return (
    <div className="flex pt-4 flex-col items-center gap-3">
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
          setValue("accountType", "personal");
          navigate("?onboarding=audience");
        }}
        className="w-full mt-4 h-11 justify-start active:border-primary hover:border-primary rounded-lg hover:text-foreground hover:bg-primary/20"
        variant="outline"
      >
        Personal
      </Button>
      <Button
        onClick={() => {
          setValue("accountType", "business");
          navigate("?onboarding=audience");
        }}
        className="w-full  h-11 justify-start active:border-primary hover:border-primary rounded-lg hover:text-foreground hover:bg-primary/20"
        variant="outline"
      >
        Business
      </Button>
    </div>
  );
}