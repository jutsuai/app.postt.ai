// components/PostForm.js
import { useState } from "react";
import axios from "axios";

const PostForm = () => {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/post", // Your backend API endpoint
        { content: postContent },
        { withCredentials: true } // Pass cookies for authentication
      );
      alert("Post successful!");
      setPostContent(""); // Clear the input field
    } catch (err) {
      console.error(err);
      alert("Failed to post to LinkedIn.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Write your LinkedIn post here..."
        rows="5"
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button type="submit">Post to LinkedIn</button>
    </form>
  );
};

export default PostForm;
