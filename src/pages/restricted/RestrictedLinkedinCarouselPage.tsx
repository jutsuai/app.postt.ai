import { CarouselPreview } from "../../components/preview";
import { useParams } from "react-router-dom";
import httpClient from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";
import LoadingOverlay from "@/components/LoadingOverlay";

const getCaroselData = ({
  carouselId,
  slideId,
}: {
  carouselId: any;
  slideId: any;
}) => {
  console.log("Carousel ID", carouselId);

  if (!carouselId) {
    return;
  }
  const url = `/assets/carousels/${carouselId}`;
  console.log("Carousel URL", url);
  return httpClient()
    .get(url)
    .then((res) => {
      const data = res.data.data;
      const { carousel } = data;

      const slide = carousel.slides[parseInt((slideId as any) || 0)] as any;

      if (!slide) {
        return;
      }

      console.log("slideslideslideslide Data", slide);

      const output = {
        slide: slide,
        createdBy: carousel?.createdBy,
        customizations: carousel?.customizations,
        slides: carousel?.slides,
      } as any;

      console.log("Carousel Output", output);

      return output;
    })
    .catch((err) => {
      console.error("Carousel Data Error", err);

      return null;
    });
};

export default function RestrictedLinkedinCarouselPage() {
  const { carouselId, slideId } = useParams();

  const {
    data: carousel,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["carousel", carouselId, slideId],
    queryFn: () => getCaroselData({ carouselId, slideId }),
  });

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingOverlay />; // You can replace this with a spinner or other loading indicator
  }

  // Handle error if the API call fails
  if (error) {
    return <div>Error loading carousel data.</div>; // Show error message
  }
  return (
    <CarouselPreview
      slide={carousel?.slide}
      slides={carousel?.slides}
      selectedSlide={slideId}
      createdBy={{
        name: `${carousel?.createdBy?.firstName} ${carousel?.createdBy?.lastName}`,
        logo: carousel?.createdBy?.avatar,
        slug: carousel?.createdBy?.email,
      }}
      customizations={carousel?.customizations}
      hideArrows={true}
    />
  );
}
