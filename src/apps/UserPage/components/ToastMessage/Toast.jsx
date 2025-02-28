import React, { useEffect } from "react";
import style from "./Toast.module.scss";

function Toast({ message, type, showToast, setShowToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showToast, setShowToast]);

  return (
    showToast && (
      <div
        className={`${style.toast} ${
          type === "success" ? style.success : style.error
        }`}
      >
        {message}
      </div>
    )
  );
}

export default Toast;
