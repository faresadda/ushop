import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Home from "../pages/user/Home";
import Categories from "../pages/user/Categories";
import Products from "../pages/user/Products";
import Product from "../pages/user/Product";
import Cart from "../pages/user/Cart";
import Profile from "../pages/user/Profile";
import Checkout from "../pages/user/Checkout";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "../components/NotFound";
import Favorites from "../pages/user/Favorites";
import Options from "../pages/user/Options";
import ProtectedProfile from "../components/ProtectedProfile";
import Brands from "../pages/user/Brands";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";

export default function User() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={
          <>
            <Navbar />
            <Outlet />
            <Footer />
          </>
        }
      >
        <Route
          index
          element={
            <>
              <Home />
              <Categories />
              <Brands />
              <Products />
              <Options />
            </>
          }
        />
        <Route path="cart" element={<Cart />} />
        <Route path="products" element={<Products style="hidden" />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="favorites" element={<Favorites />} />
        <Route
          path="profile"
          element={
            <ProtectedProfile>
              <Profile />
            </ProtectedProfile>
          }
        />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      <Route path="login" element={<Login/>} />
      <Route path="register" element={<Register/>} />
      <Route path="forgotpassword" element={<ForgotPassword/>} />
      <Route path="resetpassword" element={<ResetPassword />} />
      <Route path="verifyemail" element={<VerifyEmail/>} />
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
}
