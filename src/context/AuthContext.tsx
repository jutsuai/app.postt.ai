import httpClient from "@/lib/httpClient";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider = ({ children }: { children: any }) => {
  const navigate = useNavigate();

  const [loadingCheck, setLoadingCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
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

      console.log("userCookie", userCookie);

      if (!userCookie) {
        setIsAuthenticated(false);
        setLoadingCheck(false);
        return;
      }

      setUser(userCookie);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsAuthenticated(false);
    } finally {
      setLoadingCheck(false);
    }
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

  const saveUserData = async (data: any) => {
    setLoading(true);

    try {
      setUser(data);
      setProfile(data.profile);
      setAccessToken(data.accessToken);

      localStorage.setItem("_auth_user", JSON.stringify(data));
      localStorage.setItem("_auth_accessToken", data.accessToken);

      setIsAuthenticated(true);

      console.log("User data saved");
    } catch (error) {
      console.error("Error saving user data:", error);

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      localStorage.removeItem("_auth_user");
      localStorage.removeItem("_auth_accessToken");

      setUser(null);
      setProfile(null);
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

    //
    saveUserData,
    logout,

    //
    loginWithEmail,
    signupWithEmail,
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
