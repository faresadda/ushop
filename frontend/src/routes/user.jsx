import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Home from "../pages/user/Home";
import Categories from "../pages/user/Categories";
import Products from "../pages/user/Products";
import Shop from "../pages/user/Shop";
import Cart from "../pages/user/Cart";
import Profile from "../pages/user/Profile";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import NotFound from "../components/NotFound";
import { useUserContext } from "../context/userContext";
import Favorites from "../pages/user/Favorites";
import Options from "../pages/user/Options"
import Confirmation from "../components/Confirmation";
import ProtectedProfile from "../components/ProtectedProfile";
import Brands from "../pages/user/Brands";

export default function User() {
  const {token,confirmation,setConfirmation,logOut}=useUserContext()

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            {confirmation && <Confirmation 
                isOpen={()=>{return null}}
                onClose={()=>{setConfirmation(false)}}
                onConfirm={()=>{logOut()}}
                message='Do you want to sign out ?'
            />}
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
        <Route path="products" element={<Products />} />
        <Route path="shop" element={<Shop />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="profile" element={
          <ProtectedProfile>
            <Profile />
          </ProtectedProfile>
        } />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
