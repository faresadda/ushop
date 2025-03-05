import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white h-fit m-0!" id="contact">
      <div className="grid grid-cols-[repeat(auto-fit,200px)] gap-x-20 gap-y-8 items-center justify-center font-normal py-20! px-10!">
        <div>
          <h3>About Us</h3>
          <p>
            Your go-to online store for the best products at great prices. Fast
            shipping & secure payments!
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#product">Shop</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Customer Service</h3>
          <ul>
            <li>
              <a href="#">Shipping & Returns</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Follow us</h3>
          <div className="flex gap-2">
            <a href="#">
              <FaSquareFacebook />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagramSquare />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
          </div>
          <h3>Contact us</h3>
          <p className="flex items-center gap-2"><FaPhoneSquareAlt /> ( +1 ) 543-45-00-21</p>
          <p className="flex items-center gap-2"><MdEmail /> support@ushop.com</p>
        </div>
      </div>

      <p className="text-center">&copy; 2025 USHOP. All rights reserved.</p>
    </footer>
  );
}
