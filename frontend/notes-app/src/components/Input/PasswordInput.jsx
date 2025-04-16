import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function PasswordInput({ value, onChange, placeholder }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  function togglePassword() {
    setIsShowPassword(!isShowPassword);
  }

  return (
    <div className="flex outer items-center bg-transparent px-5 h-[45px] rounded mb-3">
      {" "}
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent outline-none rounded"
      />
      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer"
          onClick={togglePassword}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={togglePassword}
        />
      )}
    </div>
  );
}

export default PasswordInput;
