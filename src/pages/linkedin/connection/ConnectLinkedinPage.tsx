import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/lib/httpClient";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { VscLoading } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ConnectLinkedinPage() {
  const navigate = useNavigate();

  const { validateToken, user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.tokens?.management?.access_token) {
      navigate("/linkedin/connect/success");
    }
  }, [user]);

  const handleSubmit = () => {
    setLoading(true);

    httpClient()
      .get(`/linkedin/management`)
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
    <div className="lg:max-w-md w-full h-full flex flex-col gap-2 px-4 items-start ">
      <div className="flex w-full h-full  justify-center flex-col items-center gap-4 ">
        <Image
          src="/onboarding/social-linkedin.svg"
          alt=""
          className="size-[140px]"
        />

        <div className="gap-2 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-center ">
            Connect your LinkedIn Profiles
          </h3>

          <p className="text-muted-foreground text-sm -mt-2 text-center">
            Connect your LinkedIn profile to get started
          </p>
        </div>

        <Button
          onClick={() => handleSubmit()}
          className="w-full rounded-full mt-auto"
        >
          {loading ? <VscLoading className="animate-spin" /> : "Connect"}
        </Button>
      </div>
    </div>
  );
}
