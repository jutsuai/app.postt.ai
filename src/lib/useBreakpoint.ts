import { useMediaQuery } from "@uidotdev/usehooks";
import { useMemo } from "react";

export default function useBreakpoint() {
  const sm = useMediaQuery("(max-width: 640px)");
  const md = useMediaQuery("(max-width: 768px)");
  const lg = useMediaQuery("(max-width: 1024px)");
  const xl = useMediaQuery("(max-width: 1280px)");

  return useMemo(() => ({ sm, md, lg, xl }), [sm, md, lg, xl]);
}
