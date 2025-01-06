import { useState } from "react";
import Avatar from "boring-avatars";

export default function BoringAvatar(props: any) {
  const { src, alt, ...rest } = props;
  const [imageError, setImageError] = useState(false);

  // Determine if we should display the image or the avatar
  const shouldShowAvatar = !src || imageError;

  return shouldShowAvatar ? (
    <Avatar
      colors={["#1bd9fe", "#574ce3", "#ffffff", "#020817", "#C20D90"]}
      variant="beam"
      {...rest}
    />
  ) : (
    <img
      src={src}
      alt={alt || "Avatar"}
      onError={() => setImageError(true)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "50%",
      }}
    />
  );
}
