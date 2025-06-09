import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import NotFound from "../components/NotFound";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminProfile from "../pages/admin/AdminProfile";
import AdminProducts from "../pages/admin/AdminProducts";
import AddProduct from "../pages/admin/AddEditProduct";
import Users from "../pages/admin/Users";
import Admins from "../pages/admin/Admins";

export default function Admin() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <AdminLayout />
          </>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="updateproduct/:id" element={<AddProduct />} />
        <Route path="users" element={<Users />} />
        <Route path="admins" element={<Admins />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
