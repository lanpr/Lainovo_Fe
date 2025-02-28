import ResetPasswordStyle from "./scss/ResetPassword.module.scss";
import LoginInput from "../Login/components/LoginInput";
import LoginButton from "../Login/components/LoginButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgotPasswordApi } from "../../../services/Service";
function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeValue = (e) => {
    setEmail(e.target.value);
  };
  const handleGetOtpCodeToVerifyEmail = async () => {
    if (!email.trim() || !email.trim()) {
      setErrorMessage("Enter valid Email");
      return;
    }
    try {
      const dataJson = JSON.stringify({
        email: email,
      });
      const response = await forgotPasswordApi(dataJson);
      navigate("/otp/resetpassword");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage("	Email does not exist");
        }
      }
    }
  };

  const handleNavigateBack = () => {
    navigate("/login");
  };
  return (
    <div className={ResetPasswordStyle.resetPasswordWrapper}>
      <div className={ResetPasswordStyle.resetPasswordForm}>
        <form action="">
          <p>Verify account</p>
          <p>We need to know that you are the owner of this account.</p>
          <LoginInput label={"Email"} onChangeValue={handleChangeValue} />
          <div className={ResetPasswordStyle.errorMessage}>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <div className={ResetPasswordStyle.resetPasswordButtonWrapper}>
            <LoginButton title={"Back"} handleAction={handleNavigateBack} />
            <LoginButton
              title={"Next"}
              handleAction={handleGetOtpCodeToVerifyEmail}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
