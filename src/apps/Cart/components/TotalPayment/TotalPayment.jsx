import { useState } from "react";
import TextInfo from "../../../../components/TextInfo/TextInfo";
import ButtonInput from "../../../../components/BtnInput";
import style from "./TotalPayment.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TotalPayment({
  textInfo,
  className,
  onDiscountCodeChange,
  discount,
}) {
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountValid, setIsDiscountValid] = useState(true);

  const handleDiscountCodeChange = async (event) => {
    const inputDiscountCode = event.target.value;
    setDiscountCode(inputDiscountCode);
    try {
      const discountRes = await axios.get(
        "http://localhost:8080/api/v1/discount/code/" + inputDiscountCode,
        {}
      );
      discount = discountRes.data.data;
      setIsDiscountValid(true);
      onDiscountCodeChange(discount);
    } catch (error) {
      setIsDiscountValid(false);
      onDiscountCodeChange(null);
    }
  };

  const handleToPayment = () => {
    navigate("/cart/payment");
  };

  return (
    <div className={style.container}>
      <div className={style.text}>
        {textInfo.map((text, index) => (
          <TextInfo
            className={className}
            index={index}
            title={text.title}
            price={text.price}
          />
        ))}
      </div>
      <div>
        <input
          type="text"
          value={discountCode}
          onChange={handleDiscountCodeChange}
          placeholder="Enter the discount code"
          className={style.input}
        />
        {!isDiscountValid && (
          <p className={style.invalidMessage}>Invalid discount code!</p>
        )}
      </div>
      <div className={style.btn}>
        <ButtonInput placeholder={"Continue"} onClick={handleToPayment} />
      </div>
    </div>
  );
}
