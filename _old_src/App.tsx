import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

function App() {
  return (
    <BrowserRouter>
      {/* <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        height: "100vh",
        width: "100vw",
      }}
    > */}
      <Router />
      {/* <LoginButton />
      --
      <Dashboard /> */}
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
