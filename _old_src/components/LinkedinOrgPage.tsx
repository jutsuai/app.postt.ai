import axios from "axios";
import React, { useEffect, useState } from "react";

export default function LinkedinOrgPage() {
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken") as any;
    if (storedToken) {
      setAccessToken(storedToken);
      getAccessToken(storedToken);
    }
  }, []);

  const getAccessToken = async (code: any) => {
    if (!code) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/linkedin/org",
        { accessToken: code }
      );
      const data = response.data;
      console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching access token:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {accessToken && <p>Access Token: {accessToken}</p>}

      <button onClick={() => getAccessToken(accessToken)}>
        Get Access Token
      </button>
    </div>
  );
}
