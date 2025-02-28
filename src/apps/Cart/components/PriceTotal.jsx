import React, { useEffect, useState } from "react";
import ProductField from "../../../components/ProductField/ProductFieldTailwind";
import style from "./PriceTotal.module.scss";
import TotalPayment from "./TotalPayment/TotalPayment";
import { fetchProductById } from "../../../services/Service";
import axios from "axios";
function PriceTotal({ cartUpdated }) {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discounts, setDiscounts] = useState();

  useEffect(() => {
    fetchCartData();
  }, [cartUpdated]);

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
    const totalPrice = cart.reduce(
      (acc, product) => acc + product.qty * product.unitPrice,
      0
    );
    setTotalPrice(totalPrice);
    if (discounts) {
      localStorage.setItem("discount", discounts.discountId);
    } else {
      localStorage.setItem("discount", null);
    }
  }, [cart, discounts]);

  const applyDiscount = () => {
    if (discounts) {
      return totalPrice * (discounts.discountPercent / 100);
    } else {
      return 0;
    }
  };

  const handleDiscountCodeChange = async (code) => {
    setDiscounts(code);
  };

  const totalBill = () => {
    if (discounts) {
      localStorage.setItem(
        "total",
        totalPrice * (1 - discounts.discountPercent / 100)
      );
      return totalPrice * (1 - discounts.discountPercent / 100);
    } else {
      localStorage.setItem("total", totalPrice);
      return totalPrice;
    }
  };

  const textInfo = [
    { title: "Cart blackmail ", price: totalPrice },

    { title: "Discount code ", price: applyDiscount() },

    { title: "Total bill", price: totalBill() },
  ];
  return (
    <div>
      <div className=" product  border-b-2 border-black ">
        {cart.map((product, index) => (
          <ProductField
            key={index}
            name={product.publicationsName}
            quantity={product.qty}
            price={product.unitPrice}
          />
        ))}
      </div>

      <div>
        <TotalPayment
          className={style.total}
          textInfo={textInfo}
          onDiscountCodeChange={handleDiscountCodeChange}
        />
      </div>
    </div>
  );
}
export default PriceTotal;
