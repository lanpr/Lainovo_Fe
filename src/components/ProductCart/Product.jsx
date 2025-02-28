import React, { useEffect, useState } from "react";
import style from "./Product.module.scss";
import formatCurrency from "../../common/FormatCurrency";

function Product({
  imgBook,
  bookName,
  bookPrice,
  author,
  category,
  total,
  quantity,
  handleDecrease,
  handleIncrease,
}) {
  return (
    <div className={style.container}>
      <div className={style.productField}>
        <div className={style.imgField}>
          <img src={imgBook} alt={bookName} />
        </div>
        <div className={style.infoField}>
          <p className={style.productTitle}>{bookName}</p>
          <p className={style.productAuthor}>{author}</p>
          <p className={style.productCategory}>{category}</p>
          <p className={style.productPrice}>{formatCurrency(bookPrice)}</p>
          <div className={style.quantityField}>
            <button className={style.btnQuantity} onClick={handleDecrease}>
              -
            </button>
            <div className={style.quantity}>{quantity}</div>
            <button className={style.btnQuantity} onClick={handleIncrease}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className={style.totalField}>
        <p className={style.total}>{formatCurrency(total)}</p>
      </div>
    </div>
  );
}

export default Product;
