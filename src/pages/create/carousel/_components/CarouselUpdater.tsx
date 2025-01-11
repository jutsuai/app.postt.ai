import httpClient from "@/lib/httpClient";
import { useState, useEffect } from "react";
import { FiCircle } from "react-icons/fi";
import { VscLoading } from "react-icons/vsc";
import { useDebouncedCallback } from "use-debounce";

const CarouselUpdater = ({
  slides,
  customizations,
  commentary,
  carousel,
  carouselId,
}: {
  slides: any;
  customizations: any;
  commentary: any;
  carousel: any;
  carouselId: any;
}) => {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Track typing activity

  // Create a debounced version of handleUpdateCarousel
  const debouncedUpdateCarousel = useDebouncedCallback(() => {
    setLoadingUpdate(true);
    setIsTyping(false); // Stop typing animation when the debounce triggers

    httpClient()
      .put(`/assets/carousels/${carouselId}`, {
        commentary,
        slides,
        customizations,
      })
      .then((res) => {
        console.log("Post Success", res.data);
        // navigate("/");
      })
      .catch((err) => {
        console.error("Post Error", err);
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  }, 5000); // Adjust the debounce delay (5000ms) as needed

  useEffect(() => {
    if (!slides || !customizations || !commentary || !carousel) {
      return;
    }

    if (
      slides === carousel?.slides &&
      customizations === carousel?.customizations
    ) {
      return;
    }

    setIsTyping(true); // Show the typing animation immediately
    debouncedUpdateCarousel();
  }, [slides, customizations, commentary, debouncedUpdateCarousel]);

  return (
    <>
      {isTyping && !loadingUpdate && (
        <FiCircle className="absolute left-10 top-10 size-7 animate-pulse text-primary" />
      )}
      {loadingUpdate && (
        <VscLoading className="absolute left-10 top-10 size-8 animate-spin text-primary" />
      )}
    </>
  );
};

export default CarouselUpdater;

// import httpClient from "@/lib/httpClient";
// import { useState, useEffect } from "react";
// import { VscLoading } from "react-icons/vsc";
// import { useDebouncedCallback } from "use-debounce";

// const CarouselUpdater = ({
//   slides,
//   customizations,
//   commentary,
//   carousel,
//   carouselId,
// }: {
//   slides: any;
//   customizations: any;
//   commentary: any;
//   carousel: any;
//   carouselId: any;
// }) => {
//   const [loadingUpdate, setLoadingUpdate] = useState(false);

//   // Create a debounced version of handleUpdateCarousel
//   const debouncedUpdateCarousel = useDebouncedCallback(() => {
//     setLoadingUpdate(true);

//     httpClient()
//       .put(`/assets/carousels/${carouselId}`, {
//         commentary,
//         slides,
//         customizations,
//       })
//       .then((res) => {
//         console.log("Post Success", res.data);
//         // navigate("/");
//       })
//       .catch((err) => {
//         console.error("Post Error", err);
//       })
//       .finally(() => {
//         setLoadingUpdate(false);
//       });
//   }, 500); // Adjust the debounce delay (500ms) as needed

//   useEffect(() => {
//     if (!slides || !customizations || !commentary || !carousel) {
//       return;
//     }

//     if (
//       slides === carousel?.slides &&
//       customizations === carousel?.customizations
//     ) {
//       return;
//     }

//     debouncedUpdateCarousel();
//   }, [slides, customizations, commentary, debouncedUpdateCarousel]);

//   return (
//     loadingUpdate && (
//       <VscLoading className="absolute left-10 top-10 size-8 animate-spin" />
//     )
//   );
// };

// export default CarouselUpdater;
