import useBreakpoint from "@/lib/useBreakpoint";
import TopBar from "./TopBar";
import HeaderSearch from "./HeaderSearch";

export default function Header() {
  const { sm } = useBreakpoint();
  return (
    <div className="flex flex-col gap-4">
      <TopBar />
      <div className="flex sm:hidden flex-col gap-4">
        <h1 className="text-4xl font-normal mt-4 leading-tight">
          <span className="text-muted-foreground">Hello,</span>
          <br />
          <span className="font-semibold"> Adnan</span>
        </h1>
        <HeaderSearch />
      </div>
    </div>
  );
}
