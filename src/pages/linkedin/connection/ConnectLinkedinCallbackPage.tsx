import { useEffect, useRef, memo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { VscLoading } from "react-icons/vsc";
import httpClient from "@/lib/httpClient";

function ConnectLinkedinCallbackPage() {
  const navigate = useNavigate();
  // const { linkedinCallback } = useAuth();

  const [loading, setLoading] = useState(false);

  const linkedinCallback = async (code: any) => {
    setLoading(true);

    httpClient()
      .post("/linkedin/api/callback", { code })
      .then((res) => {
        navigate("/linkedin/connect/success");
      })
      .catch((err) => {
        console.log("====== linkedinCallback error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  // Ref to prevent duplicate calls
  const callbackCalled = useRef(false);

  useEffect(() => {
    if (code && !callbackCalled.current) {
      console.log("LinkedIn code:", code);
      linkedinCallback(code);
      callbackCalled.current = true;
    } else if (error) {
      toast.error("Invalid request", {
        description: "The request is invalid. Please try again.",
      });
      navigate("/login");
    }
  }, [code, error, linkedinCallback]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <VscLoading size={24} className="size-20 animate-spin" />
    </div>
  );
}

export default ConnectLinkedinCallbackPage;
