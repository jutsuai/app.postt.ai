import React from "react";
import Navbar from "../Navbar";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-dvh w-dvw">
      {children}
      <Navbar />
    </div>
  );
}
