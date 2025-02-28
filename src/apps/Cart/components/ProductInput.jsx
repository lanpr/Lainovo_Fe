import React, { useState } from "react";
import ProductList from "./ProductList";
import PriceTotal from "./PriceTotal";
import style from "./ProductInput.module.scss";

function ProductRe() {
  const [cartUpdated, setCartUpdated] = useState(0);

  const handleCartUpdate = () => {
    setCartUpdated((prev) => prev + 1);
  };

  return (
    <div className={style.container}>
      <div className="border border-black rounded-md p-4">
        <table className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* title left */}
          <div className={style.titleLeft}>
            <div className="flex justify-between border-b-2 border-black">
              <p className={style.fontA}>Product</p>
              <p className={style.fontB}>Total</p>
            </div>
            <div className={style.table}>
              <ProductList onCartUpdate={handleCartUpdate} />
            </div>
          </div>
          {/* title right */}
          <div className={style.titleRight}>
            <div className=" border-b-2 border-black">
              <h2 className={style.fontC}>Cart Total</h2>
            </div>
            <PriceTotal cartUpdated={cartUpdated} />
          </div>
        </table>
      </div>
    </div>
  );
}

export default ProductRe;
