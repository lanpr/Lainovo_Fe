import React, { useState, useEffect } from "react";
import TextInfo from "../../../../components/TextInfo/TextInfo";
import ButtonInput from "../../../../components/BtnInput";
import style from "./TotalPayment.module.scss";
import FinishPayment from "../../../../components/Models/FinishPayment/FinishPayment";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  fetchUserAddress,
  fetchCreateAddress,
} from "../../../../services/Service";

export default function TotalPayment({
  textInfo,
  className,
  isPaymentInfoComplete,
}) {
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [order, setOrder] = useState();

  const clearLocal = () => {
    localStorage.removeItem("Payment");
    localStorage.removeItem("total");
    localStorage.removeItem("discount");
    localStorage.removeItem("cart");
  };
  const handleOpenFinishModal = async () => {
    const userData = JSON.parse(localStorage.getItem("UserData"));
    const id = sessionStorage.getItem("accessToken");

    if (id) {
      const jwtPayload = jwtDecode(id);
      const customerId = jwtPayload.customerId;
      try {
        const address = await fetchUserAddress(customerId);
        if (!address) {
          await fetchCreateAddress(userData.address, userData.phone);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          await fetchCreateAddress(userData.address, userData.phone);
        } else {
          throw error;
        }
      }
    }

    const order = {
      totalPrice: localStorage.getItem("total"),
      fullName: userData.fullName,
      phoneNumber: userData.phone,
      address: userData.address,
      paymentStatus: false,
      discount:
        localStorage.getItem("discount") === null
          ? null
          : localStorage.getItem("discount"),
      email: userData.email,
      orderItem: JSON.parse(localStorage.getItem("cart")),
      status: id === null ? false : true,
    };
    setOrder(order);
    await axios.post("http://localhost:8080/api/v1/order", order);
    clearLocal();
    setShowFinishModal(true);
  };

  return (
    <div className={style.container}>
      <div className={style.text}>
        {textInfo.map((item, index) => (
          <TextInfo
            className={className}
            index={index}
            title={item.title}
            price={item.price ? item.price : null}
            text={item.text ? item.text : null}
          />
        ))}
      </div>
      <div className={style.btnField}>
        <ButtonInput
          placeholder={"Pay"}
          onClick={handleOpenFinishModal}
          className={`${isPaymentInfoComplete ? style.btn : style.btnHidden}`}
        />
      </div>
      {showFinishModal && (
        <FinishPayment onClose={() => setShowFinishModal(false)} />
      )}
    </div>
  );
}
