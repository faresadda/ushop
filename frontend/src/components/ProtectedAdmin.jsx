import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useEffect } from "react";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const { user, id, token,getUserFunction } = useUserContext();

  useEffect(() => {
    if (id && token ) {
      getUserFunction();
    }
  }, [id, token]);

  if (!user) {
    return <div className="flex items-center justify-center h-screen"><Loader/></div>
  }
  else{
    if (user.data.role === "admin") {
      return children;
   }
  return <Navigate to="/account/login" replace />;
}}