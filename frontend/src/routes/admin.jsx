import { Routes, Route } from "react-router-dom";
import DashboardAdmin from "../pages/admin/dashboard";
import NotFound from "../components/NotFound";

export default function Auth() {

  return (
    <Routes>
      <Route path="dashboard" element={<DashboardAdmin/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
