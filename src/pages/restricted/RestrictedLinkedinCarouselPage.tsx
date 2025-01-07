import { useEffect, useState } from "react";
import PreviewSection from "../create/carousel/editCarouselPage/_components/PreviewSection";
import { useParams } from "react-router-dom";
import httpClient from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

// const data = {
//   createdBy: {
//     name: "John Doe",
//     username: "john-doe",
//     avatar:
//       "https://plus.unsplash.com/premium_photo-1710799499285-06c416d1dd96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },

//   startSlide: {
//     visible: true,
//     title: "How to create a carousel post on LinkedIn",
//     description: "Learn how to make engaging content.",
//     image:
//       "https://plus.unsplash.com/premium_photo-1671829480432-9b0f10d869ef?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },

//   slides: [
//     {
//       pageIndex: 1,
//       title: "Slide 1",
//       description: "This is the first slide",
//       image:
//         "https://plus.unsplash.com/premium_photo-1671829480432-9b0f10d869ef?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//       pageIndex: 2,
//       title: "Slide 2",
//       description: "This is the second slide",
//       image:
//         "https://plus.unsplash.com/premium_photo-1671829480432-9b0f10d869ef?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//     {
//       pageIndex: 3,
//       title: "Slide 3",
//       description: "This is the third slide",
//       image:
//         "https://plus.unsplash.com/premium_photo-1671829480432-9b0f10d869ef?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     },
//   ],

//   endSlide: {
//     visible: true,
//     title: "Thank you for watching!",
//     description: "Follow me for more content",
//     image:
//       "https://plus.unsplash.com/premium_photo-1671829480432-9b0f10d869ef?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },

//   customizations: {
//     backgroundColor: "#ffffff",
//     fontColor: "#000000",
//     title: {
//       visible: true,
//       horizontal: "center", // left | center | right
//       vertical: "center", // top | center | bottom
//     },
//     description: {
//       visible: true,
//       horizontal: "center", // left | center | right
//       vertical: "center", // top | center | bottom
//     },
//     createdBy: {
//       visible: true,
//       horizontal: "left", // left | center | right
//       vertical: "center", // top | center | bottom
//     },
//   },
// };

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

  return httpClient()
    .get(`/linkedin/carousel/${carouselId}`)
    .then((res) => {
      const data = res.data.data;
      console.log("Carousel Data", data);

      const slide = data.slides[parseInt((slideId as any) || 0)] as any;

      if (!slide) {
        return;
      }

      const output = {
        pageType: slide.pageType,

        createdBy: data.createdBy,
        customizations: data.customizations,
        pageIndex: slideId,
        title: slide.title,
        description: slide.description,
        image: slide.image,
        slides: data.slides,
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
  // const [searchParams, setSearchParams] = useSearchParams();
  // const query = searchParams.get("query") || "";
  //  console.log(query);

  // pageType
  // createdBy
  // customizations
  // pageIndex
  // title
  // description
  // image
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

  console.log(
    "CarouselCarouselCarouselCarouselCarouselCarouselCarousel",
    carousel
  );

  // useEffect(() => {
  //   getCaroselData();
  // }, []);

  // const [loading, setLoading] = useState(false);
  // const [carousel, setCarousel] = useState(null);

  return (
    <PreviewSection
      hideHeader={true}
      hideFooter={true}
      hideArrows={true}
      className="p-0 rounded-none"
      // slides={data.slides}
      {...carousel}
    />
  );
}
