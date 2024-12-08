import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LinkedInUpload() {
  const [file, setFile] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
      getUserInfo(accessToken);
    }
  }, []);

  const getUserInfo = async (accessToken: any) => {
    console.log("accessToken", accessToken);

    if (!accessToken) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/linkedin/userinfo",
        { accessToken }
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!file || !postContent || !accessToken) {
      setStatusMessage("Please provide all required inputs.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("postContent", postContent);
    formData.append("accessToken", accessToken);
    formData.append("sub", userInfo?.sub); // Replace with LinkedIn user ID.

    try {
      setIsLoading(true);
      setStatusMessage("");
      const response = await axios.post(
        "http://localhost:8000/api/v1/linkedin/post/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setStatusMessage("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      setStatusMessage("Failed to create the post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
    },
    card: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      width: "100%",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#333",
    },
    label: {
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "5px",
      display: "block",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "8px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
    },
    textarea: {
      width: "100%",
      padding: "8px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      resize: "none",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: isLoading ? "#b3d4fc" : "#0073b1",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: isLoading ? "not-allowed" : "pointer",
    },
    status: {
      textAlign: "center",
      marginTop: "10px",
      fontSize: "14px",
    },
    success: {
      color: "green",
    },
    error: {
      color: "red",
    },
    header: {
      textAlign: "center",
      marginBottom: "24px",
    },
    heading: {
      marginBottom: "24px",
      color: "#333",
    },
    link: {
      display: "inline-block",
      marginBottom: "16px",
      textDecoration: "none",
      color: "#0073b1",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link to="/" style={styles.link}>
          ← Back to Home
        </Link>
        <h1 style={styles.heading}>
          LinkedIn Document Upload and Post Example
        </h1>
      </header>

      <span style={styles.label}>{JSON.stringify(userInfo)}</span>

      <div style={styles.card}>
        <h1 style={styles.title}>Upload Document to LinkedIn</h1>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Access Token</label>
          <input
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="Enter LinkedIn Access Token"
            style={styles.input}
            required
          />
          <label style={styles.label}>Post Content</label>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Enter your post content"
            rows={4}
            style={styles.textarea}
            required
          />
          <label style={styles.label}>Upload File</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload and Post"}
          </button>
        </form>
        {statusMessage && (
          <p
            style={{
              ...styles.status,
              ...(statusMessage.includes("success")
                ? styles.success
                : styles.error),
            }}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default LinkedInUpload;

// export default function LinkedinCarouselPage() {
//   return (
//     <div>
//       <h1>Linkedin Carousel Page</h1>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "1rem",
//         }}
//       >
//         <h2>Carousel</h2>
//         <p>Carousel goes here</p>

//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             gap: 32,
//             backgroundColor: "red",
//             width: "100%",

//             paddingInline: 32,
//             justifyContent: "center",
//           }}
//         >
//           <Preview />
//           <Preview />
//         </div>
//       </div>
//     </div>
//   );
// }

// const Preview = () => {
//   return (
//     <div
//       style={{
//         width: 512,
//         aspectRatio: 9 / 16,
//         backgroundColor: "blue",
//         color: "white",

//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       XD
//     </div>
//   );
// };
