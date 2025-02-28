import React from "react";
import { Link } from "react-router-dom";
import ButtonInput from "../../components/BtnInput";

const NotFound = () => (
  <div className="not-found">
    <img
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
    />
    <Link to="/" className="link-home">
      <ButtonInput placeholder={"Go Home"} />
    </Link>
  </div>
);

export default NotFound;
