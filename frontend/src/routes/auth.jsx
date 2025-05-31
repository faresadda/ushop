import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import NotFound from "../components/NotFound";

export default function Auth() {

  return (
    <Routes>
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
      <Route path="forgotpassword" element={<ForgotPassword/>} />
      <Route path="resetpassword" element={<ResetPassword />} />
      <Route path="verifyemail" element={<VerifyEmail/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
