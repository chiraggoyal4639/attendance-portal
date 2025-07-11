import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({
  label = "Password",
  value,
  onChange,
  placeholder = "Enter password",
  required = true,
  className = "",
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <label className="block mb-1 text-[20px] font-medium text-gray-700 text-left pt-2.5 pb-1">
        {label}
      </label>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 bg-white text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
      <span
        onClick={() => setShow(!show)}
        className="absolute right-3 bottom-3 text-gray-500 cursor-pointer select-none"
      >
        {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </span>
    </div>
  );
};

export default PasswordInput;
