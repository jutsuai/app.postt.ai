// components/LoginPage.js

import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        height: "100dvh",
        width: "100dvw",
      }}
    >
      <Link to="/linkedin/org">
        <button>LinkedIn Org</button>
      </Link>

      <Link to="/linkedin/carousel">
        <button>LinkedIn Carousel</button>
      </Link>

      <Link to="/auth/linkedin">
        <button>LinkedIn Callback</button>
      </Link>

      <br />

      <a href="http://localhost:8000/api/v1/auth/linkedin">
        <button>Login with LinkedIn</button>
      </a>
    </div>
  );
};

export default LoginPage;
