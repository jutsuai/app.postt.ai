import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="h-dvh w-dvw">
      <Outlet />
    </div>
  );
}
