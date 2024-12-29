import { CreateCaroselProvider } from "./context/CreateCaroselContext";
import CreateCarouselPage from "./CreateCarouselPage";

export default function CreateCarouselLayout() {
  return (
    <CreateCaroselProvider>
      <CreateCarouselPage />
    </CreateCaroselProvider>
  );
}
