import { useState } from "react";

export default function BoringImage(props: any) {
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

  const url = `https://placehold.co/${
    rest.size ? `${rest.size * 4}x${rest.size * 4}` : "512x512"
  }@2x/f5f6f8/333333?text=${rest.name || alt}`;

  //   div
  //       className={cn(
  //         rest.size
  //           ? `min-w-${rest.size} min-h-${rest.size}`
  //           : "min-h-16 min-w-16",
  //       )}
  return (
    <>
      {shouldShowAvatar ? (
        <img
          src={url}
          alt={alt || "Avatar"}
          onError={() => setImageError(true)}
          style={{
            width: rest.size,
            height: rest.size,
            objectFit: "cover",
          }}
          className={className}
        />
      ) : (
        <img
          src={src}
          alt={alt || "Avatar"}
          onError={() => setImageError(true)}
          style={{
            width: rest.size,
            height: rest.size,

            objectFit: "cover",
          }}
          className={className}
        />
      )}
    </>
  );
}
