import { Button } from "@/components/ui/button";
import httpClient from "@/lib/httpClient";
import { useState } from "react";
import { toast } from "sonner";

export default function ConnectLinkedinSuccessPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);

    httpClient()
      .post(`/linkedin/management/organizationList`)
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

  return (
    <div className="container mx-auto my-10 flex w-full justify-center flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-center ">LinkedIn Connected</h3>

      <p className="text-muted-foreground text-sm -mt-2 text-center">
        Your LinkedIn profile has been successfully connected
      </p>

      <div className="gap-2 flex flex-col items-center">
        <img
          src="/onboarding/social-linkedin.svg"
          alt=""
          className="size-[140px]"
        />
      </div>

      <Button
        onClick={() => handleSubmit()}
        className="w-full rounded-full mt-4"
      >
        Fetch Organization List {loading && "loading..."}
      </Button>
    </div>
  );
}
