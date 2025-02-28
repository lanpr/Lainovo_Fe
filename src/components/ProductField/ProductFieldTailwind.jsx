import React from "react";
import formatCurrency from "../../common/FormatCurrency";

function ProductField({ name, price, quantity }) {
  return (
    <div className="flex items-center justify-between my-2">
      <p className="font-bold">
        {name} &nbsp; x{quantity}
      </p>
      <p>{formatCurrency(price * quantity)} </p>
    </div>
  );
}

export default ProductField;
