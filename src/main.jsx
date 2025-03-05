import { StrictMode} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cg from "./components/Cg";
import Prod from "./components/Prod";
import Cus from "./components/Cus";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useReducer,useRef } from "react";
import phone2 from "../public/phone2.png";
import phones3 from "../public/phones3.png";
import phones4 from "../public/phones4.png";
import pc2 from "../public/pc2.png";
import pc3 from "../public/pc3.png";
import pc4 from "../public/pc4.png";
import forn2 from "../public/forn2.png";
import forn3 from "../public/forn3.png";
import forn4 from "../public/forn4.png";
import clothes2 from "../public/clothes2.png";
import clothes3 from "../public/clothes3.png";
import clothes4 from "../public/clothes4.png";
import shoes2 from "../public/shoes2.png";
import shoes3 from "../public/shoes3.png";
import shoes4 from "../public/shoes4.png";
import elec2 from "../public/elec2.png";
import elec3 from "../public/elec3.png";
import elec4 from "../public/elec4.png";
import acc2 from "../public/acc2.png";
import acc3 from "../public/acc3.png";
import acc4 from "../public/acc4.png";
import Login from "./components/Login";
import Shop from "./components/Shop";
import { MdDomainVerification } from "react-icons/md";
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

export default function App() {
  const [data, setData] = useState([
    {
      id:0,
      src: phone2,
      prod: "iphone 13 pro",
      price: 472.0,
      sold: "117",
      old: 590.0,
      dis: 20,
      cg: "phones",
      ship: 10.53,
      detail:
        'Apple iPhone 13 Pro 13pro 128/256/512GB/1TB ROM 6GB RAM 6.1" Super Retina OLED A15 IOS Face ID NFC Unlocked 5G 98% New Cellphone',
    },
    {
      id:1,
      src: phones3,
      prod: "120W Fast Charging",
      price: 2.44,
      sold: "+5000",
      old: 3.94,
      dis: 38,
      cg: "phones",
      ship: 0.59,
      detail:
        "120W Fast Charging 4 Ports Mobile Phone Charger QC3.0 USB Type C Chargers Dual PD Wall Adapter EU/US/UK Plug for iPhone15 Xiaomi",
    },
    {
      id:2,
      src: phones4,
      prod: "200000mAh Power Bank",
      price: 9.11,
      sold: "521",
      old: 18.21,
      dis: 50,
      cg: "phones",
      ship: 12.27,
      detail:
        "200000mAh Power Bank 120W Super Fast Charger Battery Large Capacity Digital Display Power Bank For Iphone Samsung Huawei Xiaomi",
    },
    {
      id:3,
      src: pc2,
      prod: "AKPAD-Windows 10 11 Pro",
      price: 403.59,
      sold: "137",
      old: 593.52,
      dis: 32,
      cg: "computer",
      ship: 99.4,
      detail:
        "AKPAD-Windows 10 11 Pro Gaming IPS Laptop, 4700U Max Ram 32GB Rom 2TB SSD Metal Computer, 5G WiFi, Bluetooth, AMD Ryzen 7",
    },
    {
      id:4,
      src: pc3,
      prod: "Gaming Keyboard",
      price: 20.51,
      sold: "117",
      old: 590,
      dis: 20,
      cg: "computer",
      ship: 0,
      detail:
        "K617 RGB USB Mini Mechanical Gaming Keyboard Red Switch 61 Keys Wired detachable cable,portable for travel",
    },
    {
      id:5,
      src: pc4,
      prod: "AMD New Ryzen 7 5700X",
      price: 175.89,
      sold: "+1000",
      old: 274.85,
      dis: 36,
      cg: "computer",
      ship: 30.19,
      detail:
        "AMD New Ryzen 7 5700X R7 5700X 3.4GHz 8 Core 16 Thread CPU Processor 7NM L3=32M Socket AMD AM4 Gaming processador",
    },
    {
      id:6,
      src: forn2,
      prod: "Modern Nordic Dressing Chair",
      price: 70.0,
      sold: "2",
      old: 114.76,
      dis: 39,
      cg: "forniture",
      ship: 19.6,
      detail:
        "Modern Nordic Dressing Chair Velvet Home Living Room Dining Chairs Bedroom Furniture Makeup Stool Nail Chair",
    },
    {
      id:7,
      src: forn3,
      prod: "Tall Arched Cabinet",
      price: 106.85,
      sold: "+1050",
      old: 267.12,
      dis: 60,
      cg: "forniture",
      ship: 84.91,
      detail:
        '71" Tall Arched Cabinet, 5-Tier Arched Bookcase Storage Display Cabinet with Doors and Shelves，for Living Room , Natural Oak',
    },
    {
      id:8,
      src: forn4,
      prod: "Simple Folding Table",
      price: 68.25,
      sold: "402",
      old: 89.81,
      dis: 24,
      cg: "forniture",
      ship: 0,
      detail:
        "Simple Folding Table Dormitory Writing Study Table and Chair Single Dining Table Dining Rectangular Computer Desk Modern Wood",
    },
    {
      id:9,
      src: clothes2,
      prod: "Men's Jeans Japanese Vintage",
      price: 12.0,
      sold: "193",
      old: 27.9,
      dis: 57,
      cg: "clothes",
      ship: 0,
      detail:
        "Spring Autumn New Men's Jeans Japanese Vintage Elastic Waist Casual Straight-leg Pants Trendy Wide-leg Trousers Loose Fit",
    },
    {
      id:10,
      src: clothes3,
      prod: "Men's fashion hoodie",
      price: 19.62,
      sold: "369",
      old: 37.03,
      dis: 47,
      cg: "clothes",
      ship: 0,
      detail:
        "Men's new fashion hoodie, Casual Daily Drawstring Hooded Sweatshirt Street View Print, front kangaroo pocket, men's jacket",
    },
    {
      id:11,
      src: clothes4,
      prod: "T-shirt Summer",
      price: 7.9,
      sold: "130",
      old: 18.38,
      dis: 57,
      cg: "clothes",
      ship: 0,
      detail:
        "Trendy 2023 Men's Ice Silk Short Sleeve T-shirt Summer Printed Half Sleeve Body Confort Base Layer Top Serious Wear",
    },
    {
      id:12,
      src: shoes2,
      prod: "Summer New Men's Low-Top Skateboard Shoes",
      price: 26.28,
      sold: "983",
      old: 55.92,
      dis: 53,
      cg: "shoes",
      ship: 0,
      detail:
        "2024 Summer New Men's Low-Top Skateboard Shoes Youth Student Online Sports Niche Shoes Live Broadcast Men's Shoes",
    },
    {
      id:13,
      src: shoes3,
      prod: "Mary Janes Shoes",
      price: 7.8,
      sold: "14",
      old: 12.0,
      dis: 35,
      cg: "shoes",
      ship: 17.89,
      detail:
        "2025 Spring Autumn Women Double Buckle Mary Janes Shoes Patent Leather Dress Square Head Square Heel Solid Color Women's Shoes",
    },
    {
      id:14,
      src: shoes4,
      prod: "Men's leather canvas shoes",
      price: 27.4,
      sold: "8",
      old: 58.31,
      dis: 53,
      cg: "shoes",
      ship: 10.75,
      detail:
        "Men's leather canvas shoes men's board shoes with breathable shoes trend shoes Korean version casual shoes men's leather shoes",
    },
    {
      id:15,
      src: elec2,
      prod: "Waterproof Smart Watch",
      price: 9.94,
      sold: "+1000",
      old: 26.26,
      dis: 62,
      cg: "electronics",
      ship: 0,
      detail:
        "1.83'' Waterproof Smart Watch with Message Answer Call Sleep Monitoring Sports Pedometer Information Alerts For iPhone Android",
    },
    {
      id:16,
      src: elec3,
      prod: "4K Digital Camera",
      price: 68.56,
      sold: "+1000",
      old: 120.28,
      dis: 43,
      cg: "electronics",
      ship: 0,
      detail:
        "4K Digital Camera for Photography and 18X Digital Zoom Camera 64MP Compact Vlogging Camera 3'' 180° Flip Screen with Flash",
    },
    {
      id:17,
      src: elec4,
      prod: "Handheld Video Game",
      price: 54.43,
      sold: "600",
      old: 108.86,
      dis: 60,
      cg: "electronics",
      ship: 0,
      detail:
        "Open Source RX6H Retro Handheld Video Game Console Linux System 3.5 Inch IPS Screen Portable Pocket Video Player 64GB Games",
    },
    {
      id:18,
      src: acc2,
      prod: "Fashion Reading Glasses",
      price: 0.89,
      sold: "353",
      old: 1.77,
      dis: 50,
      cg: "accessories",
      ship: 0.62,
      detail:
        "Fashion Reading Glasses Anti-Blue Light Women Men Computer Presbyopia Hyperopia Reading Eyeglasses+1.0+1.5+2.0+2.5+3.0+3.5+4.0",
    },
    {
      id:19,
      src: acc3,
      prod: "Retro Baseball Cap Versatile Sunscreen",
      price: 7.57,
      sold: "299",
      old: 590,
      dis: 71,
      cg: "accessories",
      ship: 0,
      detail:
        "Retro Baseball Cap Versatile Sunscreen and Shading Hat Breathable Adjustable Hip Hop Gorras Trucker Cotton Cap Dad Hats",
    },
    {
      id:20,
      src: acc4,
      prod: "Fitness Weight Lifting Wristband Gloves",
      price: 6.76,
      sold: "138",
      old: 24.13,
      dis: 72,
      cg: "accessories",
      ship: 0,
      detail:
        "Fitness Weight Lifting Wristband Gloves Gym Gloves for Men Women Body Building Training Sports Exercise Cycling Glove Shockproof",
    },
  ]);
  const [arr, setArr] = useState(() => {
    const stored = localStorage.getItem("array");
    return stored ? JSON.parse(stored) : [];
  });
  const [login, setLogin] = useState(true);
  useEffect(() => {
    localStorage.setItem("array", JSON.stringify(arr));
  }, [arr]);
  const [index, setIndex] = useState(0);
  const [qnt, setQnt] = useState(() => {
    const savedQnt = localStorage.getItem("qnt");
    return savedQnt ? JSON.parse(savedQnt) : [];
  });
  useEffect(() => {
    localStorage.setItem("qnt", JSON.stringify(qnt));
  }, [qnt]);
  const [add, setAdd] = useState(false);
  const [state, dispatch] = useReducer(reducer, { cg: "Phones" });
  function reducer(state, action) {
    switch (action.type) {
      case "ph": {
        return { cg: "Phones & Telecommunications" };
      }
      case "co": {
        return { cg: "Computer, Office & Education" };
      }
      case "fo": {
        return { cg: "Forniture" };
      }
      case "cl": {
        return { cg: "Clothes" };
      }
      case "sh": {
        return { cg: "Shoes" };
      }
      case "el": {
        return { cg: "Consumer Electronics" };
      }
      case "ac": {
        return { cg: "Accessories" };
      }
    }
  }
  const [cgexist,setCgexist]=useState(false)
  const customers=useRef(null)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar
                arr={arr}
                data={data}
                setData={setData}
                login={login}
                setLogin={setLogin}
                dispatch={dispatch}
                setCgexist={setCgexist}
                cuslocation={customers}
              />
              <Login login={login} setLogin={setLogin} />
              {add && (
                <div className="fixed top-40 left-[50%] translate-x-[-50%] z-10 flex items-center justify-evenly gap-2 text-white bg-green-500
                 p-3! rounded-[5px] w-[350px] max-[760px]:w-[300px] max-[450px]:w-[270px]">
                  <h1>The product has been added to cart</h1>
                  <MdDomainVerification className=" text-[20px] max-[760px]:text-[18px] max-[450px]:text-[16px]"/>
                </div>
              )}
              <Outlet />
              <Footer/>
            </>
          }
        >
          <Route
            index
            element={
              <>
                <Home/>
                <Cg />
                <Prod
                  data={data}
                  arr={arr}
                  setArr={setArr}
                  style={"block px-5!"}
                  setIndex={setIndex}
                  qnt={qnt}
                  setQnt={setQnt}
                  add={add}
                  setAdd={setAdd}
                  state={state}
                  cgexist={cgexist}
                />
                <Cus customers={customers}/>
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <Cart arr={arr} setArr={setArr} qnt={qnt} setQnt={setQnt} />
            }
          />
          <Route
            path="/product"
            element={
              <Prod
                data={data}
                arr={arr}
                setArr={setArr}
                style={"pt-50! pb-20! px-5!"}
                setIndex={setIndex}
                qnt={qnt}
                setQnt={setQnt}
                add={add}
                setAdd={setAdd}
                state={state}
                cgexist={cgexist}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                data={data}
                index={index}
                arr={arr}
                setArr={setArr}
                add={add}
                setAdd={setAdd}
                qnty={qnt}
                setQnty={setQnt}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
