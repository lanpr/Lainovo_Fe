import React from "react";
import MenuAdmin from "../../apps/Admin/page/Sidebar";
import { useLocation } from "react-router-dom";
import Genre from "../../apps/Admin/page/GenreManager";
import AdminCover from "../../apps/Admin/page/CoverManager";
import AdminDiscount from "../../apps/Admin/page/DiscountManager";
import AdminGift from "../../apps/Admin/page/GiftManager";
import AdminProduct from "../../apps/Admin/page/PublicationsManager";
import AdminType from "../../apps/Admin/page/TypeManager";
import Reveneu from "../../apps/Admin/page/Reveneu";
import Invoice from "../../apps/Admin/page/InvoiceManager";
import EmployeeManager from "../../apps/Admin/page/EmployeeManager";
import CustomerManager from "../../apps/Admin/page/CustomerManager";
import AdminPageStyle from "./AdminPage.module.scss";
function HomeAdmin() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className={AdminPageStyle.adminPageContainer}>
      <div>
        <div>
          <MenuAdmin />
        </div>
        <div>
          {currentPath === "/admin" && <Genre />}
          {currentPath === "/admin/genre" && <Genre />}
          {currentPath === "/admin/gift" && <AdminGift />}
          {currentPath === "/admin/discount" && <AdminDiscount />}
          {currentPath === "/admin/cover" && <AdminCover />}
          {currentPath === "/admin/product" && <AdminProduct />}
          {currentPath === "/admin/type" && <AdminType />}
          {currentPath === "/admin/order" && <Invoice />}
          {currentPath === "/admin/employees" && <EmployeeManager />}
          {currentPath === "/admin/customers" && <CustomerManager />}
          {currentPath === "/admin/sales" && <Reveneu />}
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
