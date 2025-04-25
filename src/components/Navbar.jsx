import logo from "../../public/logo.png";
import { useState, useEffect, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { SlBasket } from "react-icons/sl";
import { LuCircleUserRound } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function Navbar({
  arr,
  data,
  setData,
  login,
  setLogin,
  dispatch,
  setCgexist,
  cuslocation
}) {
  const [cg, setCg] = useState("CATEGORIES");
  const [search, setSearch] = useState("");
  const [originedata, setOriginedata] = useState(data);
  const navigate = useNavigate();
  useEffect(() => {
    if (search !== "") {
      setData(originedata.filter((p) => p.prod.toLowerCase().includes(search)));
    } else {
      setData(originedata);
    }
  }, [search]);
  const [menu,setMenu]=useState(true)
  let classn="list flex gap-5 justify-center py-2! items-center"
  if(menu===false){
    classn+=" show"}
  const input=useRef(null)
  const [width,setWidth]=useState(window.innerWidth<460)
  
  return (
    <div className="fixed w-full px-10! pt-4! h-[130px] z-10 bg-white max-[520px]:px-5!">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <img src={logo} className="w-[40px]"></img>
          <h3>USHOP</h3>
        </div>
        <div className="search relative w-[50%] max-[620px]:w-[90%]!">
          <input
            ref={input}
            type="search"
            value={search}
            onFocus={() => {
              navigate("/product");
              setData(originedata);
              setCgexist(false);
              setCg("categories");
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="search"
            className="border-solid w-[100%] border-gray-400 border-2 p-3! rounded-xl"
          ></input>
          <IoSearch className="text-4xl absolute right-10 bottom-2 bg-yellow-300 p-1! rounded-[10px] top-[50%] translate-y-[-50%]" onClick={()=>{input.current.focus()}}/>
        </div>
        <div
          className="mcl flex justify-between items-center w-[25%] max-[620px]:w-[60%]! max-[450px]:w-[50%]!"
          onClick={() => {
            setCg("categories");
          }}
        >
          {menu && <FiMenu className="menu text-2xl hidden" onClick={()=>{setMenu(false)}}/>}
          {!menu && <IoClose className="close text-2xl z-50 absolute right-5" onClick={()=>{setMenu(true)}}/>}
          <Link
            className="flex justify-center items-center text-[12px] gap-2"
            to="/cart"
          >
            <SlBasket className="text-2xl" />
            <p className="flex flex-col justify-center items-center">
              <span className="bg-yellow-300 p-1! w-fit rounded-[10px]">
                {arr.length}
              </span>
              <span>Cart</span>
            </p>
          </Link>
          <label
            className="flex justify-center items-center gap-2 cursor-pointer"
            onClick={() => {
              setLogin(!login);
            }}
          >
            <LuCircleUserRound className="text-2xl" />
            <p className="text-[12px] flex flex-col items-center">{!width &&
              <>
              Welcome <span>Login / Register</span>
              </>}
            </p>
          </label>
        </div>
      </div>

      <ul className={classn} id="list">
        <li className="text-red-600">
          <Link
            to="/"
            onClick={() => {
              setData(originedata);
              setCgexist(false);
              setCg("categories");
              setMenu(true)
            }}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            to="/product"
            onClick={() => {
              setData(originedata);
              setCgexist(false);
              setCg("categories");
              setMenu(true)
            }}
          >
            PRODUCTS
          </Link>
        </li>
        <li>
          <select
            className="border-solid border-2 border-gray-400"
            value={cg}
            onChange={(e) => {
              setCg(e.target.value);
              navigate("/product");
              setCgexist(true);
              if (e.target.value == "phones") {
                setData(originedata.filter((p) => p.cg.includes("phones")));
                dispatch({ type: "ph" });
              }
              if (e.target.value == "computer") {
                setData(originedata.filter((p) => p.cg.includes("computer")));
                dispatch({ type: "co" });
              }
              if (e.target.value == "furniture") {
                setData(originedata.filter((p) => p.cg.includes("forniture")));
                dispatch({ type: "fo" });
              }
              if (e.target.value == "clothes") {
                setData(originedata.filter((p) => p.cg.includes("clothes")));
                dispatch({ type: "cl" });
              }
              if (e.target.value == "shoes") {
                setData(originedata.filter((p) => p.cg.includes("shoes")));
                dispatch({ type: "sh" });
              }
              if (e.target.value == "electronics") {
                setData(
                  originedata.filter((p) => p.cg.includes("electronics")),
                );
                dispatch({ type: "el" });
              }
              if (e.target.value == "accessories") {
                setData(
                  originedata.filter((p) => p.cg.includes("accessories")),
                );
                dispatch({ type: "ac" });
              }
              setMenu(true)
            }}
          >
            <option value="categories" disabled={true}>
              CATEGORIES
            </option>
            <option value="phones">Phones & Telecommunications</option>
            <option value="computer">Computer,Office & Education</option>
            <option value="furniture">Furniture</option>
            <option value="clothes">Clothes</option>
            <option value="shoes">Shoes</option>
            <option value="electronics">Consumer Electronics</option>
            <option value="accessories">Accessories</option>
          </select>
        </li>
        <li>
          <Link
            to="/"
            onClick={() => {
              setCg("categories");
              setTimeout(() => {
                cuslocation.current.scrollIntoView({behavior:"smooth"});
              }, 1000);
              setMenu(true)
            }}
          >
            CUSTOMERS
          </Link>
        </li>
        <li>
          <a href="#contact"
            onClick={() => {
              setCg("categories");
              setMenu(true)
            }}
          >
            CONTACT
          </a>
        </li>
        
        <li>
        </li>
      </ul>
    </div>
  );
}
