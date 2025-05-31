import { useUserContext } from "../context/userContext";
import Profile from "../pages/user/Profile";
import { Navigate } from "react-router-dom";

export default function ProtectedProfile({children}) {
  const { token } = useUserContext();

  if (token) {
    return children
  }
  else{
    return <Navigate to="/account/login" replace />;
}}