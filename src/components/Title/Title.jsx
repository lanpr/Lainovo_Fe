import React from "react";
import style from "./Title.module.scss";

function Title({ title }) {
  return <div className={style.title}>{title}</div>;
}

export default Title;
