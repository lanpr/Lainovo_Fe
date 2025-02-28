import { useNavigate } from "react-router-dom";
import LoginButton from "../Login/components/LoginButton";
import OtpInput from "./components/OtpInput";
import OtpStyle from "./scss/Otp.module.scss";
import { useState } from "react";
import { verifyOtp } from "../../../services/Service";
function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleChangeValueOtp = (e) => {
    setOtp(e.target.value);
    setErrorMessage("");
  };
  const handleResend = () => {};
  const handleBackToRegister = () => {
    sessionStorage.removeItem("email");
    navigate("/register");
  };
  const handleVerifyEmail = async () => {
    try {
      const emailFromSessionStorge = sessionStorage.getItem("email");
      const dataJson = JSON.stringify({
        otp: otp,
        email: emailFromSessionStorge,
      });
      const response = await verifyOtp(dataJson);
      if (response.data.status == 1) {
        sessionStorage.removeItem("email");
        navigate("/login");
      } 
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage(
            "Authentication failed, please check the code again or click resend "
          );
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
            <LoginButton title={"Back"} handleAction={handleBackToRegister} />
            <LoginButton title={"Verify"} handleAction={handleVerifyEmail} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpVerify;
