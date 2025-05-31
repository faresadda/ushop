import PropTypes from "prop-types";
import { MdCheckCircle, MdWarning, MdError, MdInfo } from "react-icons/md";

const Confirmation = ({
  onClose,
  onConfirm,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "info",
}) => {

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <MdCheckCircle size={32} />;
      case "warning":
        return <MdWarning size={32} />;
      case "error":
        return <MdError size={32} />;
      default:
        return <MdInfo size={32} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white text-right shadow-xl transition-all">
          <div className="bg-white p-6">
            <div className="flex items-center gap-4">
              <div className={`flex-shrink-0 ${getIconColor()}`}>
                {getIcon()}
              </div>
              <div className="flex-1">
                <p className="text-base text-gray-700">{message}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto"
              onClick={onClose}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Confirmation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.oneOf(["info", "success", "warning", "error"]),
};

export default Confirmation;
