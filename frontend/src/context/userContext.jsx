import { createContext, useContext, useState } from "react";
import { getUser } from "../service/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext();
export const useUserContext = () => {
  return useContext(UserContext);
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(localStorage.getItem("id") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getUserFunction = async () => {
    if (token && id) {
      const res = await getUser(id, token);
      if (res && res.status === "success") {
        setUser(res);
        return res
      } else {
        setUser(null);
        return null
      }
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    setId(null);
    setToken(null);
    setConfirmation(false);
    navigate("/login");
    toast.success("Account logged out");
  };

  const [confirmation, setConfirmation] = useState(false);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        id,
        setId,
        token,
        setToken,
        isLoading,
        setIsLoading,
        getUserFunction,
        logOut,
        confirmation,
        setConfirmation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
