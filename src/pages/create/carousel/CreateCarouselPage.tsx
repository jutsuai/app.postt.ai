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
import { useNavigate, useParams } from "react-router-dom";
import LoadingOverlay from "@/components/LoadingOverlay";
import CarouselUpdater from "./_components/CarouselUpdater";
import DateTimeSelectorDialog from "@/dialog/dateTimeSelector/DateTimeSelectorDialog";
import { FaDownload } from "react-icons/fa";

export default function CreateCarouselPage() {
  const navigate = useNavigate();
  const { carouselId } = useParams();
  const { selectedProfile } = useAuth();
  useEffect(() => {
    fetchCarouselById();
  }, []);

  const [fetchLoading, setFetchLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  const [carousel, setCarousel] = useState<any>(null);
  const fetchCarouselById = async () => {
    const url = `/assets/carousels/${carouselId}`;
    setFetchLoading(true);
    httpClient()
      .get(url)
      .then((res) => {
        const data = res.data.data as any;
        console.log("Carousel Data: ", data);
        const { post, carousel } = data;

        setPost(post);
        setCarousel(carousel);

        setSlides(carousel.slides);
        setCustomizations(carousel.customizations);
      })
      .catch((err) => {
        console.error("Error fetching posts: ", err);

        toast.error("Error fetching carousel data");
      })
      .finally(() => {
        setFetchLoading(false);
      });
  };

  const [refreshRefs, setRefreshRefs] = useState(0);
  const [showDateTimeSelectorDialog, setShowDateTimeSelectorDialog] =
    useState(false);

  const [activeTab, setActiveTab] = useState("Content");
  const [prompt, setPrompt] = useState(false);
  const [commentary, setCommentary] = useState("This is a commentary");
  const [slides, setSlides] = useState([]);
  const [customizations, setCustomizations] = useState({});

  //
  const [selectedSlide, setSelectedSlide] = useState(0);

  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = ({ scheduledAt }: { scheduledAt?: Date }) => {
    if (commentary.length < 4) {
      toast.error("Commentary must be at least 5 characters long");
      return;
    }

    setSubmitLoading(true);
    const payload = {
      commentary,
      scheduledAt,

      author: selectedProfile?.linkedinId,
      authorType: selectedProfile?.type,
    };

    httpClient()
      .post(`/posts/${post?._id}/publish`, payload)
      .then((res) => {
        console.log("Post Success", res.data);
        toast.success("Post Successful");

        if (scheduledAt) {
          toast.info("Post scheduled successfully");
        } else {
          toast.success("Post successful");
        }

        navigate("/posts");
      })
      .catch((err) => {
        console.error("Post Error", err);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const [downloadLoading, setDownloadLoading] = useState(false);
  const downloadCarousel = () => {
    setDownloadLoading(true);
    httpClient()
      .get(`/assets/carousels/${carouselId}/download`)
      .then((res) => {
        const data = res.data.data;
        console.log("Generated Success", data);

        const url = data.url;

        console.log("Opening URL: ", url);
        // window.open(url, "_blank");

        // Download the file, itss a pdf
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "carousel.pdf");
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error("Download Error", err);
      })
      .finally(() => {
        setDownloadLoading(false);
      });
  };

  if (fetchLoading) {
    return <LoadingOverlay />;
  }
  const fileUrl =
    "https://s3.us-east-1.amazonaws.com/cdn.postt.ai/linkedin/67810ecbac2ed5cf218bfa61/pdfs/slides_1736697200904.pdf";

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

            <BottomSection
              customizations={customizations}
              slides={slides}
              setSlides={setSlides}
              selectedSlide={selectedSlide}
              setSelectedSlide={setSelectedSlide}
            />
            <div className="flex w-full gap-4">
              <Button
                variant="secondary"
                className="w-full text-foreground"
                onClick={() => setShowDateTimeSelectorDialog(true)}
              >
                Schedule Post
              </Button>
              <Button className="w-full" onClick={() => handleSubmit({})}>
                {submitLoading ? (
                  <VscLoading className="animate-spin" />
                ) : (
                  "Post Now!"
                )}
              </Button>

              <Button
                variant="secondary"
                disabled={downloadLoading}
                onClick={() => downloadCarousel()}
              >
                {downloadLoading ? (
                  <VscLoading className="animate-spin" />
                ) : (
                  <FaDownload className="text-primary" />
                )}
              </Button>
            </div>
          </div>
        </WrapperContent>
      </Wrapper>
      <DateTimeSelectorDialog
        open={showDateTimeSelectorDialog}
        setOpen={() => setShowDateTimeSelectorDialog(false)}
        onClick={(date: any) => {
          handleSubmit({ scheduledAt: date });
        }}
      />
    </>
  );
}
