import style from "./CardPublications.module.scss";
import EyeIcon from "../../../assets/icons/EyeIcon";
import IconCart from "../../../assets/icons/CartIcon";
import { useNavigate } from "react-router-dom";
function Card({
  id,
  imgSrc,
  name,
  priceBeforeDiscount,
  priceAfterDiscount,
  onClickGetItem,
  onClickNavigate,
}) {
  const navigate = useNavigate();
  const getPublicationsId = (id) => onClickGetItem(id);
  const navigateToDetail = (id) => onClickNavigate(id);
  // const handleNavigateToDetails = (id) => {
  //   navigate(`/detail/${id}`);
  // };

  return (
    <div className={style.containerCard}>
      <div>
        <div className={style.imgWrapper}>
          <a onClick={() => navigateToDetail(id)}>
            <img src={imgSrc} alt="" />
            <div>
              <EyeIcon />
            </div>
          </a>
        </div>
        <div className={style.information}>
          <a onClick={() => navigateToDetail(id)}>
            <p>{name}</p>
          </a>
          <div>
            <span>
              {priceBeforeDiscount}
              <p>đ</p>
            </span>
            {priceAfterDiscount == null ? (
              ""
            ) : (
              <span>
                {priceAfterDiscount}
                <p>đ</p>
              </span>
            )}
          </div>
        </div>
        <div>
          <button onClick={() => navigateToDetail(id)}>
            <EyeIcon />
          </button>
          <button onClick={() => getPublicationsId(id)}>
            <IconCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
