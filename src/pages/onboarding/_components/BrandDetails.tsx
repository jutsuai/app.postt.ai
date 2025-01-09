import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import httpClient from "@/lib/httpClient";
import { useAuth } from "@/context/AuthContext";
import { VscLoading } from "react-icons/vsc";

export default function BrandDetails() {
  const { user } = useAuth();
  const [primaryColor, setPrimaryColor] = useState();
  const [accentColor, setAccentColor] = useState();

  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);

    httpClient()
      .put(`/users/${user?._id}/profile`, {
        brandingColors: [primaryColor, accentColor],
      })
      .then((res) => {
        console.log(res.data);
        navigate("/linkedin/connect");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center gap-4 h-full  pt-4">
      {/* <div className="w-full flex flex-col items-center gap-2">
        <h3 className="text-lg font-semibold text-center">
          Upload your brand logo
        </h3>

        <ImageUploading
          multiple={false}
          value={images}
          onChange={onChange}
          maxNumber={1}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            dragProps,
            isDragging,
          }) => (
            <div
              {...dragProps}
              className={cn(
                "flex flex-col items-center transition-all relative duration-200 justify-center border-2 border-dashed rounded-2xl p-10 w-full",
                isDragging && "border-primary-foreground "
              )}
            >
              {!imageList.length ? (
                <div
                  className={cn(
                    "flex flex-col items-center gap-2 transition-all duration-200 justify-center cursor-pointer",
                    isDragging && "scale-105"
                  )}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <FcAddImage className="size-20 opacity-80" />
                  <p className="text-muted-foreground text-sm">
                    Drag your logo here or
                  </p>
                  <p className="font-medium text-sm">Browse</p>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full ">
                  {imageList.map((image, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <Button
                        onClick={onImageRemoveAll}
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2"
                      >
                        <RxCross2 />
                      </Button>
                      <img
                        src={image["data_url"]}
                        alt="Logo"
                        className="w-full  h-full rounded-lg "
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </ImageUploading>
      </div> */}

      <div className="w-full flex flex-col items-center  gap-4">
        <h3 className="text-lg font-semibold text-center">
          Enter Your Brand Color
        </h3>
        <div className="w-full flex flex-col gap-4">
          <BrandColor
            title="Primary"
            color={primaryColor}
            setColor={setPrimaryColor}
            className="h-40"
          />

          <BrandColor
            title="Accent"
            color={accentColor}
            setColor={setAccentColor}
            className="h-24"
          />
        </div>
      </div>
      <Button
        onClick={() => handleSubmit()}
        className="rounded-full w-full mt-auto"
      >
        {loading ? <VscLoading className="animate-spin" /> : "Continue"}
      </Button>
    </div>
  );
}

function BrandColor({
  title,
  color = "#ffffff",
  setColor,
  className,
}: {
  title: string;
  color: any;
  setColor: any;
  className?: string;
}) {
  const [textColor, setTextColor] = useState("#000000");
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = () => {
    if (colorInputRef?.current) {
      colorInputRef?.current?.click();
    }
  };

  useEffect(() => {
    const contrastColor = getContrastColor(color);
    setTextColor(contrastColor);
  }, [color]);

  const handleColorChange = (event: any) => {
    const selectedColor = event?.target?.value;
    setColor(selectedColor);

    const contrastColor = getContrastColor(selectedColor);
    setTextColor(contrastColor);
  };

  const getContrastColor = (hexColor: any) => {
    const color = hexColor.charAt(0) === "#" ? hexColor.substring(1) : hexColor;

    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn("relative p-4 rounded-lg cursor-pointer border", className)}
      style={{
        backgroundColor: color,
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <LuPlus
          className="text-2xl opacity-50"
          style={{
            color: textColor,
          }}
        />
        <p className="text-sm opacity-80" style={{ color: textColor }}>
          {title}
        </p>
      </div>
      <input
        type="color"
        ref={colorInputRef}
        onChange={handleColorChange}
        className="absolute top-0 opacity-0 pointer-events-none"
      />
    </div>
  );
}
