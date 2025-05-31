import { SiMastercard } from "react-icons/si";
import { SiVisa } from "react-icons/si";
import { BsPaypal } from "react-icons/bs";
import {
  FaShippingFast,
  FaLock,
  FaHeadset,
  FaExchangeAlt,
} from "react-icons/fa";

export default function Customers() {
  return (
    <section className="mt-15">
      {/* Trust Badges & Customer Assurance Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 p-4 rounded-full mb-4 shadow-md">
                <FaShippingFast className="text-white text-2xl" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg">
                Expedited Delivery
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Complimentary shipping on orders above $50
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-700 p-4 rounded-full mb-4 shadow-md">
                <FaLock className="text-white text-2xl" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg">
                Enhanced Security
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Fully encrypted payment processing
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-700 p-4 rounded-full mb-4 shadow-md">
                <FaHeadset className="text-white text-2xl" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg">
                Premium Support
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Dedicated assistance available 24/7
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-700 p-4 rounded-full mb-4 shadow-md">
                <FaExchangeAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg">
                Hassle-Free Returns
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                30-day satisfaction guarantee
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-10 pt-8 border-t border-gray-200">
            <div className="flex items-center flex-col md:flex-row">
              <span className="text-gray-800 font-medium mb-4 md:mb-0 md:mr-6">
                Trusted Payment Partners
              </span>
              <div className="flex space-x-8 items-center">
                <SiVisa className="text-blue-900 text-5xl" />
                <SiMastercard className="text-red-600 text-4xl" />
                <BsPaypal className="text-blue-900 text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
