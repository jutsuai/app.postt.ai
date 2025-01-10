import { useState } from "react";

export default function BoringAvatar(props: any) {
  const { src, alt, className, ...rest } = props;
  const [imageError, setImageError] = useState(false);

  const shouldShowAvatar = !src || imageError;

  /*
    <Avatar
      colors={["#1bd9fe", "#574ce3", "#ffffff", "#020817", "#C20D90"]}
      variant="beam"
      {...rest}
      className={className}
    />
  */
  return (
    <div>
      {shouldShowAvatar ? (
        <img
          src={`https://placehold.co/512x512@2x/6842ff/ffffff?text=${(rest.name || alt)?.charAt(0)}`}
          alt={alt || "Avatar"}
          onError={() => setImageError(true)}
          style={{
            // width: "100%",
            // height: "100%",
            width: rest.size,
            height: rest.size,

            objectFit: "cover",
            borderRadius: "50%",
          }}
          className={className}
        />
      ) : (
        <img
          src={src}
          alt={alt || "Avatar"}
          onError={() => setImageError(true)}
          style={{
            // width: "100%",
            // height: "100%",
            width: rest.size,
            height: rest.size,

            objectFit: "cover",
            borderRadius: "50%",
          }}
          className={className}
        />
      )}
    </div>
  );
}
