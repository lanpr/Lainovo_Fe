import React from "react";
import SideBar from "../components/SideBar-Ul";
import SidebarStyle from "../scss/Sidebar.module.scss";
function MenuAdmin() {
  return (
    <div className={SidebarStyle.menuAdminContainer}>
      <div>
        <div>
          <h5>LAINOVO</h5>
        </div>
        <div>
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default MenuAdmin;
