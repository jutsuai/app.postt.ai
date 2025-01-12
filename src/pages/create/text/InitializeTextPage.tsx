import LoadingOverlay from "@/components/LoadingOverlay";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/lib/httpClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InitializeTextPage() {
  const navigate = useNavigate();

  const { selectedProfile } = useAuth();

  useEffect(() => {
    if (!selectedProfile) {
      return;
    }

    initializeCarousel();
  }, [selectedProfile]);

  const initializeCarousel = () => {
    console.log("Initialize Text");
    httpClient()
      .post(`/posts/text`, {
        author: selectedProfile?.linkedinId,
        authorType: selectedProfile?.type,
        commentary: "",
      })
      .then((res) => {
        console.log("text Initialized", res.data);
        const data = res.data.data;
        navigate(`/create/text/${data._id}`);
      })
      .catch((err) => {
        console.error("Text Initialization Error", err);
      })
      .finally(() => {
        console.log("Text Initialization Done");
      });
  };

  return <LoadingOverlay />;
}
