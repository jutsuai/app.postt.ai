import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../lib/httpClient";

export default function LinkedinPage() {
  const accessToken = localStorage.getItem("_auth_accessToken");
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState<any>();

  const handleUserData = async () => {
    setLoading(true);

    console.log("accessToken", accessToken);

    httpClient()
      .post("/auth/linkedin/userinfo", { accessToken })
      .then((res) => {
        console.log("res", res.data);
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [orgData, setOrgData] = useState<any>();

  const handleGetOrgData = async () => {
    setLoading(true);

    console.log("accessToken", accessToken);

    httpClient()
      .post("/auth/linkedin/getOrg", { accessToken })
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
      </div>

      <button
        className="inline-flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium"
        onClick={() => handleUserData()}
      >
        Get user data
      </button>

      <div className="flex items-center gap-2">
        {/* Create a user card with userinfo */}

        <img
          src={userInfo?.picture}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />

        <div>
          <p className="text-lg font-semibold">{userInfo?.name}</p>
          <p className="text-sm text-gray-800">{userInfo?.email}</p>
        </div>
      </div>

      {JSON.stringify(userInfo)}

      <button
        className="inline-flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition font-medium"
        onClick={() => handleGetOrgData()}
      >
        handleGetOrgData
      </button>
      {JSON.stringify(orgData)}
    </div>
  );
}
