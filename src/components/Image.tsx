import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export default function Image(props: ImageProps) {
  return <img {...props} loading="lazy" />;
}
