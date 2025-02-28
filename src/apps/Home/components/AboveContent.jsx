import { useEffect, useState } from "react";
import AboveContentStyle from "../scss/AboveContent.module.scss";
import Introduce from "./Introduce";
import Shipping from "../../../assets/icons/ShippingIcon";
import WideVariety from "../../../assets/icons/BooksIcon";
import Money from "../../../assets/icons/MoneyIcon";
import Contact from "../../../assets/icons/PhoneIcon";
import CardPublications from "./CardPublications";
import { useNavigate } from "react-router-dom";
import {
  fetchNewPublications,
  fetchHotPublications,
} from "../../../services/Service";
function AboveContent() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [publications, setPublications] = useState([]);
  const [cartList, setCartList] = useState([]);
  const items = [
    { label: "NEW", apiCall: () => fetchNewPublications() },
    { label: "BEST SELLER", apiCall: () => fetchHotPublications() },
  ];
  const introduce = [
    { label: "FAST DELIVERY", icon: <Shipping /> },
    { label: "WIDE VARIETY", icon: <WideVariety /> },
    { label: "ALWAYS DISCOUNT", icon: <Money /> },
    { label: "0988681424 0988771283", icon: <Contact /> },
  ];
  useEffect(() => {
    const callApiNewPublications = async () => {
      const response = await fetchNewPublications();
      setPublications(response.data.data);
    };
    callApiNewPublications();
  }, []);
  const handlePublicationId = (id) => {
    return navigate(`/detail/${id}`);
  };
  const handleCallApi = async (index) => {
    setActiveIndex(index);
    const response = await items[index].apiCall();
    setPublications(response.data.data);
  };
  const handlePublicationGetId = (id) => {
    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let itemAlreadyInCart = false;

    const updatedCartItems = existingCartItems.map((item) => {
      if (item.id === id) {
        item.qty += 1;
        itemAlreadyInCart = true;
      }
      return item;
    });

    if (!itemAlreadyInCart) {
      const newItem = {
        id: id,
        qty: 1,
      };
      updatedCartItems.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    alert("Sản phẩm đã được thêm vào giỏ hàng!");

    setCartList((prevCartList) => [...prevCartList, id]);
    // navigate("/cart");
  };
  return (
    <div className={AboveContentStyle.aboveContainer}>
      <div className={AboveContentStyle.introduce}>
        {introduce.map((item, index) => (
          <Introduce key={index} label={item.label} icon={item.icon} />
        ))}
      </div>
      <div className={AboveContentStyle.selectionWrapper}>
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              className={
                index === activeIndex ? `${AboveContentStyle.active}` : ""
              }
              onClick={() => handleCallApi(index)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className={AboveContentStyle.abovePublicationsContainer}>
        {publications.map((item, index) => (
          <CardPublications
            id={item.publicationsId}
            imgSrc={item.imageURL}
            name={item.publicationsName}
            key={index}
            priceBeforeDiscount={item.unitPrice}
            onClickNavigate={handlePublicationId}
            onClickGetItem={handlePublicationGetId}
          />
        ))}
      </div>
    </div>
  );
}

export default AboveContent;
