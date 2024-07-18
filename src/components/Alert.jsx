import React from "react";

const Alert = ({ type, message, onClose }) => {
  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-400 text-green-700";
      case "error":
        return "bg-red-100 border-red-400 text-red-700";
      case "warning":
        return "bg-yellow-100 border-yellow-400 text-yellow-700";
      case "info":
        return "bg-blue-100 border-blue-400 text-blue-700";
      default:
        return "bg-gray-100 border-gray-400 text-gray-700";
    }
  };

  return (
    <div className={`border-l-4 p-4 ${getAlertClass()} mb-4`} role="alert">
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="text-xl font-semibold focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
