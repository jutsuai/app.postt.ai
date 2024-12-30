import React from "react";
import PreviewSection from "../linkedin/createCarouselPage/_components/PreviewSection";
import { CreateCaroselProvider } from "../linkedin/createCarouselPage/context/CreateCaroselContext";

export default function RestrictedLinkedinCarouselPage() {
  return (
    <CreateCaroselProvider>
      <PreviewSection className="p-0" />
    </CreateCaroselProvider>
  );
}
