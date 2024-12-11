import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider = ({ children }: { children: any }) => {
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<any>(null);
  const [linkedin, setLinkedin] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoadingCheck(true);

      const usr = localStorage.getItem("_auth_user");
      const userCookie = usr ? JSON.parse(usr) : null;

      console.log("userCookie", userCookie);

      setUser(userCookie);
      setLinkedin(userCookie?.linkedin);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsAuthenticated(false);
    } finally {
      setLoadingCheck(false);
    }
  };

  const value: any = {
    loadingCheck,
    loading,

    isAuthenticated,
    accessToken,
    user,
    linkedin,
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
