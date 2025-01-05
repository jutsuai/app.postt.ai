// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./others.css";
import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(<App />);
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
