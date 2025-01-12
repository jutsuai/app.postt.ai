import LoadingOverlay from "@/components/LoadingOverlay";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/lib/httpClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InitializeImagePage() {
  const navigate = useNavigate();

  const { selectedProfile } = useAuth();

  useEffect(() => {
    if (!selectedProfile) {
      return;
    }

    initializeCarousel();
  }, [selectedProfile]);

  const initializeCarousel = () => {
    console.log("Initialize Image");
    httpClient()
      .post(`/posts/image`, {
        author: selectedProfile?.linkedinId,
        authorType: selectedProfile?.type,
        commentary: "",
      })
      .then((res) => {
        console.log("image Initialized", res.data);
        const data = res.data.data;
        navigate(`/create/image/${data._id}`);
      })
      .catch((err) => {
        console.error("Image Initialization Error", err);
      })
      .finally(() => {
        console.log("Image Initialization Done");
      });
  };

  return <LoadingOverlay />;
}
