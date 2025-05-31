import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="relative">
          <div className="bg-yellow-50 p-8 rounded-full mb-6 inline-block">
            <FaExclamationTriangle className="text-6xl text-yellow-400" />
          </div>
          <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-yellow-400 rounded-full"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto">
            We couldn't find the page you're looking for. It might have been
            moved or doesn't exist.
          </p>
        </div>

        <div className="space-y-6">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            <FaHome className="text-xl" />
            Back to Homepage
          </Link>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>Need help?</span>
            <Link
              to="/contact"
              className="text-gray-900 hover:text-yellow-500 font-medium transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
