import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import httpClient from "@/lib/httpClient";

export default function DownloadTab({
  slides,
  customizations,
  createdBy,
}: {
  slides: any;
  customizations: any;
  createdBy: any;
}) {
  const [loading, setLoading] = useState(false);
  const handleDownloadPDF = () => {
    setLoading(true);

    const data = {
      slides,
      customizations,
      createdBy,
    };

    axios
      .post("http://localhost:8000/api/v1/generators/carousel", data, {
        responseType: "blob", // Important to handle binary data like PDF
      })
      .then((response) => {
        // Create a Blob URL from the response data
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a temporary <a> element to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = "slides_combined.pdf"; // Set the desired filename
        document.body.appendChild(link);
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Clean up the DOM
        window.URL.revokeObjectURL(url); // Release the Blob URL
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [loadingCreate, setLoadingCreate] = useState(false);

  const handleCreateCarousel = () => {
    setLoadingCreate(true);

    const data = {
      slides,
      customizations,
      createdBy,
    };

    httpClient()
      .post("/create/carousel", data)
      .then((res) => {
        console.log("Carousel created successfully: ", res.data);
      })
      .catch((error) => {
        console.error("Error creating carousel: ", error);
      })
      .finally(() => {
        setLoadingCreate(false);
      });
  };

  return (
    <div className="space-y-6 flex-col flex bg-muted shadow-md p-4 border rounded-lg h-full">
      <h3 className="text-base font-semibold">Download</h3>
      {loading && "Generating..."}

      <Button onClick={() => handleCreateCarousel()}>Save carousel</Button>

      <h3 className="text-base font-semibold">Create Carousel</h3>

      {loadingCreate && "Creating carousel..."}

      <Button onClick={() => handleDownloadPDF()}>Download PDF</Button>
    </div>
  );
}
