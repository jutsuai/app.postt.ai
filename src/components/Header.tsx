import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="h-full max-h-16 min-h-16 px-4 flex justify-between items-center">
      <div>
        <Link to="/">Home</Link>
      </div>

      <div>
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="text-base font-semibold">{user?.name}</p>
              <p className="text-sm font-normal text-black/75">{user?.email}</p>
            </div>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
