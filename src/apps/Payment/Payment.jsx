import React, { useState } from "react";
import style from "./Payment.module.scss";
import PaymentForm from "./components/PaymentForm/PaymentForm";
import DetailProduct from "./components/DetailProduct/DetailProduct";

function Payment() {
  const [isPaymentInfoComplete, setPaymentInfoComplete] = useState(false);

  const handlePaymentInfoChange = (isValid) => {
    setPaymentInfoComplete(isValid);
  };
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.left}>
          <PaymentForm onPaymentInfoChange={handlePaymentInfoChange} />
        </div>
        <div className={style.right}>
          <DetailProduct isPaymentInfoComplete={isPaymentInfoComplete} />
        </div>
      </div>
    </div>
  );
}

export default Payment;
