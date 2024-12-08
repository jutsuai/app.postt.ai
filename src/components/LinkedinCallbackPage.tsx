import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function LinkedinCallbackPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const code = params.get("code");

  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const [userInfo, setUserInfo] = useState(null);
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, [code]);

  const getAccessToken = async (code) => {
    if (!code) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/linkedin/accessToken",
        { code }
      );
      const data = response.data;
      localStorage.setItem("accessToken", data);
      setAccessToken(data);
    } catch (error) {
      console.error("Error fetching access token:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserInfo = async () => {
    if (!accessToken) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/linkedin/userinfo",
        { accessToken }
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  const postToLinkedin = async (e) => {
    e.preventDefault();

    if (!accessToken || !userInfo?.sub) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/v1/auth/linkedin/post", {
        accessToken,
        postContent,
        sub: userInfo?.sub,
      });
      setPostContent("");
    } catch (error) {
      console.error("Error posting to LinkedIn:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link to="/" style={styles.link}>
          ← Back to Home
        </Link>
        <h1 style={styles.heading}>LinkedIn Callback Page</h1>
      </header>

      <main>
        <section style={styles.section}>
          <h2 style={styles.subHeading}>Authorization Code</h2>
          <p style={{ ...styles.code, ...styles.scrollable }}>
            {code || "No code available"}
          </p>
          <button style={styles.button} onClick={() => getAccessToken(code)}>
            Get Access Token
          </button>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>Access Token</h2>
          <p style={{ ...styles.info, ...styles.scrollable }}>
            {accessToken || "No access token available"}
          </p>
          <button style={styles.button} onClick={getUserInfo}>
            Get User Info
          </button>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>User Info</h2>
          <p style={{ ...styles.info, ...styles.scrollable }}>
            {userInfo ? JSON.stringify(userInfo) : "No user info available"}
          </p>
        </section>

        <section style={styles.postSection}>
          <h2 style={styles.subHeading}>Post to LinkedIn</h2>
          <form onSubmit={postToLinkedin} style={styles.form}>
            <textarea
              style={styles.textarea}
              placeholder="Write your LinkedIn post here..."
              rows={5}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <button type="submit" style={styles.button}>
              Post to LinkedIn
            </button>
          </form>
        </section>

        {loading && (
          <div style={styles.loaderContainer}>
            <p style={styles.loading}>Loading...</p>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2024 LinkedIn Integration App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "16px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  link: {
    display: "inline-block",
    marginBottom: "16px",
    textDecoration: "none",
    color: "#0073b1",
    fontSize: "16px",
  },
  heading: {
    marginBottom: "24px",
    color: "#333",
  },
  section: {
    marginBottom: "24px",
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
  },
  postSection: {
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f1f8ff",
  },
  subHeading: {
    marginBottom: "12px",
    fontSize: "18px",
    color: "#0073b1",
  },
  code: {
    fontFamily: "monospace",
    backgroundColor: "#eee",
    padding: "8px",
    borderRadius: "4px",
    display: "inline-block",
    wordBreak: "break-word",
  },
  scrollable: {
    maxWidth: "100%",
    overflowX: "auto",
  },
  info: {
    marginBottom: "12px",
    fontSize: "14px",
    color: "#555",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#0073b1",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonHover: {
    backgroundColor: "#005f8c",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  textarea: {
    marginBottom: "12px",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    resize: "none",
    fontSize: "14px",
  },
  loading: {
    textAlign: "center",
    color: "#0073b1",
    fontSize: "16px",
    fontWeight: "bold",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
  },
  footer: {
    textAlign: "center",
    marginTop: "24px",
    padding: "16px",
    backgroundColor: "#0073b1",
    color: "#fff",
    borderRadius: "8px",
  },
  footerText: {
    fontSize: "14px",
  },
};

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useNavigate, useSearchParams } from "react-router-dom";

// export default function LinkedinCallbackPage() {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   const code = params.get("code");

//   const [loading, setLoading] = useState<boolean>(false);
//   const [accessToken, setAccessToken] = useState<string | null>(null);

//   console.log("----------", code);

//   useEffect(() => {
//     // getAccessToken(code);

//     const at = localStorage.getItem("accessToken");

//     if (at) {
//       setAccessToken(at);
//     }
//   }, [code]);

//   const getAccessToken = async (code: string | null) => {
//     if (!code) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/v1/auth/linkedin/accessToken",
//         { code }
//       );

//       const data = response.data;
//       localStorage.setItem("accessToken", data);

//       setAccessToken(data);
//     } catch (error) {
//       console.log("===========> ", error);
//       //   navigate("/");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [userInfo, setUserInfo] = useState<any>(null);
//   const getUserInfo = async (code: string | null) => {
//     if (!accessToken) {
//       console.log("No access token");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/v1/auth/linkedin/userinfo",
//         { accessToken }
//       );

//       setUserInfo(response.data);
//     } catch (error) {
//       console.log("===========> ", error);
//       //   navigate("/");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [postContent, setPostContent] = useState<string>("");

//   const postToLinkedin = async (e: any) => {
//     e.preventDefault();

//     if (!accessToken) {
//       console.log("No access token");
//       return;
//     }

//     if (!userInfo?.sub) {
//       console.log("No sub");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/v1/auth/linkedin/post",
//         {
//           accessToken,
//           postContent,
//           sub: userInfo?.sub,
//         }
//       );

//       setPostContent("");
//     } catch (error) {
//       console.log("===========> ", error);
//       //   navigate("/");
//     } finally {
//       setLoading(false);
//     }
//   };

//   //   const getAccessToken = async (code: string | null) => {
//   //     if (!code) {
//   //       return;
//   //     }

//   //     setLoading(true);

//   //     try {
//   //       const response = await axios.post(
//   //         "http://localhost:8000/api/v1/auth/linkedin/callback",
//   //         { code }
//   //       );

//   //       console.log("===========> ", response.data);

//   //       setAccessToken(response.data.accessToken);
//   //     } catch (error) {
//   //       console.log("===========> ", error);
//   //       //   navigate("/");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   return (
//     <div
//       style={{
//         padding: 16,
//         border: "1px solid black",

//         margin: 16,
//       }}
//     >
//       <Link to="/">Go Back</Link>
//       <br />
//       <br />
//       Linkedin Callback Page -----
//       <div>
//         <h3>Code:</h3>
//         <p>{code}</p>
//       </div>
//       <br />
//       -----
//       <br />
//       <div>
//         <h3>Access Token:</h3>
//         <p>{JSON.stringify(accessToken)}</p>
//         <button onClick={() => getAccessToken(code)}>Get Access Token</button>
//       </div>
//       <br />
//       -----
//       <br />
//       <div>
//         <h3>User Info:</h3>
//         <p>{JSON.stringify(userInfo)}</p>
//         <button onClick={() => getUserInfo(code)}>Get UserInfo</button>
//       </div>
//       <br />
//       -----
//       <br />
//       {loading && <p>Loading...</p>}
//       -----
//       <div
//         style={{
//           border: "1px solid black",
//           padding: "10px",
//           margin: "10px",
//         }}
//       >
//         <h3>Post to LinkedIn</h3>

//         <form onSubmit={postToLinkedin}>
//           <textarea
//             placeholder="Write your LinkedIn post here..."
//             rows={5}
//             style={{ width: "100%", marginBottom: "10px" }}
//             value={postContent}
//             onChange={(e) => setPostContent(e.target.value)}
//           />
//           <button type="submit">Post to LinkedIn</button>
//         </form>
//       </div>
//       -----
//     </div>
//   );
// }
