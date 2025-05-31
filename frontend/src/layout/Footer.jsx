import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../../public/logo.png"
import { FaArrowRight } from "react-icons/fa";

/**
 * Professional Footer Component with Trust Features
 * @returns {React.ReactElement} The footer component
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10" id="contact" aria-labelledby="footer-heading">

      {/* Newsletter Section */}
      <div className="bg-gray-900 py-12 border-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
              <h3 className="text-white text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-300">Get exclusive offers, new arrival alerts and more</p>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <form className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-700 text-white px-4 py-3 rounded-l sm:rounded-r-none outline-none focus:ring-2 focus:ring-blue-500 w-full mb-2 sm:mb-0"
                  aria-label="Email address"
                />
                <button 
                  className="bg-secondary hover:bg-yellow-500 text-black px-6 py-3 font-medium rounded-r sm:rounded-l-none transition-colors duration-200 flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  Subscribe <FaArrowRight className="ml-2" />
                </button>
              </form>
              <p className="text-gray-400 text-xs mt-2">By subscribing you agree to our Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <div className="flex mb-4 items-center gap-4">
              <img 
                src={logo}
                alt="ushop Logo" 
                className="h-8 w-auto"
              />
              <p>ushop</p>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your premium destination for quality products at competitive prices. 
              We offer fast shipping, secure payments, and exceptional customer service.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebookSquare className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="YouTube"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Shop', 'New Arrivals', 'Featured Products', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="text-xs mr-2">›</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {[
                'Shipping & Returns', 
                'Order Tracking', 
                'Privacy Policy', 
                'Terms & Conditions', 
                'FAQs'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="text-xs mr-2">›</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+15434500021" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-start"
                >
                  <FaPhone className="mt-1 mr-3 text-gray-500 flex-shrink-0" />
                  <span>+1 (543) 450-0021</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@ushop.com" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-start"
                >
                  <FaEnvelope className="mt-1 mr-3 text-gray-500 flex-shrink-0" />
                  <span>support@ushop.com</span>
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-gray-500 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Commerce Street<br />
                  Suite 500<br />
                  Metropolis, NY 10001
                </span>
              </li>
            </ul>
            
            
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} ushop. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a 
                    href="#" 
                    className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}