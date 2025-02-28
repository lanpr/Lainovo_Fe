import { useNavigate } from "react-router-dom";
import LoginButton from "../Login/components/LoginButton";
import OtpInput from "./components/OtpInput";
import OtpStyle from "./scss/Otp.module.scss";
import { useState } from "react";
import { verifyResetPasswordCode } from "../../../services/Service";
function OtpResetPassword() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeValueOtp = (e) => {
    setOtp(e.target.value);
    setErrorMessage("");
  };
  const handleResend = () => {};
  const handleBackToResetPassword = () => {
    navigate("/resetpassword");
  };
  const handleVerifyEmail = async () => {
    try {
      const response = await verifyResetPasswordCode(otp);
      sessionStorage.setItem("otp", otp);
      console.log(response.data.status);
      if (response.data.status == 1) {
        navigate("/newpassword");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage("Authentication failed, please check the code again or click resend ");
        }
      }
    }
  };
  return (
    <div className={OtpStyle.otpWrapper}>
      <div className={OtpStyle.otpForm}>
        <p>OTP</p>
        <form action="">
          <OtpInput onChangeAction={handleChangeValueOtp} />
          <div className={OtpStyle.errorMessage}>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <p>
            If you still have not received the OTP code,{" "}
            <a onClick={handleResend}>Click here</a> to resend.
          </p>

          <div className={OtpStyle.otpButtonWrapper}>
            <LoginButton
              title={"Back"}
              handleAction={handleBackToResetPassword}
            />
            <LoginButton title={"Verify"} handleAction={handleVerifyEmail} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpResetPassword;
