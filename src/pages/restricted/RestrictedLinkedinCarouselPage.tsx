import PreviewSection from "../../components/preview";
import { useParams } from "react-router-dom";
import httpClient from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

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
    carousel,
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
      className="rounded-none p-0"
      // slides={data.slides}
      {...carousel}
    />
  );
}
