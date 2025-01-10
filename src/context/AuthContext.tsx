import httpClient from "@/lib/httpClient";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider = ({ children }: { children: any }) => {
  const navigate = useNavigate();

  const [loadingCheck, setLoadingCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [user, setUser] = useState<any>(null);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [linkedinProfiles, setLinkedinProfiles] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<any>(null);

  // const [linkedin, setLinkedin] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoadingCheck(true);

      const usr = localStorage.getItem("_auth_user");
      const userCookie = usr ? JSON.parse(usr) : null;

      if (!userCookie?._id) {
        setIsAuthenticated(false);
        setLoadingCheck(false);

        toast.error("User not found");

        logout();
        return;
      }

      const token = localStorage.getItem("_auth_accessToken");
      if (!token || token === "null" || token === "undefined") {
        setIsAuthenticated(false);
        setLoadingCheck(false);

        toast.error("Access token not found");

        logout();
        return;
      }

      getLinkedinProfiles();
      setUser(userCookie);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsAuthenticated(false);
    } finally {
      setLoadingCheck(false);
    }
  };

  // Validate toke
  const validateToken = async (userId: string) => {
    if (!user?._id) {
      console.log("No user id found.");

      toast.warning("User id not found. Please login again.");
      return;
    }

    console.log("Validating token...");

    httpClient()
      .get(`/users/${user?._id}`)
      .then((res) => {
        const data = res.data.data;

        setUser(data);

        localStorage.setItem("_auth_user", JSON.stringify(data));
      })
      .catch((err) => {
        console.log("Token is invalid.", err);
        logout();
      });
  };

  const signupWithEmail = async (data: any) => {
    setLoading(true);

    httpClient()
      .post("/auth/signup", data)
      .then((res) => {
        const data = res.data;
        console.log("====== signupWithEmail: ", data);

        saveUserData(data);

        navigate("/");
      })
      .catch((err) => {
        console.log("====== signupWithEmail error: ", err);

        alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);

    httpClient()
      .post("/auth/login", { email, password })
      .then((res) => {
        const data = res.data;
        console.log("====== loginWithEmail: ", data);

        saveUserData(data);

        navigate("/");
      })
      .catch((err) => {
        console.log("====== loginWithEmail error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginWithLinkedin = async () => {
    setLoading(true);

    httpClient()
      .get("/auth/linkedin")
      .then((res) => {
        const authUrl = res.data?.data;

        window.location.replace(authUrl);
      })
      .catch((err) => {
        console.log("====== loginWithLinkedin error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const linkedinCallback = async (code: any) => {
    setLoading(true);

    httpClient()
      .post("/auth/linkedin/callback", { code })
      .then((res) => {
        const data = res.data;
        console.log("====== linkedinCallback: ", data);

        saveUserData(data);

        if (data?.data?.onboarding?.step1) {
          navigate("/");
        } else {
          navigate("/onboarding");
        }
      })
      .catch((err) => {
        console.log("====== linkedinCallback error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveUserData = async (responce: any) => {
    setLoading(true);

    try {
      setUser(responce?.data);
      setAccessToken(responce?.token);

      if (!responce?.token) {
        toast.error("User token not found");

        logout();
        return;
      }

      if (!responce?.data?._id) {
        toast.error("User data not found");

        logout();
        return;
      }

      localStorage.setItem("_auth_user", JSON.stringify(responce?.data));
      localStorage.setItem("_auth_accessToken", responce?.token);

      setIsAuthenticated(true);
      console.log("User data saved");
    } catch (error) {
      console.error("Error saving user data:", error);

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const getLinkedinProfiles = async () => {
    setLoading(true);

    httpClient()
      .get("/linkedin/profiles")
      .then((res) => {
        const data = res.data.data;

        setLinkedinProfiles(data);

        if (selectedProfile === null && data.length > 0) {
          setSelectedProfile(data[0]);
        }
      })
      .catch((err) => {
        console.log("====== getLinkedinProfiles error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);

    try {
      localStorage.removeItem("_auth_user");
      localStorage.removeItem("_auth_accessToken");

      setUser(null);
      setAccessToken(null);

      setIsAuthenticated(false);

      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const value: any = {
    loadingCheck,
    loading,

    isAuthenticated,
    accessToken,
    user,

    selectedProfile,
    setSelectedProfile,
    linkedinProfiles,

    //
    validateToken,
    saveUserData,
    logout,

    //
    loginWithEmail,
    signupWithEmail,
    loginWithLinkedin,
    linkedinCallback,
    getLinkedinProfiles,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
