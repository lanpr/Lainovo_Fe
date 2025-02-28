import { useState } from "react";
import LoginButton from "./components/LoginButton";
import LoginInput from "./components/LoginInput";
import LoginStyle from "./scss/Login.module.scss";
import { loginApi } from "../../../services/Service";
import { useNavigate } from "react-router-dom";
import LoginInputPassword from "./components/LoginInputPassword";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeValueEmail = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };
  const handleChangeValuePassword = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Enter valid Email/Password");
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    const dataJson = JSON.stringify(data);

    try {
      const response = await loginApi(dataJson);
      const jwtPayloadRefreshToken = jwtDecode(response.data.data.refreshToken);
      const jwtPayloadAccessToken = jwtDecode(response.data.data.accessToken);
      if (jwtPayloadAccessToken.role[0].authority === "CUSTOMER") {
        sessionStorage.setItem("refreshToken", response.data.data.refreshToken)
        sessionStorage.setItem("role", "CUSTOMER");
        sessionStorage.setItem("accessToken", response.data.data.accessToken);
        navigate("/home");
      } else {
        setErrorMessage("Login unsuccessful. Please try again later.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage("Email is incorrect or does not exist ");
        }
        if (error.response.status === 400) {
          setErrorMessage("incorrect password");
        }
      }
    }
  };
  const navigateToRegister = () => {
    navigate("/register");
  };
  const navigateToResetPassword = () => {
    navigate("/resetpassword");
  };
  return (
    <div className={LoginStyle.loginWrapper}>
      <div className={LoginStyle.loginForm}>
        <p>Login</p>
        <form>
          <LoginInput
            label={"Email"}
            placeholder={"Email"}
            type={"text"}
            onChangeValue={handleChangeValueEmail}
          />
          <LoginInputPassword
            label={"Password"}
            placeholder={"Password"}
            onChangeValue={handleChangeValuePassword}
          />
        </form>
        <div className={LoginStyle.errorMessage}>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <span>
          Forgot password? <a onClick={navigateToResetPassword}>Click here</a>
        </span>
        <LoginButton handleAction={handleLogin} title={"Login"} />
        <div className={LoginStyle.register}>
          <span>
            Don't have an account? <a onClick={navigateToRegister}>Register</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
