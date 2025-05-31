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
      <div className="container mx-auto p-8 h-full flex flex-col lg:flex-row items-center justify-between relative z-10">
        <div
          className={`max-w-xl transition-all duration-700 ease-out ${
            isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <h1
            className="text-6xl lg-text-7xl font-extrabold tracking-tight text-white drop-shadow-lg 
          mb-8 leading-tight"
          >
            <span className="block text-white/90">WELCOME</span>
            <span className="block text-slate-900 relative">
              TO USHOP
              
            </span>
          </h1>

          <div className="flex items-center gap-3 bg-white/30 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/40 shadow-lg">
            <FaTags className="text-amber-500 text-3xl" />
            <div>
              <p className="text-slate-900 font-semibold mb-1">
                Sale ends: <span className="font-bold">{formattedDate}</span>
              </p>
              <p className="text-slate-900 font-bold text-xl md:text-3xl">
                Discounts up to{" "}
                <span className="text-red-600">{discountPercentage}% off</span>
              </p>
            </div>
          </div>

          <a
            href="#product"
            aria-label="Shop now"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-full px-8 py-5 text-lg font-semibold shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 hover:shadow-xl hover:-translate-y-1 group"
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
