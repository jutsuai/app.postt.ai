import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../lib/httpClient";
import { useAuth } from "../../context/AuthContext";

export default function LinkedinPage() {
  const { linkedin, user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [orgData, setOrgData] = useState<any>();

  useEffect(() => {
    fetchLinkedInPosts();
  }, []);

  const fetchLinkedInPosts = async () => {
    const { accessToken, sub } = linkedin;

    if (!accessToken) {
      console.error("Access token not found. Please log in.");
      return;
    }

    setLoading(true);

    httpClient()
      .post("/linkedin/get-posts", { accessToken, sub })
      .then((res) => {
        const posts = res.data;
        console.log("LinkedIn Posts:", posts);

        // Optionally, set posts in state for rendering
        // setPosts(posts);
      })
      .catch((err) => {
        console.error("Error fetching LinkedIn posts:", err);
        // Optionally handle navigation or error state
        // navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetOrgData = async () => {
    const {
      tokens: { access_token: accessToken },
      id: sub,
    } = user;

    if (!accessToken) {
      console.error("Access token not found. Please log in.");
      return;
    }

    setLoading(true);

    console.log("accessToken", accessToken);

    console.log("Hi from get posts");

    httpClient()
      .get("/linkedin/organizations?accessToken=" + accessToken)
      .then((res) => {
        console.log("res", res.data);
        setOrgData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex  flex-col p-4 gap-4">
      <div className="flex gap-4 ">
        <Link to="/login">
          <button className="inline-flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium">
            Login
          </button>
        </Link>
        <Link to="/linkedin/post/create">
          <button className="inline-flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium">
            Create Post
          </button>
        </Link>

        <Link to="/linkedin/carousel/create">
          <button className="inline-flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium">
            Create Carousel
          </button>
        </Link>

        <button
          className="inline-flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium"
          onClick={() => handleGetOrgData()}
        >
          handleGetOrgData
        </button>
      </div>
      -------------------------------------
      {JSON.stringify(orgData)}
      -------------------------------------
      <div>
        <button
          className="inline-flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium"
          onClick={() => fetchLinkedInPosts()}
        >
          Fetch LinkedIn Posts
        </button>
      </div>
    </div>
  );
}
