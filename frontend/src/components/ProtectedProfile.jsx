import { useUserContext } from "../context/userContext";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedProfile({children}) {
  const { id,token,user,getUserFunction } = useUserContext();
  useEffect(() => {
    if (id && token ) {
      getUserFunction();
    }
  }, [id, token]);

  if (user && user.data) {
    return children
  }
  else{
    return <Navigate to="/account/login" replace />;
}}