import ContentTab from "./_components/ContentTab";
import SettingsTab from "./_components/SettingsTab";
import PreviewSection from "../../../components/preview";
import Wrapper from "@/components/wrapper/Wrapper";
import WrapperContent from "@/components/wrapper/WrapperContent";
import BottomSection from "./_components/BottomSection";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import httpClient from "@/lib/httpClient";
import { toast } from "sonner";
import { RxText } from "react-icons/rx";
import { IoIosSettings } from "react-icons/io";
import { VscLoading } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import LoadingOverlay from "@/components/LoadingOverlay";
import CarouselUpdater from "./_components/CarouselUpdater";

export default function CreateCarouselPage() {
  const { selectedProfile } = useAuth();
  const { carouselId } = useParams();

  const [fetchLoading, setFetchLoading] = useState(true);
  const [carousel, setCarousel] = useState<any>(null);
  const [commentary, setCommentary] = useState("This is a commentary");

  const [slides, setSlides] = useState([]);
  const [customizations, setCustomizations] = useState({});

  useEffect(() => {
    fetchCarouselById();
  }, []);

  const fetchCarouselById = async () => {
    const url = `/assets/carousels/${carouselId}`;
    setFetchLoading(true);
    httpClient()
      .get(url)
      .then((res) => {
        const data = res.data.data as any;

        setCarousel(data);
        setSlides(data.slides);
        setCustomizations(data.customizations);
      })
      .catch((err) => {
        console.error("Error fetching posts: ", err);

        toast.error("Error fetching carousel data");
      })
      .finally(() => {
        setFetchLoading(false);
      });
  };

  //
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("Content");

  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = () => {
    const linkedinId = selectedProfile?.linkedinId;

    setSubmitLoading(true);

    httpClient()
      .post(`/linkedin/profiles/${linkedinId}/post/carousel`, {
        commentary,
        slides,
        customizations,
      })
      .then((res) => {
        console.log("Post Success", res.data);
        toast.success("Post Successful");
        // navigate("/");
      })
      .catch((err) => {
        console.error("Post Error", err);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

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

    handleUpdateCarousel();
  }, [slides, customizations, commentary]);

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const handleUpdateCarousel = () => {
    setLoadingUpdate(true);

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
  };

  if (fetchLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Wrapper>
        <WrapperContent className="h-full flex-row gap-8">
          <PreviewSection
            slides={slides}
            setSlides={setSlides}
            selectedSlide={selectedSlide}
            setSelectedSlide={setSelectedSlide}
            //
            customizations={customizations}
            createdBy={selectedProfile}
            //
            commentary={commentary}
            setCommentary={setCommentary}
            //
            type={"carousel"}
          />

          <CarouselUpdater
            slides={slides}
            customizations={customizations}
            commentary={commentary}
            carousel={carousel}
            carouselId={carouselId}
          />
          {/* {loadingUpdate && (
            <VscLoading className="absolute left-10 top-10 size-10 animate-spin" />
          )} */}

          <div className="flex h-full w-full max-w-md flex-col gap-4 px-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {activeTab === "Content"
                  ? "Generate Carousel"
                  : activeTab === "Customization" && "Customization"}
              </h3>
              <div className="flex items-center rounded-3xl bg-muted p-1">
                <button
                  className={cn(
                    "flex w-12 items-center justify-center rounded-3xl p-2 px-4",
                    activeTab === "Content"
                      ? "border bg-background"
                      : "bg-muted",
                  )}
                  onClick={() => setActiveTab("Content")}
                >
                  <RxText className="text-sm" />
                </button>
                <button
                  className={cn(
                    "flex w-12 items-center justify-center rounded-3xl p-2 px-4",
                    activeTab === "Customization"
                      ? "border bg-background"
                      : "bg-muted",
                  )}
                  onClick={() => setActiveTab("Customization")}
                >
                  <IoIosSettings className="text-sm" />
                </button>
              </div>
            </div>

            {activeTab === "Content" && (
              <ContentTab
                slides={slides}
                setSlides={setSlides}
                selectedSlide={selectedSlide}
                //
                customizations={customizations}
                setCustomizations={setCustomizations}
              />
            )}

            {activeTab === "Customization" && (
              <SettingsTab
                commentary={commentary}
                setCommentary={setCommentary}
              />
            )}
            {/* {activeTab === "Download" && (
              <DownloadTab
                slides={slides}
                customizations={customizations}
                createdBy={createdBy}
              />
            )} */}

            <BottomSection
              customizations={customizations}
              slides={slides}
              setSlides={setSlides}
              selectedSlide={selectedSlide}
              setSelectedSlide={setSelectedSlide}
            />
            <div className="flex w-full gap-4">
              <Button variant="secondary" className="w-full text-foreground">
                Schedule Post
              </Button>
              <Button className="w-full" onClick={() => handleSubmit()}>
                {submitLoading ? (
                  <VscLoading className="animate-spin" />
                ) : (
                  "Post Now!"
                )}
              </Button>
            </div>
          </div>
        </WrapperContent>
      </Wrapper>
    </>
  );
}

// const handleSaveCarouselPost = () => {
//   const linkedinId = selectedProfile?.linkedinId;

//   setShowSelectProfileDialog(false);
//   setLoading(true);

//   httpClient()
//     .post(`/assets/carousels`, {
//       commentary,
//       slides,
//       customizations,
//     })
//     .then((res) => {
//       console.log("Post Success", res.data);
//       toast.success("Post Successful");
//       // navigate("/");
//     })
//     .catch((err) => {
//       console.error("Post Error", err);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// };
