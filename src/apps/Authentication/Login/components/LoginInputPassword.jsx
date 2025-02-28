import LoginInputPasswordStyle from "../scss/LoginInputPassword.module.scss";
import EyeIconClose from "../../../../assets/icons/EyeClose";
import EyeIconOpen from "../../../../assets/icons/EyeIcon";
import { useState } from "react";
function LoginInputPassword({ label, placeholder, onChangeValue, value }) {
  const [show, setShow] = useState(false);
  const handleShowPassword = () => {
    setShow(!show);
  };
  return (
    <div className={LoginInputPasswordStyle.loginInputPasswordWrapper}>
      <label htmlFor="">{label}</label>
      <input
        value={value}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        onChange={(e) => onChangeValue(e)}
      />
      <button type="button" onClick={handleShowPassword} tabIndex={"-1"}>
        {show ? <EyeIconOpen /> : <EyeIconClose />}
      </button>
    </div>
  );
}

export default LoginInputPassword;
