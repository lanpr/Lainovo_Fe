import React, { useEffect, useState } from "react";
import Product from "../../../components/ProductCart/Product";
import style from "./ProductList.module.scss";
import { fetchProductById } from "../../../services/Service";
function ProductList({ onCartUpdate }) {
  const [cart, setCart] = useState([]);
  const [qtyChanged, setQtyChanged] = useState(false);

  useEffect(() => {
    fetchCartData();
  }, [qtyChanged]);

  const fetchCartData = async () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      if (cartItems && cartItems.length > 0) {
        const products = [];
        for (const item of cartItems) {
          const response = await fetchProductById(item.id);
          const productWithQty = {
            ...response.data.data,
            qty: item.qty,
            type: item.type,
          };
          products.push(productWithQty);
        }
        setCart(products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const incDec = async (qty, dec, publicationsID) => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cartItems.findIndex((item) => item.id === publicationsID);
    if (index !== -1) {
      if (dec === "dec") {
        qty -= 1;
        if (qty === 0) {
          cartItems.splice(index, 1);
          window.location.reload();
        } else {
          cartItems[index].qty = qty;
        }
        localStorage.setItem("cart", JSON.stringify(cartItems));
        setCart([...cartItems]);
        setQtyChanged((prev) => !prev);
        onCartUpdate();
      } else {
        cartItems[index].qty += 1;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        setCart([...cartItems]);
        setQtyChanged((prev) => !prev);
        onCartUpdate();
      }
    }
  };

  return (
    <div className={style.productList}>
      {cart.map((product, index) => (
        <div key={index} className={style.productField}>
          <Product
            bookName={
              product.type === "Special"
                ? `${product.publicationsName} - Special`
                : product.publicationsName
            }
            imgBook={
              product.images && product.images.length > 0
                ? product.images[0].imageURL
                : ""
            }
            bookPrice={product.unitPrice}
            author={product.author}
            total={product.unitPrice * product.qty}
            quantity={product.qty}
            handleDecrease={() =>
              incDec(product.qty, "dec", product.publicationsID)
            }
            handleIncrease={() =>
              incDec(product.qty, "inc", product.publicationsID)
            }
          />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
