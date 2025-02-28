import React, { useEffect } from "react";
import { AlertAdmin } from "../components/Alert";
import DiscountData from "../Services/DiscountData";
import { useState } from "react";
import FormButton from "../components/FormButton";
import DiscountStyle from "../scss/DiscountManager.module.scss";
function AdminDiscount() {
  const { discounts, addDiscounts, updateDiscounts, findDiscount } =
    DiscountData();
  const [formData, setFormData] = useState({
    discountName: "",
    discountPercent: "",
    discountCode: "",
    expirationDate: "",
    description: "",
  });
  const [discountId, setDiscountId] = useState("");
  const [vali, setVali] = useState("");
  const [info, setInfo] = useState("");
  const TH = [
    { names: "DiscountName" },
    { names: "DiscountPercent" },
    { names: "Active" },
    { names: "DiscountCode" },
    { names: "CreatedAt" },
    { names: "ExpirationDate" },
  ];
  const isDiscountExist = () => {
    return discounts.some(
      (item) =>
        item.discountName.toLowerCase() === formData.discountName.toLowerCase()
    );
  };
  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const validForm = () => {
    let isValid = true;
    Object.values(formData).forEach((value) => {
      if (value === "") {
        isValid = false;
        return; // Dừng vòng lặp ngay lập tức khi tìm thấy giá trị rỗng
      }
    });
    if (parseInt(formData.discountPercent) < 0) {
      return false;
    } else {
      return isValid;
    }
  };
  useEffect(() => {
    validForm();
  }, [formData]);

  const handleAddDiscount = async () => {
    if (!validForm()) {
      setVali("error");
      setInfo("Please fill in all fields!");
    } else if (isDiscountExist()) {
      setVali("error");
      setInfo("Discount Name is exist!");
    } else {
      await addDiscounts(formData);
      // Hiển thị alert khi thêm thể loại thành công
      setVali("success");
      setInfo("Adding complete");
      setFormData({
        discountName: "",
        discountPercent: "",
        discountCode: "",
        expirationDate: "",
        description: "",
      });
    }
  };
  const handleRowClick = (id) => {
    const selected = discounts.find((discount) => discount.discountId === id);
    if (selected) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        discountName: selected.discountName,
        discountPercent: selected.discountPercent,
        discountCode: selected.discountCode,
        expirationDate: selected.expirationDate,
        description: selected.description,
      }));
      setDiscountId(selected.discountId);
    }
  };
  const handleUpdateDiscount = async () => {
    if (!validForm) {
      setVali("error");
      setInfo("Please fill in all fields!");
    } else {
      await updateDiscounts(discountId, formData);
      setVali("success");
      setInfo("Update complete!");
      setFormData({
        discountName: "",
        discountPercent: "",
        discountCode: "",
        expirationDate: "",
        description: "",
      });
      setDiscountId("");
    }
  };
  useEffect(() => {
    // Xác định hàm để ẩn AlertAdmin sau 5 giây
    const hideAlert = setTimeout(() => {
      setVali("");
      setInfo("");
    }, 5000);

    // Clear timeout khi component unmount để tránh memory leaks
    return () => clearTimeout(hideAlert);
  }, [vali, info]);
  const handleSearchChange = async (e) => {
    const searchValue = e.target.value;
    await findDiscount(searchValue);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và thêm số 0 nếu cần
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và thêm số 0 nếu cần
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const discount_ip = [
    {
      type: "text",
      names: "discountName",
      id: "discount",
      placeholder: "Discount Name",
    },
    {
      type: "number",
      names: "discountPercent",
      id: "discount",
      placeholder: "Discount Percent",
    },
    {
      type: "text",
      names: "discountCode",
      id: "discount",
      placeholder: "Discount Code",
    },
    {
      type: "date",
      names: "expirationDate",
      id: "discount",
      placeholder: "Expiration_date",
    },
  ];
  return (
    <div className="h-screen pt-12">
      <div className="mt-4">
        <div className="text-black text-start">
          <h3 className="font-bold">Manage Discount</h3>
        </div>
      </div>
      <div className="h-8/12">
        <div className="py-1 h-auto flex">
          {discount_ip.map((field) => (
            <div className="py-2 flex-col inline-block w-3/12 ms-2">
              <div className=" w-12/12 py-1">
                <div className="relative w-full h-10 ">
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.names}
                    value={formData[field.names]}
                    onChange={handleFormDataChange}
                    className="shadow-black peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=""
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    {field.placeholder}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-col flex w-4/12 h-full ">
          <div className="relative w-full h-auto">
            <textarea
              id="discount"
              name="description"
              value={formData.description}
              onChange={handleFormDataChange}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  text-sm px-3 py-2.5 rounded-[7px] border-gray-700 focus:border-gray-950"
              placeholder="Description"
              style={{ resize: "none" }}
            />
          </div>
        </div>
        <div className="flex gap-1">
          <FormButton content={"Add"} onClick={handleAddDiscount} />
          <FormButton content={"Update"} onClick={handleUpdateDiscount} />
        </div>
        <AlertAdmin vali={vali} info={info} />
        <div className={DiscountStyle.search}>
          <label htmlFor="default-search">Search</label>
          <input
            type="search"
            id="default-search"
            onChange={handleSearchChange}
            placeholder="Search"
            required
          />
        </div>
        <div className={DiscountStyle.table}>
          <table className="w-full overflow-y-scroll border-s border-black">
            <thead className="border-b border-black bg-[#c2aa67] uppercase ">
              <tr>
                {TH.map((item, index) => (
                  <th
                    className=" text-center font-bold border-r border-black"
                    key={index}
                  >
                    {item.names}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {discounts.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  name={rowIndex}
                  onClick={() => handleRowClick(item.discountId)}
                  className="cursor-pointer border-b  border-black hover:bg-gray-400"
                >
                  <td className="text-center border-r border-black">
                    {item.discountName}
                  </td>
                  <td className="text-center border-r border-black">
                    {item.discountPercent}
                  </td>
                  <td className="text-center border-r border-black">
                    {item.active ? "Active" : "Non-Active"}{" "}
                  </td>
                  <td className="text-center border-r border-black">
                    {item.discountCode}
                  </td>
                  <td className="text-center border-r border-black">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="text-center border-r border-black">
                    {formatDate(item.expirationDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AdminDiscount;
