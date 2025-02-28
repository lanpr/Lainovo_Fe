import React from "react";

function ButtonInput({ type, onClick, placeholder, className }) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`bg-[#6b5d31] transition-colors duration-300 text-white py-2 px-4 rounded-md hover:bg-[#87753d] w-full ${className}`}
      >
        {placeholder}
      </button>
    </div>
  );
}

export default ButtonInput;
