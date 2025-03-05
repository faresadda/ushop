import phone1 from "../../public/phone1.png";
import pc1 from "../../public/pc1.png";
import forn1 from "../../public/forn1.png";
import clothes1 from "../../public/clothes1.png";
import shoes1 from "../../public/shoes1.png";
import elec1 from "../../public/elec1.png";
import acc1 from "../../public/acc1.png";
export default function Cg() {
  return (
    <div className="py-20!">
      <h2 className="text-center pb-10!">CATEGORIES</h2>
      <div className="grid grid-cols-[repeat(auto-fit,300px)] gap-10 items-center justify-center">
        <div className="bg-gray-200 rounded-3xl p-7! w-full h-[350px] flex flex-col items-center justify-center gap-2">
          <p className="text-center">Phones & Telecommunications</p>
          <img src={phone1}></img>
        </div>
        <div className="bg-gray-200 rounded-3xl p-7! w-full h-[350px] flex flex-col items-center justify-center gap-2">
          <p className="text-center">Computer, Office & Education</p>
          <img src={pc1}></img>
        </div>
        <div className="bg-gray-200 rounded-3xl p-7! w-full h-[350px] flex flex-col items-center justify-center gap-2">
          <p>Furniture</p>
          <img src={forn1}></img>
        </div>
        <div className="bg-gray-200 rounded-3xl p-7! w-full h-[350px] flex flex-col items-center justify-center gap-2">
          <p>Clothes</p>
          <img src={clothes1}></img>
        </div>
        <div className="bg-gray-200 rounded-3xl p-7! w-full h-[350px] flex flex-col items-center justify-center gap-2">
          <p>Shoes</p>
          <img src={shoes1}></img>
        </div>
        <div className="bg-gray-200 rounded-3xl p-7! w-full h-[350px] flex flex-col items-center justify-center gap-2">
          <p>Consumer Electronics</p>
          <img src={elec1}></img>
        </div>
        <div className="bg-gray-200 rounded-3xl p-7! w-full h-[350px] flex flex-col items-center justify-center gap-2">
          <p>Accessories</p>
          <img src={acc1}></img>
        </div>
      </div>
    </div>
  );
}
