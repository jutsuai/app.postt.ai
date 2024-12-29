import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import UploadTool from "@/components/UploadTool";
import { cn } from "@/lib/utils";
import PositionStyle from "./PositionStyle";
import { Button } from "@/components/ui/button";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

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

export default function DownloadTab({
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
}: {
  titleEnabled: boolean;
  setTitleEnabled: (value: boolean) => void;
  titleText: string;
  setTitleText: (value: string) => void;
  subtitleEnabled: boolean;
  setSubtitleEnabled: (value: boolean) => void;
  subtitleText: string;
  setSubtitleText: (value: string) => void;
  titlePosition: string;
  setTitlePosition: (value: string) => void;
  subtitlePosition: string;
  setSubtitlePosition: (value: string) => void;
  positionOptions: string[];
}) {
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
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
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
    </div>
  );
}
