import { Routes, Route } from "react-router-dom";
import User from "./routes/user";
import Admin from "./routes/admin";
import NotFound from "./components/NotFound";
import ProtectedAdmin from "./components/ProtectedAdmin";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <>
            <ToastContainer position="top-center" autoClose={2000} limit={3} />
            <User />
          </>
        }
      />

      <Route
        path="admin/*"
        element={
          <ProtectedAdmin>
            <Admin />
            <ToastContainer position="top-center" autoClose={2000} limit={3} />
          </ProtectedAdmin>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
