import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/lib/httpClient";
import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ConnectLinkedinPage() {
  const navigate = useNavigate();

  const { validateToken, user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.tokens?.management?.access_token) {
      navigate("/channels/linkedin/connect/success");
    }
  }, [user]);

  const handleSubmit = () => {
    setLoading(true);

    httpClient()
      .get(`/linkedin/api`)
      .then((res) => {
        console.log(res.data);

        // check if  res.data.data is an linkedin url

        if (res.data.data.includes("linkedin.com")) {
          window.location.replace(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-start gap-2 px-4 lg:max-w-md">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Image
          src="/onboarding/social-linkedin.svg"
          alt=""
          className="size-[140px]"
        />

        <div className="flex flex-col items-center gap-2">
          <h3 className="text-center text-lg font-semibold">
            Connect your LinkedIn Profiles
          </h3>

          <p className="-mt-2 text-center text-sm text-muted-foreground">
            Connect your LinkedIn profile to get started
          </p>
        </div>

        <Button
          onClick={() => handleSubmit()}
          className="mt-auto w-full rounded-full"
        >
          {loading ? <VscLoading className="animate-spin" /> : "Connect"}
        </Button>
      </div>
    </div>
  );
}
