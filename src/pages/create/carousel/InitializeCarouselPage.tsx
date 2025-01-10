import LoadingOverlay from "@/components/LoadingOverlay";
import { useAuth } from "@/context/AuthContext";
import httpClient from "@/lib/httpClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InitializeCarouselPage() {
  const navigate = useNavigate();

  const { selectedProfile } = useAuth();

  useEffect(() => {
    if (!selectedProfile) {
      return;
    }

    initializeCarousel();
  }, [selectedProfile]);

  const initializeCarousel = () => {
    console.log("Initialize Carousel");
    httpClient()
      .post(`/posts/carousel`, {
        author: selectedProfile?.linkedinId,
        authorType: selectedProfile?.type,
      })
      .then((res) => {
        console.log("Carousel Initialized", res.data);
        const data = res.data.data;
        navigate(`/create/carousel/${data.carouselId}`);
      })
      .catch((err) => {
        console.error("Carousel Initialization Error", err);
      })
      .finally(() => {
        console.log("Carousel Initialization Done");
      });
  };

  return <LoadingOverlay />;
}
