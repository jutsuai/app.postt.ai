import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { useCarosel } from "../context/CreateCaroselContext";
import httpClient from "@/lib/httpClient";
import { useState } from "react";
import axios from "axios";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column", // Adjusting the layout to column for readability
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});

// PDF Document Component
const MyDocument = ({
  titleText,
  subtitleText,
  titlePosition,
  subtitlePosition,
}: {
  titleText: string;
  subtitleText: string;
  titlePosition: string;
  subtitlePosition: string;
}) => (
  <Document>
    {/* Set the page size to 512x512 */}
    <Page size={[512, 512]} style={styles.page}>
      {/* Title Section */}
      <View style={{ ...styles.section, textAlign: titlePosition }}>
        <Text style={styles.title}>{titleText}</Text>
      </View>

      {/* Subtitle Section */}
      <View style={{ ...styles.section, textAlign: subtitlePosition }}>
        <Text style={styles.subtitle}>{subtitleText}</Text>
      </View>
    </Page>
  </Document>
);

export default function DownloadTab() {
  const {
    titleEnabled,
    setTitleEnabled,
    titleText,
    setTitleText,
    subtitleEnabled,
    setSubtitleEnabled,
    subtitleText,
    setSubtitleText,
    titlePosition,
    setTitlePosition,
    subtitlePosition,
    setSubtitlePosition,
    positionOptions,
    slides,
    previewIndex,
    setSlides,
  }: any = useCarosel();

  const [loading, setLoading] = useState(false);
  const handleDownloadPDF = () => {
    setLoading(true);

    const data = {
      title: "titleText",
      subtitle: "subtitleText",
      backgroundImageUrl:
        "https://images.unsplash.com/photo-1629649095671-46de327d1734?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };

    // // Make the API request
    // httpClient()
    //   .post("/generators/carousel", data, { responseType: "blob" }) // Use "blob" to handle binary data
    //   .then((response) => {
    //     // Create a URL for the binary data
    //     const blob = new Blob([response.data], { type: "image/png" });
    //     const url = URL.createObjectURL(blob);

    //     // Create a temporary link element
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = "generated.png"; // File name for the downloaded PNG
    //     document.body.appendChild(link);
    //     link.click(); // Trigger the download
    //     link.remove(); // Clean up the link element
    //   })
    //   .catch((error) => {
    //     console.error("Error downloading PNG:", error);
    //   })
    //   .finally(() => {
    //     setLoading(false); // Hide the loading state
    //   });

    axios
      .post("http://localhost:8000/api/v1/generators/carousel", data, {
        responseType: "blob",
      }) // Use "blob" to handle binary data
      .then((response) => {
        // // Create a URL for the binary data
        // const blob = new Blob([response.data], { type: "image/png" });
        // const url = URL.createObjectURL(blob);
        // // Create a temporary link element
        // const link = document.createElement("a");
        // link.href = url;
        // link.download = "generated.png"; // File name for the downloaded PNG
        // document.body.appendChild(link);
        // link.click(); // Trigger the download
        // link.remove(); // Clean up the link element
      })
      .catch((error) => {
        console.error("Error downloading PNG:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    //   httpClient()
    //     .post("/generators/carousel", data, { responseType: "blob" })
    //     .then((res) => {
    //       const blob = new Blob([res.data], { type: "application/pdf" });
    //       const url = URL.createObjectURL(blob);
    //       const link = document.createElement("a");
    //       link.href = url;
    //       link.download = "generated.pdf";
    //       document.body.appendChild(link);
    //       link.click();
    //       link.remove();
    //     })
    //     .catch((err) => {
    //       console.error("====== handleDownloadPDF error: ", err);
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // };
  };

  return (
    <div className="space-y-6 bg-muted shadow-md p-4 border rounded-lg h-full">
      <h3 className="text-base font-semibold">Download</h3>

      {/* Input fields for Title and Subtitle */}
      <div className="space-y-2">
        <label className="text-sm">Enable Title</label>
        <Switch
          checked={titleEnabled}
          onChange={() => setTitleEnabled(!titleEnabled)}
        />

        {titleEnabled && (
          <>
            <Input
              value={slides[previewIndex].title}
              onChange={(e) => {
                const newSlides = [...slides];
                newSlides[previewIndex] = {
                  ...newSlides[previewIndex],
                  title: e.target.value,
                };
                setSlides(newSlides);
              }}
              placeholder="Enter Title"
            />
            <select
              value={titlePosition}
              onChange={(e) => setTitlePosition(e.target.value)}
              className="w-full p-2"
            >
              {positionOptions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </>
        )}

        <label className="text-sm">Enable Subtitle</label>
        <Switch
          checked={subtitleEnabled}
          onChange={() => setSubtitleEnabled(!subtitleEnabled)}
        />

        {subtitleEnabled && (
          <>
            <Input
              value={subtitleText}
              onChange={(e) => setSubtitleText(e.target.value)}
              placeholder="Enter Subtitle"
            />
            <select
              value={subtitlePosition}
              onChange={(e) => setSubtitlePosition(e.target.value)}
              className="w-full p-2"
            >
              {positionOptions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      {/* Download Button */}
      <div className="space-y-2">
        <PDFDownloadLink
          document={
            <MyDocument
              titleText={titleText}
              subtitleText={subtitleText}
              titlePosition={titlePosition}
              subtitlePosition={subtitlePosition}
            />
          }
          fileName="downloaded-document.pdf"
        >
          {({ loading }) =>
            loading ? (
              <Button disabled>Loading...</Button>
            ) : (
              <Button>Download PDF</Button>
            )
          }
        </PDFDownloadLink>
      </div>
      <Button onClick={() => handleDownloadPDF()}>Download PDF</Button>
    </div>
  );
}
