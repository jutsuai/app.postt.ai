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
        others.onChange({
          url: `https://ipfs.near.social/ipfs/${res.data.cid}`,
          name: file.name,
          fileType: file.type,
        });

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
        <div className="mb-1 flex w-full items-center justify-between">
          <label className="text-sm font-medium">{label}</label>

          <label
            className="cursor-pointer text-xs font-semibold text-foreground/75 hover:text-foreground"
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
              className="group mt-1"
            >
              {!dzConfig?.multiple && files.length > 0 ? null : (
                <FileInput className="rounded-lg border bg-background">
                  <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
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
                className="mt-6 h-10 w-full gap-2 text-background"
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
            className="mt-1 w-full bg-background"
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
