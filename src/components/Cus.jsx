import { FaStar } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";

export default function Cus({customers}) {
  return (
    <div className="mb-20!" ref={customers}>
      <h2 className="text-center py-10!">CUSTOMERS</h2>
      <div className="grid grid-cols-[repeat(auto-fit,300px)] gap-10 items-center justify-center font-normal">
        <div className="cus">
          <h3 className="text-red-500">Michael Johnson</h3>
          <p className="flex text-[12px]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </p>
          <p>
            Great online store! The ordering process was smooth, and my package
            arrived earlier than expected. Highly recommended!
          </p>
        </div>
        <div className="cus">
          <h3 className="text-red-500">Sarah Thompson</h3>
          <p className="flex text-[12px]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </p>
          <p>
            I love the variety of products available. Customer support was very
            helpful when I had a question about my order. Will shop again!
          </p>
        </div>
        <div className="cus">
          <h3 className="text-red-500">David Williams</h3>
          <p className="flex text-[12px]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </p>
          <p>
            Good prices and decent quality, but the shipping took a bit longer
            than I expected. Overall, a good experience.
          </p>
        </div>
        <div className="cus">
          <h3 className="text-red-500">Emily Davis</h3>
          <p className="flex text-[12px]">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </p>
          <p>
            Amazing experience! The website is easy to navigate, and the
            products are exactly as described. Definitely my go-to online store!
          </p>
        </div>
      </div>
      <div className="w-[60%] flex flex-col mx-auto! relative border-solid border-2 rounded-2xl mt-10! max-[920px]:w-[80%]">
        <p className="flex justify-center gap-2 mt-10!">
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
        </p>
        <textarea
          placeholder="Leave a comment"
          className="p-10! outline-none h-[200px]"
        ></textarea>
        <IoSend className="absolute right-8 bottom-8 text-2xl" />
      </div>
    </div>
  );
}
