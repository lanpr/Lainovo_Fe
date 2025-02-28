import React, { useState, useEffect } from "react";
import { AlertAdmin } from "../components/Alert";
import SearchBar from "../components/SearchBar";
import TypeData from "../Services/TypeData";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import { system } from "faker/lib/locales/en";
import FormButton from "../components/FormButton";
import TypeStyle from "../scss/TypeManager.module.scss";
import FormInput from "../components/FormInput";
function AdminType() {
  const [typeName, setTypeName] = useState("");
  const { types, addTypes, updateTypes, deleteTypes, findType } = TypeData();
  const [typeId, setTypeId] = useState("");
  const [vali, setVali] = useState("");
  const [info, setInfo] = useState("");
  const TH = [{ names: "Id" }, { names: "TypeName" }, {}];
  const isTypeExist = () => {
    return types.some(
      (item) => item.typeName.toLowerCase() === typeName.toLowerCase()
    );
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
  useEffect(() => {
    // Nếu thành công khi thêm sản phẩm, thì mới ẩn thông báo sau 5 giây
    if (vali === "success") {
      const hideAlert = setTimeout(() => {
        setVali("");
        setInfo("");
      }, 5000);

      // Clear timeout khi component unmount để tránh memory leaks
      return () => clearTimeout(hideAlert);
    }
  }, [vali, info]);
  const handleAddType = async () => {
    if (typeName === null || typeName === "") {
      setVali("error");
      setInfo("Type Name is not empty!");
    } else if (isTypeExist()) {
      setVali("error");
      setInfo("TypeName is exist!");
    } else {
      try {
        await addTypes({ typeName });
        // Hiển thị alert khi thêm thể loại thành công
        setVali("success");
        setInfo("Adding complete");
        setTypeName("");
      } catch (error) {
        // Xử lý khi có lỗi xảy ra trong quá trình thêm thể loại
        setVali("error");
        setInfo("Adding fail check field!");
      }
    }
  };
  const handleRowClick = (id) => {
    const selected = types.find((type) => type.id === id);
    if (selected) {
      setTypeName(selected.typeName);
      setTypeId(selected.id);
    }
  };
  const handleUpdateType = async () => {
    if (typeName === null || typeName === "") {
      setVali("error");
      setInfo("Type Name is not empty!");
    } else if (isTypeExist()) {
      setVali("error");
      setInfo("Type Name is exist!");
    } else {
      try {
        await updateTypes(typeId, { typeName });
        // Hiển thị alert khi thêm thể loại thành công
        setVali("success");
        setInfo("Update complete!");
        setTypeName("");
      } catch (error) {
        // Xử lý khi có lỗi xảy ra trong quá trình thêm thể loại
        setVali("error");
        setInfo("Update fail!");
      }
    }
  };
  const handleDeleteType = async (id) => {
    try {
      const result = await deleteTypes(id);
      if (result !== true) {
        // Xóa thất bại
        setVali("error");
        setInfo("Delete fail!");
      } else {
        // Xóa thành công
        setVali("success");
        setInfo("Delete complete!");
      }
      setTypeName("");
    } catch (error) {
      console.error("Error deleting type:", error);
    }
  };
  const handleSearchChange = async (e) => {
    const searchValue = e.target.value;
    await findType(searchValue);
  };
  return (
    <div className={TypeStyle.typeWrapper}>
      <div className={TypeStyle.typeContainer}>
        <h4>Manage Type</h4>
        <div>
          <div className={TypeStyle.inputForm}>
            <FormInput
              type={"text"}
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              placeholder={"Type name"}
            />
          </div>
          <div className={TypeStyle.inputForm}>
            <FormButton content={"Add"} onClick={handleAddType} />
            <FormButton content={"Update"} onClick={handleUpdateType} />
          </div>
        </div>
        <AlertAdmin vali={vali} info={info} />
        <div className={TypeStyle.search}>
          <label htmlFor="default-search">Search</label>
          <input
            onChange={handleSearchChange}
            type="search"
            id="default-search"
            placeholder="Search"
            required
          />
        </div>
        <div className={TypeStyle.table}>
          <table>
            <thead>
              <tr>
                {TH.map((item, index) => (
                  <th key={index}>{item.names}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {types.map((typeRow, rowIndex) => (
                <tr
                  key={rowIndex}
                  name={rowIndex}
                  onClick={() => handleRowClick(typeRow.id)}
                >
                  {Object.values(typeRow).map((value, col) => (
                    <td>{value}</td>
                  ))}
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDeleteType(typeRow.id)}
                    >
                      <DeleteIcon />
                    </button>
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
export default AdminType;
