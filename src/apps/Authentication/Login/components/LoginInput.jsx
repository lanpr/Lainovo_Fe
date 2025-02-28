import LoginInputStyle from "../scss/LoginInput.module.scss"
function LoginInput({ label,placeholder, type, onChangeValue }) {
  return (
    <div className={LoginInputStyle.loginInputWrapper}>
      <label htmlFor="">{label}</label>
      <input type={type} placeholder={placeholder} onChange={(e) => onChangeValue(e)}/>
    </div>
  );
}

export default LoginInput;
