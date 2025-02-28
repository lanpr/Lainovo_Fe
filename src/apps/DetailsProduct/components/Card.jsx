import { useEffect, useRef } from "react";
import style from "../scss/Card.module.scss";
function Card({
  imgUrl,
  handleNavigateToDetailsProduct,
  idPublications,
  titlePublications,
  getWidth,
}) {
  const cardRef = useRef(null);
  useEffect(() => {
    getWidth(cardRef.current.getBoundingClientRect().width);
  }, [cardRef]);
  return (
    <article
      ref={cardRef}
      onClick={() => handleNavigateToDetailsProduct(idPublications)}
      className={style.container}
    >
      <div className={style.imageWrapper}>
        <img src={imgUrl} alt="" />
      </div>
      <div className={style.infoPublicationsWrapper}>
        <p>{titlePublications}</p>
      </div>
    </article>
  );
}

export default Card;
