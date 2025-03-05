import phone2 from "../../public/phone2.png";
import { MdOutlineDiscount } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { useState } from "react";
import { SiVisa } from "react-icons/si";
import { SiMastercard } from "react-icons/si";
import { BsPaypal } from "react-icons/bs";
import { MdOutlineVerifiedUser } from "react-icons/md";
export default function Shop({
  data,
  index,
  arr,
  setArr,
  add,
  setAdd,
  qnty,
  setQnty,
}) {
  const [qnt, setQnt] = useState(1);
  const subtotal = data[index].price * qnt;
  const ship = data[index].ship;
  const [color, setColor] = useState("");
  const [sizec, setSizec] = useState("");
  const [sizes, setSizes] = useState("");
  return (
    <div className="flex gap-2 pt-50! pb-10! mx-3! max-[990px]:flex-col">
      <div className="flex items-center justify-between bg-gray-100 w-[70%] gap-3 px-10! py-20! max-[990px]:w-auto max-[580px]:flex-col">
        <img src={data[index].src} alt="phone" className="size-[250px]" />
        <div className="w-[60%] flex flex-col gap-3 max-[580px]:w-auto">
          <p>{data[index].detail}</p>
          <div className="flex items-center gap-1">
            <div className=" flex text-[12px]">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <p className="text-[12px]">4.5 | {data[index].sold} sold</p>
          </div>
          <p className="flex items-center gap-1">
            {data[index].price}${" "}
            <del className="text-[12px]">{data[index].old}$ </del>
            <span className="text-red-500 text-[12px]">
              -{data[index].dis}%
            </span>
            <MdOutlineDiscount />
          </p>
          <hr />
          <label>
            Color : {color}
            <div className="flex gap-2">
              <p
                className="bg-black text-white rounded-3xl w-[70px] text-center border-2 border-solid border-black"
                onClick={() => {
                  setColor("Black");
                }}
              >
                Black
              </p>
              <p
                className="bg-white text-black rounded-3xl w-[70px] text-center border-2 border-solid border-gray-300"
                onClick={() => {
                  setColor("White");
                }}
              >
                White
              </p>
              <p
                className="bg-blue-500 text-white rounded-3xl w-[70px] text-center border-2 border-solid border-blue-500"
                onClick={() => {
                  setColor("Blue");
                }}
              >
                Blue
              </p>
            </div>
          </label>
          {data[index].cg === "clothes" && (
            <label>
              Size : {sizec}
              <div className="flex gap-2">
                <p
                  className="bg-white p-1! rounded-3xl w-[70px] text-center border-2 border-solid border-gray-300"
                  onClick={() => {
                    setSizec("M");
                  }}
                >
                  M
                </p>
                <p
                  className="bg-white p-1! rounded-3xl w-[70px] text-center border-2 border-solid border-gray-300"
                  onClick={() => {
                    setSizec("S");
                  }}
                >
                  S
                </p>
                <p
                  className="bg-white p-1! rounded-3xl w-[70px] text-center border-2 border-solid border-gray-300"
                  onClick={() => {
                    setSizec("XL");
                  }}
                >
                  XL
                </p>
              </div>
            </label>
          )}
          {data[index].cg === "shoes" && (
            <label>
              Size : {sizes}
              <div className="flex gap-2">
                <p
                  className="bg-white rounded-3xl w-[70px] text-center border-2 border-solid border-gray-300"
                  onClick={() => {
                    setSizes("39");
                  }}
                >
                  39
                </p>
                <p
                  className="bg-white rounded-3xl w-[70px] text-center border-2 border-solid border-gray-300"
                  onClick={() => {
                    setSizes("40");
                  }}
                >
                  40
                </p>
                <p
                  className="bg-white rounded-3xl w-[70px] text-center border-2 border-solid border-gray-300"
                  onClick={() => {
                    setSizes("41");
                  }}
                >
                  41
                </p>
              </div>
            </label>
          )}
          <label>
            Quantity : {qnt}
            <div className="px-2! border-2 border-solid rounded-2xl border-gray-300 bg-white w-fit">
              <button
                disabled={qnt === 1}
                onClick={() => {
                  setQnt(Number(qnt) - 1);
                }}
                className="cursor-pointer"
              >
                -
              </button>
              <input
                type="number"
                className="outline-none w-[70px] text-center"
                value={qnt}
                onChange={(e) => setQnt(e.target.value)}
              ></input>
              <button
                onClick={() => {
                  setQnt(Number(qnt) + 1);
                }}
                className="cursor-pointer"
              >
                +
              </button>
            </div>
          </label>
        </div>
      </div>
      <div className="bg-gray-100 grow-1 h-fit flex flex-col gap-3 px-10! py-20!">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{subtotal.toFixed(2)}$</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>{ship.toFixed(2)}$</p>
        </div>
        <div className="flex justify-between">
          <p>Estimated total</p>
          <h3>{(subtotal + ship).toFixed(2)}$</h3>
        </div>
        <p>Pay with</p>
        <div className="flex items-center gap-3">
          <SiVisa />
          <SiMastercard />
          <BsPaypal />
        </div>
        <button className="bg-amber-300 p-2!">PAY NOW</button>
        <button
          className="bg-white p-2!"
          onClick={() => {
            if (!arr.some(item => item.id === data[index].id)) {
              setArr([...arr, data[index]]);
              setQnty([...qnty, { id: data[index].id , qn: qnt } ]);}
            else{setQnty(qnty.map(q=>q.id===data[index].id ? {...q,qn:Number(q.qn)+qnt} : q))}
            setAdd(!add);
            setTimeout(() => {
              setAdd(add);
            }, 2000);
          }}
        >
          ADD TO CART
        </button>
        <h3 className="text-[14px] flex gap-2 items-center">
          <MdOutlineVerifiedUser /> Buyer protection
        </h3>
        <p className="text-[14px]">
          Get a full refund if the item is not as described or not delivered
        </p>
      </div>
    </div>
  );
}
