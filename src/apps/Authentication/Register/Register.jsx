import { useNavigate } from "react-router-dom";
import LoginButton from "../Login/components/LoginButton";
import LoginInput from "../Login/components/LoginInput";
import LoginInputPassword from "../Login/components/LoginInputPassword";
import RegisterStyle from "./scss/Register.module.scss";
import { useState } from "react";
import { registerApi } from "../../../services/Service";
function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleGetUsernameValue = (e) => {
    setUsername(e.target.value);
    setErrorMessage("");
  };
  const handleGetEmailValue = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };
  const handleGetPasswordValue = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };
  const handleGetRepeatPasswordValue = (e) => {
    setRepeatPassword(e.target.value);
    setErrorMessage("");
  };

  const handleNavigateBack = () => {
    navigate("/login");
  };
  const handleRegister = async () => {
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !repeatPassword.trim()
    ) {
      setErrorMessage("Please enter complete information");
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email ");
      return;
    }
    const containsNumber = /\d/;
    if (!containsNumber.test(password)) {
      setErrorMessage("Password must contain at least one Number");
      return;
    }
    const containsUpcase = /[A-Z]/;
    if (!containsUpcase.test(password)) {
      setErrorMessage("Password must contain at least one uppercase  letter ");
      return;
    }
    const containsLowpercase = /[a-z]/;
    if (!containsLowpercase.test(password)) {
      setErrorMessage("Password must contain at least one lowercase letter ");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must have at least 8 characters");
      return;
    }
    if (password !== repeatPassword) {
      setErrorMessage("Password and repeat password do not match");
      return;
    }

    try {
      const dataFromUser = {
        email: email,
        fullName: username,
        password: password,
      };
      const dataToJson = JSON.stringify(dataFromUser);

      const response = await registerApi(dataToJson);
      console.log(response.data.data.email);
      sessionStorage.setItem("email", response.data.data.email);
      navigate("/otp");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 302) {
          setErrorMessage(
            "Email is already in use. Please choose another email."
          );
        }
      }
    }
  };
  return (
    <div className={RegisterStyle.registerWrapper}>
      <div className={RegisterStyle.registerForm}>
        <p>Register</p>
        <form>
          {/* Reuse input from LoginInput */}
          <LoginInput
            label={"Username"}
            placeholder={"Username"}
            onChangeValue={handleGetUsernameValue}
          />
          <LoginInput
            label={"Email"}
            placeholder={"Email"}
            onChangeValue={handleGetEmailValue}
          />
          <LoginInputPassword
            label={"Password"}
            value={password}
            placeholder={"Password"}
            onChangeValue={handleGetPasswordValue}
          />
          <LoginInputPassword
            label={"Repeat password"}
            value={repeatPassword}
            placeholder={"Repeat password"}
            onChangeValue={handleGetRepeatPasswordValue}
          />
        </form>
        <div className={RegisterStyle.errorMessage}>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <p>
          Please check your mailbox. We have sent an OTP code to your email.
        </p>

        <div className={RegisterStyle.registerButton}>
          {/* Reuse button from LoginButton */}
          <LoginButton title={"Back"} handleAction={handleNavigateBack} />
          <LoginButton title={"Next"} handleAction={handleRegister} />
        </div>
      </div>
    </div>
  );
}

export default Register;
