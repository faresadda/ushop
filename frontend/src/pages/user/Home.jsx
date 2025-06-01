import { useState, useEffect } from "react";
import { FaArrowRight, FaTags } from "react-icons/fa";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const saleEndDate = new Date();
  saleEndDate.setUTCHours(0);
  saleEndDate.setUTCMinutes(0);
  saleEndDate.setUTCSeconds(0);
  saleEndDate.setUTCDate(saleEndDate.getDate() + 2);

  const formattedDate = saleEndDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const discountPercentage = 80;

  return (
    <div className="bg-secondary min-h-screen w-full relative font-sans">
      {/* Main content */}
      <div className="container mx-auto px-5 py-5 h-full flex flex-col lg:flex-row items-center justify-between relative z-10">
        <div
          className={`flex flex-col justify-center gap-8 -mt-15 max-w-xl transition-all duration-700 ease-out min-h-screen lg:h-fit ${
            isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <h1 className="text-7xl max-[450px]:text-6xl sm:text-8xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight">
            <span className="block text-white/90">WELCOME</span>
            <span className="block text-slate-900 relative">TO USHOP</span>
          </h1>

          <div className="">
            <p className="text-slate-900 font-semibold mb-1 text-xl sm:text-2xl">
              Sale ends:{" "}
              <span className="font-bold text-xl md:text-2xl">
                {formattedDate}
              </span>
            </p>
            <p className="text-slate-900 font-bold text-xl sm:text-3xl">
              Discounts up to{" "}
              <span className="text-red-600">{discountPercentage}% off</span>
            </p>
          </div>

          <a
            href="#products"
            aria-label="Shop now"
            className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800
             hover:to-slate-900 text-white rounded-2xl px-20 py-5 text-lg font-semibold shadow-md transition-all 
             duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 hover:shadow-xl hover:-translate-y-1 w-fit"
          >
            SHOP NOW
            <FaArrowRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
          </a>
        </div>

        {/* Image container */}
        <div
          className={`relative mt-12 lg:mt-0 transition-all duration-700 delay-300 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <img
            src="/headphone.png"
            alt="Premium headphones on sale"
            role="img"
            className="relative z-10 w-[280px] md:w-[350px] lg:w-[450px] xl:w-[500px] object-contain 
            drop-shadow-2xl animate-float"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
