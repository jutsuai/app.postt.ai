import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/lib/httpClient";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export default function AccountType() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [loading, setLoading] = useState<"personal" | "organization" | null>(
    null
  );

  const handleSubmit = (type: any, redirect: string) => {
    setLoading(type);

    httpClient()
      .put(`/users/${user?._id}/profile`, { type })
      .then((res) => {
        console.log(res.data);
        navigate(redirect);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(null);
      });
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full -mt-[2px]">
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
          handleSubmit("personal", "?step=audience");
        }}
        className={cn(
          "w-full mt-4 h-[52px] justify-start active:border-primary hover:border-primary rounded-lg hover:text-foreground hover:bg-primary/20",
          loading !== null && "pointer-events-none",
          loading === "personal" && "bg-primary/20 border-primary"
        )}
        variant="outline"
      >
        Personal
        {loading === "personal" && (
          <VscLoading className="animate-spin ml-auto" />
        )}
      </Button>
      <Button
        onClick={() => {
          handleSubmit("organization", "?step=audience");
        }}
        className={cn(
          "w-full h-[52px] justify-start active:border-primary hover:border-primary rounded-lg hover:text-foreground hover:bg-primary/20",
          loading !== null && "pointer-events-none",
          loading === "organization" && "bg-primary/20 border-primary"
        )}
        variant="outline"
      >
        Organization
        {loading === "organization" && (
          <VscLoading className="animate-spin ml-auto" />
        )}
      </Button>
    </div>
  );
}
