// context/AuthContext.jsx
import { createContext, useState, useEffect, useRef } from "react";
import { getToken, saveToken, removeToken, getUser, saveUser, removeUser } from "../utils/storage";
import { fetchUserProfile } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser()); // Initialize from localStorage
  const [loading, setLoading] = useState(true);

  // Track if user data was set via login() to skip redundant fetch
  const userDataFromLoginRef = useRef(null);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        saveToken(token);

        // If we already have user data from login(), use it and skip fetch
        if (userDataFromLoginRef.current) {
          const userData = userDataFromLoginRef.current;
          saveUser(userData); // Persist to localStorage
          setUser(userData);
          userDataFromLoginRef.current = null;
          setLoading(false);
          return;
        }

        // If we have cached user data, use it (don't refetch on every refresh)
        const cachedUser = getUser();
        if (cachedUser) {
          setUser(cachedUser);
          setLoading(false);
          return;
        }

        // Only fetch if no cached user data
        try {
          const userData = await fetchUserProfile(token);
          console.log("Fetched User Data:", userData);
          const userToSave = userData.user || userData;
          saveUser(userToSave); // Persist to localStorage
          setUser(userToSave);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          // Token is likely invalid or expired
          removeToken();
          removeUser();
          setToken(null);
        }
      } else {
        removeToken();
        removeUser();
        setUser(null);
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = (newToken, userData) => {
    userDataFromLoginRef.current = userData; // Store user data to skip fetch
    saveToken(newToken); // Immediately persist to localStorage
    saveUser(userData); // Persist user data too
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    removeUser();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
