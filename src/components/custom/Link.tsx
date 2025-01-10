import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string;
}
export default function Link({ children, href, to, ...others }: AnchorProps) {
  return (
    <RouterLink {...others} to={to ? to : href || ""}>
      {children}
    </RouterLink>
  );
}
