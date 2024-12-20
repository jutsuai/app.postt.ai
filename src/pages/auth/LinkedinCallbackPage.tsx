import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import httpClient from "../../lib/httpClient";
import { AiOutlineLoading } from "react-icons/ai";

export default function LinkedinCallbackPage() {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const code = params.get("code");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!code) return;

    getAccessToken(code);
  }, [code]);

  const getAccessToken = async (code: any) => {
    if (!code) return;

    setLoading(true);

    httpClient()
      .post("/linkedin/callback", { code })
      .then((res) => {
        const data = res.data;
        console.log(data);

        localStorage.setItem("_auth_user", JSON.stringify(data));
        localStorage.setItem("_auth_accessToken", data?.access_token);

        navigate("/");
      })
      .catch((err) => {
        console.error("Error fetching access token:", err);
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      {loading && <AiOutlineLoading className="animate-spin text-6xl" />}

      <p className="text-base">Loading: {loading ? "true" : "false"}</p>
    </div>
  );
}
