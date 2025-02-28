import { useState } from "react";
import BodyStyle from "./Body.module.scss";
import MainPublications from "./components/MainPublications";
import AboveContent from "./components/AboveContent";
function Body() {
  const [selectedCategoryId, setSelectedCategoryId] = useState();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };
  return (
    <div className={BodyStyle.bodyContainer}>
      <AboveContent />
      <MainPublications />
    </div>
  );
}

export default Body;
