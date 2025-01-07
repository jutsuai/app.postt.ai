import React from "react";
import PreviewSection from "../create/carousel/editCarouselPage/_components/PreviewSection";
import { useSearchParams } from "react-router-dom";

const data = {
  createdBy: {
    name: "John Doe",
    username: "john-doe",
    avatar:
      "https://plus.unsplash.com/premium_photo-1710799499285-06c416d1dd96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  startSlide: {
    visible: true,
    title: "How to create a carousel post on LinkedIn",
    description: "Learn how to make engaging content.",
    image:
      "https://plus.unsplash.com/premium_photo-1671829480432-9b0f10d869ef?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  slides: [
    {
      pageIndex: 1,
      title: "Slide 1",
      description: "This is the first slide",
      image:
        "https://plus.unsplash.com/premium_photo-1671829480432-9b0f10d869ef?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      pageIndex: 2,
      title: "Slide 2",
      description: "This is the second slide",
      image:
        "https://plus.unsplash.com/premium_photo-1671829480432-9b0f10d869ef?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      pageIndex: 3,
      title: "Slide 3",
      description: "This is the third slide",
      image:
        "https://plus.unsplash.com/premium_photo-1671829480432-9b0f10d869ef?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],

  endSlide: {
    visible: true,
    title: "Thank you for watching!",
    description: "Follow me for more content",
    image:
      "https://plus.unsplash.com/premium_photo-1671829480432-9b0f10d869ef?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  customizations: {
    backgroundColor: "#ffffff",
    fontColor: "#000000",
    title: {
      visible: true,
      horizontal: "center", // left | center | right
      vertical: "center", // top | center | bottom
    },
    description: {
      visible: true,
      horizontal: "center", // left | center | right
      vertical: "center", // top | center | bottom
    },
    createdBy: {
      visible: true,
      horizontal: "left", // left | center | right
      vertical: "center", // top | center | bottom
    },
  },
};

export default function RestrictedLinkedinCarouselPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const query = searchParams.get("query") || "";
  //  console.log(query);

  // pageType
  // createdBy
  // customizations
  // pageIndex
  // title
  // description
  // image

  const pageType = searchParams.get("pageType");
  const createdBy = searchParams.get("createdBy") || "";
  const customizations = searchParams.get("customizations") || "";
  const pageIndex = searchParams.get("pageIndex") || "";
  const title = searchParams.get("title") || "";
  const description = searchParams.get("description") || "";
  const image = searchParams.get("image") || "";

  console.log(pageType);
  console.log(createdBy);

  return (
    <PreviewSection
      className="p-0 rounded-none"
      // //
      // pageType="slide" // start | end | slide
      // createdBy={data.createdBy}
      // customizations={data.customizations}
      // //
      // pageIndex={data.slides[0].pageIndex}
      // // title={data.slides[0].title}
      // title={data.startSlide?.title}
      // description={data.slides[0].description}
      // image={data.slides[0].image}
      //

      //
      //
      //

      pageType={pageType}
      createdBy={JSON.parse(createdBy || "{}")}
      customizations={JSON.parse(customizations || "{}")}
      pageIndex={pageIndex}
      title={title}
      description={description}
      image={image}

      //
      // pageType="slide" // start | end | slide
      // createdBy={data.createdBy}
      // customizations={data.customizations}
      // //
      // pageIndex={data.slides[0].pageIndex}
      // // title={data.slides[0].title}
      // title={data.startSlide?.title}
      // description={data.slides[0].description}
      // image={data.slides[0].image}
    />
  );
}
