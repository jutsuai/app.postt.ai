import { useMediaQuery } from "@uidotdev/usehooks";

export default function useBreakpoint() {
  const sm = useMediaQuery("(max-width: 640px)");
  const md = useMediaQuery("(max-width: 768px)");
  const lg = useMediaQuery("(max-width: 1024px)");
  const xl = useMediaQuery("(max-width: 1280px)");
  return { sm, md, lg, xl };
}
