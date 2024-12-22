import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import httpClient from "@/lib/httpClient";
import { useState } from "react";

import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/file-uploader";
import { IoMdCloudUpload } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { AiOutlineLoading } from "react-icons/ai";
import FileSvgDraw from "./svg/FileSvgDraw";
import { Input } from "@/components/ui/input";

export default function UploadTool(props) {
  const {
    label,
    showCloseButton,
    onCloseButtonClick,
    multiline,
    dropZoneConfig,
    ...others
  } = props;

  const dzConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: false,

    ...dropZoneConfig,
  };

  const [uploadView, setUploadView] = useState(true);

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleUpload = async () => {
    const file = files[0];

    if (!file) {
      toast.warning("No file selected");
      return;
    }

    setLoading(true);

    await httpClient()
      .post("https://ipfs.near.social/add", file, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Image uploaded successfully");
        others.onChange(`https://ipfs.near.social/ipfs/${res.data.cid}`);

        setFiles([]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error uploading file");
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="mt-2 flex flex-col items-start justify-between">
        <div className="flex items-center mb-1 justify-between w-full">
          <label className="text-sm font-medium">{label}</label>

          <label
            className="text-xs text-foreground/75 font-semibold cursor-pointer hover:text-foreground"
            onClick={() => setUploadView((e) => !e)}
          >
            {uploadView ? "URL" : "Upload"}
          </label>
        </div>

        {uploadView ? (
          <>
            <FileUploader
              value={files}
              onValueChange={setFiles}
              dropzoneOptions={dzConfig}
              className="mt-1 group"
            >
              {!dzConfig?.multiple && files.length > 0 ? null : (
                <FileInput className="bg-background rounded-lg border">
                  <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full">
                    <FileSvgDraw />
                  </div>
                </FileInput>
              )}

              <FileUploaderContent>
                {files &&
                  files.length > 0 &&
                  files.map((file, i) => (
                    <FileUploaderItem
                      key={i}
                      index={i}
                      className="hover:text-foreground"
                    >
                      <GrAttachment />

                      <span>
                        {file?.name?.length > 25
                          ? `${file?.name?.slice(0, 25)}...`
                          : file?.name}
                      </span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>

            {files.length > 0 && (
              <Button
                disabled={loading}
                className="w-full mt-2 gap-2 text-foreground"
                onClick={handleUpload}
              >
                {loading ? (
                  <div className="animate-spin">
                    <AiOutlineLoading className="size-4" />
                  </div>
                ) : (
                  <>
                    <IoMdCloudUpload className="size-4" />
                    Upload
                  </>
                )}
              </Button>
            )}
          </>
        ) : (
          <Input
            type="text"
            className="w-full mt-1 bg-background"
            placeholder={others?.placeholder}
            value={others?.value}
            onChange={(e) => others?.onChange(e.target.value)}
          />
        )}

        {/* {showCloseButton && (
          <Button
            size="icon"
            variant="ghost"
            className="size-4"
            onClick={() => onCloseButtonClick()}
          >
            <IoClose className="size-3 hover:cursor-pointer hover:text-red-600" />
          </Button>
        )} */}
      </div>
    </div>
  );
}
