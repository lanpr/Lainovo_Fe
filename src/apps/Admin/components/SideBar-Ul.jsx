import React from "react";
// import BookIcon from "../../../assets/icons/Book";
// import AdminIcon from "../../../assets/icons/Admin";
// import StatisIcon from "../../../assets/icons/Statis";
import { Link } from "react-router-dom";
import Sidebar_ui from "../scss/Sidebar_ui.module.scss";
import { logoutAdmin } from "../../../services/Service";
function SideBar() {
  const UlField = [
    {
      name: "Product",
      // svg: <BookIcon />,
      LiField: [
        { name: "Manage Genre", link: "/admin/genre" },
        { name: "Manage Cover", link: "/admin/cover" },
        { name: "Manage Gift", link: "/admin/gift" },
        { name: "Manage Type", link: "/admin/type" },
        { name: "Manage Book", link: "/admin/product" },
        { name: "Manage Discount", link: "/admin/discount" },
      ],
    },
    {
      name: "Account",
      // svg: <AdminIcon />,
      LiField: [
        { name: "Employee Manage", link: "/admin/employees" },
        { name: "Customer Manage", link: "/admin/customers" },
      ],
    },
    {
      name: "Statis",
      // svg: <StatisIcon />,
      LiField: [
        { name: "Invoice Manager", link: "/admin/order" },
        { name: "Revenue Statistics", link: "/admin/sales" },
      ],
    },
    {
      name: "Navigate",
      LiField: [
        { name: "Home", link: "/home"},
        { name: "Logout", link: "/home", async method() {
          const res = await logoutAdmin();
          sessionStorage.clear();
        }}
      ]
    }
  ];
  return (
    <div className={Sidebar_ui.sidebar_uiContainer}>
      {UlField.map((field, index) => (
        <ul key={index}>
          {field.LiField.map((liFields, index) => (
            <li key={index}>
              <Link to={liFields.link} onClick={liFields.method}>{liFields.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
export default SideBar;
