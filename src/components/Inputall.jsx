import React from "react";

function InputAll({ type, id, name, placeholder, svg, value, onChange }) {
  return (
    <div className="mb-4 relative">
      <input
        type={type}
        id={id}
        name={name}
        className="mt-1 px-9 py-2 w-full outline-none border border-gray-300 rounded-xl text-center flex justify-center placeholder-opacity-50  "
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="absolute left-4 top-4 text-gray-400">{svg}</div>
    </div>
  );
}
export default InputAll;
