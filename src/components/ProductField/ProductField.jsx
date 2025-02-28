import React from "react";
import style from "./ProductField.module.scss";
import formatCurrency from "../../common/FormatCurrency";

export default function ProductField({ src, alt, name, qty, price }) {
  return (
    <div className={style.container}>
      <div className={style.imgField}>
        <img src={src} alt={alt} className={style.img} />
      </div>
      <div className={style.textField}>
        <div className={style.productName}>
          {name} x{qty}
        </div>
        <div className={style.productPrice}>{formatCurrency(price)}</div>
      </div>
    </div>
  );
}
