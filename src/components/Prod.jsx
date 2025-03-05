import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlineDiscount } from "react-icons/md";
import { useState } from "react";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Prod({
  data,
  arr,
  setArr,
  style,
  setIndex,
  qnt,
  setQnt,
  add,
  setAdd,
  state,
  cgexist,
}) {
  return (
    <div className={style} id="product">
      {!cgexist && <h2 className="text-center pb-10!">PRODUCTS</h2>}
      {cgexist && <h2 className="text-center pb-10!">{state.cg}</h2>}
      <div className="grid grid-cols-[repeat(auto-fit,200px)] gap-10 items-center justify-center font-normal">
        {data.map((dat, index) => {
          return (
            <div key={index} className="item">
              <div className="relative">
                <img src={dat.src} className="rounded-[15px] w-full"></img>
                <MdAddShoppingCart
                  onClick={() => {
                    if (!arr.some(item => item.id === dat.id)) {
                    setArr([...arr, dat]);
                    setQnt([...qnt, { id: dat.id , qn: 1 } ]);}
                    else{setQnt(qnt.map(q=>q.id===dat.id ? {...q,qn:q.qn+1} : q))}
                    setAdd(!add);
                    const a = setTimeout(() => {
                      setAdd(add);
                    }, 2000);
                    if (add) {
                      clearTimeout(a);
                    }
                  }}
                  className="absolute right-5 bottom-5 text-2xl p-2! bg-white rounded-[100%] box-content! cursor-pointer"
                />
              </div>
              <div className="w-full">
                <h3>{dat.prod}</h3>
                <div className="flex items-center gap-1">
                  <div className=" flex text-[12px]">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                  </div>
                  <p className="text-[12px]">4.5 | {dat.sold} sold</p>
                </div>
                <p className="flex items-center gap-1">
                  {dat.price}$ <del className="text-[12px]">{dat.old}$ </del>
                  <span className="text-red-500 text-[12px]">-{dat.dis}%</span>
                  <MdOutlineDiscount />
                </p>
                <Link
                  to="/shop"
                  onClick={() => {
                    setIndex(index);
                  }}
                >
                  <button>SHOP NOW</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      {data.length === 0 && (
        <h3 className="text-red-500 my-20! flex justify-center items-center gap-2">
          Product not found{" "}
          <MdOutlineReportGmailerrorred className="text-2xl" />
        </h3>
      )}
    </div>
  );
}
