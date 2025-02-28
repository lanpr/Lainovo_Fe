import style from "../scss/RelatedPublications.module.scss";
import React, { useState, useEffect, useRef } from "react";
import HorizontalScrollNavigate from "../../../components/HorizontalScrollNavigate";
function RelatedPublications({
  publicationsByAuthorName,
  handleChoosenOtherPublications,
}) {
  return (
    <div className={style.container}>
      <div className={style.sameAuthorContainer}>
        <h5>SAME AUTHOR</h5>
        <HorizontalScrollNavigate 
        cards={publicationsByAuthorName}
        chooseOtherPublications={handleChoosenOtherPublications}/>
      </div>
    </div>
  );
}
export default RelatedPublications;
