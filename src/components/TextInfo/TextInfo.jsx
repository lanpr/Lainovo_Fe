import React from "react";
import style from "./TextInfo.module.scss";
import formatCurrency from "../../common/FormatCurrency";

export default function TextInfo({ title, price, className, text }) {
  const inputClassName = `${style.container} ${className}`;

  return (
    <div className={inputClassName}>
      <div className={style.title}>{title}</div>
      {price && <div className={style.text}>{formatCurrency(price)}</div>}
      {text && <div className={style.text}>{text}</div>}
    </div>
  );
}
