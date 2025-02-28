import { useState } from "react";
import LoginButton from "./components/LoginButton";
import LoginInput from "./components/LoginInput";
import LoginStyle from "./scss/LoginAdmin.module.scss";
import { loginAdmin } from "../../../services/Service";
import { useNavigate } from "react-router-dom";
import LoginInputPassword from "./components/LoginInputPassword";
function LoginAdmin() {
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleChangeValueEmail = (e) => {
    setAccountName(e.target.value);
  };
  const handleChangeValuePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const data = {
      accountName: accountName,
      password: password,
    };
    try {
      const response = await loginAdmin(data);
      if (response.data.status == 1) {
        sessionStorage.setItem("accessToken", response.data.data.accessToken);
        sessionStorage.setItem("role", "ADMIN");
        navigate("/admin");
      }
    } catch(error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className={LoginStyle.loginWrapper}>
      <div className={LoginStyle.loginForm}>
        <p>Login</p>
        <form>
          <LoginInput
            label={"Account name"}
            placeholder={"Account name"}
            type={"text"}
            onChangeValue={handleChangeValueEmail}
          />
          <LoginInputPassword
            label={"Password"}
            placeholder={"Password"}
            onChangeValue={handleChangeValuePassword}
          />
        </form>
        <span>
          {error}
        </span>
        <LoginButton handleAction={handleLogin} title={"Login"} />
        {/* <div className={LoginStyle.register}>
          <span>
            Don't have an account? <a onClick={navigateToRegister}>Register</a>
          </span>
        </div> */}
      </div>
    </div>
  );
}

export default LoginAdmin;
