import { useEffect, useState } from "react";
import style from "./scss/BtnCart.module.scss";
import IconCart from "../../assets/icons/CartIcon";

function BtnCart({ onOpen, icon }) {
  const handleOpen = () => {
    if (onOpen) {
      onOpen();
    }
  };
  return (
    <div className={`${style.btnCartWrapper}`}>
      <button onClick={handleOpen}>
        <IconCart />
      </button>
      <p className={`data ${style.visible}`}>22</p>
    </div>
  );
}

export default BtnCart;
