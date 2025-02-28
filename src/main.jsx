import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Views from "./View";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./routers/ScroolToTop";
// import './i18n';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Views />
    </BrowserRouter>
  </React.StrictMode>
);
