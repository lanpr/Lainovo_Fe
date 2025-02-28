import { useEffect, useRef, useState } from "react";
import Card from "../apps/DetailsProduct/components/Card";
import HorizonScrollStyle from "./scss/HorizontalScrollNavigate.module.scss";
import ArrowForward from "../assets/icons/ArrowForwardIcon";
import ArrowBack from "../assets/icons/ArrowBackwardIcon";
function HorizontalScrollNavigate({ cards, chooseOtherPublications }) {
  const scrollContainer = useRef(null);
  const [cardWidth, setCardWidth] = useState();
  const [canScroll, setCanScroll] = useState({ left: false, right: true });
  useEffect(() => {
    const handleScroll = () => {
      setCanScroll(checkScroll());
    };
    scrollContainer.current.addEventListener("scroll", handleScroll);
    return () => {
      if (scrollContainer.current) {
        scrollContainer.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const checkScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
    return {
      left: scrollLeft > 0,
      right: scrollLeft !== scrollWidth - clientWidth,
    };
  };
  const handleNavigateToDetails = (id) => {
    chooseOtherPublications(id);
  };
  const scroll = (direction) => {
    const newScrollPosition =
      scrollContainer.current.scrollLeft + direction * cardWidth;
    scrollContainer.current.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
    setCanScroll(checkScroll());
  };
  const getWidthCard = (width) => {
    setCardWidth(width);
  };
  return (
    <div className={HorizonScrollStyle.horizontalScrollWrapper}>
      <div ref={scrollContainer}>
        {Array.isArray(cards) &&
          cards.map((item, index) => (
            <Card
              key={index}
              imgUrl={item.images[0].imageURL}
              handleNavigateToDetailsProduct={handleNavigateToDetails}
              idPublications={item.publicationsID}
              titlePublications={item.publicationsName}
              getWidth={getWidthCard}
            />
          ))}
      </div>
      <div className={HorizonScrollStyle.buttonWrapper}>
        <button disabled={!canScroll.left} onClick={() => scroll(-1)}>
          <ArrowBack />
        </button>
        <button disabled={!canScroll.right} onClick={() => scroll(1)}>
          <ArrowForward />
        </button>
      </div>
    </div>
  );
}

export default HorizontalScrollNavigate;
