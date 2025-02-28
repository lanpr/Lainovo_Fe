import React, { useEffect, useState } from "react";
import Title from "../../../../components/Title/Title";
import style from "./PaymentForm.module.scss";
import InputValidate from "../InputValidate/InputValidate";

export default function PaymentForm({ onPaymentInfoChange }) {
  const [selectedOption, setSelectedOption] = useState("Cash payment");
  const [, setInputValid] = useState(false);

  const handleSelectChange = (selectedValue) => {
    setSelectedOption(selectedValue);
  };
  useEffect(() => {
    sessionStorage.setItem("Payment", selectedOption);
  }, [selectedOption]);
  const handleInputValidationChange = (isValid) => {
    setInputValid(isValid);
    if (
      selectedOption !== "Bank card payment" &&
      selectedOption !== "Visa payment"
    ) {
      onPaymentInfoChange(isValid);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>
        <Title title={"Payments"} />
      </div>
      <div className={style.wrapper}>
        <p className={style.title}>Payment information</p>
        <div className={style.inputField}>
          <div className={style.left}>
            <InputValidate
              className={style.mapField}
              onValidationChange={handleInputValidationChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
