import { CreateCaroselProvider } from "./context/CreateCaroselContext";
import CreateCarouselPage from "./CreateCarouselPage";

export default function CreateCarouselLayout() {
  const title = "How to create a carousel post on LinkedIn";
  const description = "Learn how to make engaging content.";
  const image = "https://example.com/start-image.jpg";

  return (
    <CreateCaroselProvider>
      <CreateCarouselPage />
    </CreateCaroselProvider>
  );
}
