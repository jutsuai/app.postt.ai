import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// httpClient()
// .post("/auth/linkedin/userinfo", { accessToken })
// .then((res) => {
//   const user = res.data;
//   console.log(user);
//   localStorage.setItem("_auth_user", JSON.stringify(user));

//   //
//   navigate("/");
// })
// .catch((err) => {
//   console.error("Error fetching user info:", err);
// });

export default function HomePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("_auth_user") || "{}");

      setUser(user);
    } catch (error) {
      localStorage.removeItem("_auth_user");
      localStorage.removeItem("_auth_accessToken");

      console.error("Error fetching user:", error);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-start items-start p-6 h-screen gap-10 bg-white ">
      <div>
        <TitleText />
        <p className="text-black/50 font-medium text-sm">
          Please sign in to your account
        </p>
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-4xl font-bold ">Home Page</h1>
          <p className="text-black/75">This is the home page.</p>
        </div>

        <div>
          <img src="https://source.unsplash.com/800x600/?nature" alt="nature" />
        </div>
      </div>

      <div className="flex gap-4">
        <NavLink to="/login" className="hover:text-purple-800 ">
          Login
        </NavLink>

        <NavLink to="/linkedin" className="hover:text-purple-800 ">
          Linkedin
        </NavLink>
        <NavLink
          to="/linkedin/carousel/create"
          className="hover:text-purple-800 "
        >
          Create Carousel
        </NavLink>
        <NavLink to="/linkedin/post/create" className="hover:text-purple-800 ">
          Create Post
        </NavLink>
      </div>
    </div>
  );
}

const TitleText = () => {
  return (
    <h1 className="text-3xl leading-normal font-semibold text-black">
      Where do you want to <span className="text-indigo-600">post</span>?
    </h1>
  );
};
