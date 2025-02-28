import React, { useEffect, useState } from "react";
import Title from "../../../../components/Title/Title";
import style from "./DetailProduct.module.scss";
import ProductField from "../../../../components/ProductField/ProductField";
import TotalPayment from "../TotalPayment/TotalPayment";
import { fetchProductById } from "../../../../services/Service";

function DetailProduct({ isPaymentInfoComplete }) {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    fetchCartData();
  }, []);
  const fetchCartData = async () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      if (cartItems && cartItems.length > 0) {
        const products = [];
        for (const item of cartItems) {
          const response = await fetchProductById(item.id);
          const productWithQty = { ...response.data.data, qty: item.qty };
          products.push(productWithQty);
        }
        setCart(products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const totalPrice = localStorage.getItem("total");
    setTotalPrice(totalPrice);
  }, [cart]);
  const textInfo = [{ title: "Total payment", price: totalPrice }];

  return (
    <div className={style.container}>
      <div className={style.title}>
        <Title title={"Product"} />
      </div>
      <div className={style.productField}>
        {cart.map((product, index) => (
          <ProductField
            key={index}
            src={
              product.images && product.images.length > 0
                ? product.images[0].imageURL
                : ""
            }
            qty={product.qty}
            alt={""}
            name={product.publicationsName}
            price={product.unitPrice * product.qty}
          />
        ))}
      </div>
      <div>
        <TotalPayment
          className={style.TotalPayment}
          textInfo={textInfo}
          isPaymentInfoComplete={isPaymentInfoComplete}
        />
      </div>
    </div>
  );
}

export default DetailProduct;
