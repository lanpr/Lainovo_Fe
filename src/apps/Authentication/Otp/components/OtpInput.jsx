import OtpInputStyle from "../scss/OtpInput.module.scss";
function OtpInput({ onChangeAction }) {
  return (
    <div className={OtpInputStyle.otpInputWrapper}>
      <input
        type="text"
        placeholder="Type your OTP"
        onChange={(e) => onChangeAction(e)}
      />
    </div>
  );
}

export default OtpInput;
