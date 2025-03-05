import iphone from "../../public/phone1.png";
import { SiVisa } from "react-icons/si";
import { SiMastercard } from "react-icons/si";
import { BsPaypal } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { MdOutlineVerifiedUser } from "react-icons/md";

export default function Cart({ arr, setArr, qnt, setQnt }) {
  const ship=arr.reduce((sum,ar)=>sum+ar.ship,0)
  const subtotal=arr.reduce((sum,ar,index)=>sum+((ar.price)*(qnt[index].qn)),0)
  return (
    <div>
      <h1 className="pt-50! ml-10!">Cart ( {arr.length} )</h1>
      <div className="h-fit flex gap-2 px-3! my-10! w-full max-[920px]:flex-col">
        {arr.length === 0 && (
          <h2 className="text-center py-30! text-red-500 w-[70%] h-fit bg-gray-100 rounded-[5px] max-[920px]:w-auto">
            No products added to cart
          </h2>
        )}
        {arr.length !== 0 && (
          <div className="basis-[70%] flex flex-col gap-2">
            {arr.map((ar, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 rounded-[5px] p-5! h-fit gap-5 max-[500px]:flex-col max-[500px]:items-start"
                >
                  <div className="flex items-center gap-5">
                    <img src={ar.src} className="size-[100px]"></img>
                    <div>
                      <h3>{ar.prod}</h3>
                      <p>{(ar.price*qnt[index].qn).toFixed(2)}$</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 max-[500px]:flex-row">
                    <p>Quantity : {qnt[index].qn}</p>
                    <div className="px-2! border-2 border-solid rounded-2xl border-gray-300 w-[120px] text-center">
                      <button
                        disabled={qnt[index].qn === 1}
                        onClick={() => {
                          setQnt(
                            qnt.map((q, i) =>
                              i === index ? {...q,qn:Number(q.qn) - 1} : q
                            ),
                          );
                        }}
                        className="cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="outline-none w-[70px] text-center"
                        value={qnt[index].qn}
                        onChange={(e) =>
                          setQnt(qnt.map((q, i) =>
                            i === index ? {...q,qn:e.target.value} : q))
                        }
                      ></input>
                      <button
                        onClick={() => {
                          setQnt(
                            qnt.map((q, i) =>
                              i === index ? {...q,qn:Number(q.qn) + 1} : q))}}
                        className="cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <FaRegTrashAlt
                      className="cursor-pointer"
                      onClick={() => {
                        setArr(
                          arr.filter((ar) => {
                            return arr[index]!==ar
                          }),
                        );
                        setQnt(qnt.filter(q=>arr[index].id!==q.id))
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="bg-gray-100 p-10! grow-1 h-fit flex flex-col gap-3">
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
            <h3>{(ship+subtotal).toFixed(2)}$</h3>
          </div>
          <p>Pay with</p>
          <div className="flex items-center gap-3">
            <SiVisa />
            <SiMastercard />
            <BsPaypal />
          </div>
          <button className="bg-amber-300 p-2!">PAY NOW</button>
          <h3 className="text-[14px] flex gap-2 items-center">
            <MdOutlineVerifiedUser /> Buyer protection
          </h3>
          <p className="text-[14px]">
            Get a full refund if the item is not as described or not delivered
          </p>
        </div>
      </div>
    </div>
  );
}
