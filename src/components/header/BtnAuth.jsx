import style from "./scss/BtnAuth.module.scss";
import IconLogin from "../../assets/icons/LoginIcon";
import { useNavigate } from "react-router";
function BtnAuth({ handleLogin }) {
  return (
    <div className={style.btnAuthWrapper}>
      <button onClick={handleLogin}>
        <span>Login</span>
      </button>
    </div>
  );
}

export default BtnAuth;
