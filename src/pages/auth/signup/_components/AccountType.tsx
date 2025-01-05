import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/lib/httpClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountType({ setValue }: { setValue: any }) {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (type: string, redirect: string) => {
    setLoading(true);

    httpClient()
      .put(`/users/${user?._id}/profile`, { type })
      .then((res) => {
        console.log(res.data);
        setValue("type", type);
        navigate(redirect);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
          handleSubmit("personal", "?step=audience");
        }}
        className="w-full mt-4 h-[52px] justify-start active:border-primary hover:border-primary rounded-lg hover:text-foreground hover:bg-primary/20"
        variant="outline"
      >
        Personal {loading && "loading..."}
      </Button>
      <Button
        onClick={() => {
          handleSubmit("organization", "?step=audience");
        }}
        className="w-full h-[52px] justify-start active:border-primary hover:border-primary rounded-lg hover:text-foreground hover:bg-primary/20"
        variant="outline"
      >
        Organization {loading && "loading..."}
      </Button>
    </div>
  );
}
