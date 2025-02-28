import React, { useState, useEffect } from "react";
import { AlertAdmin } from "../components/Alert";
import CoverData from "../Services/CoverData";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import CoverStyle from "../scss/CoverManager.module.scss";

function AdminCover() {
  const [coverType, setCoverType] = useState("");
  const { covers, addCovers, updateCovers, deleteCovers, findCover } =
    CoverData();
  const [coverId, setcoverId] = useState("");
  const [vali, setVali] = useState("");
  const [info, setInfo] = useState("");
  const TH = [{ names: "Id" }, { names: "CoverType" }, { names: "" }];
  const isCoverExist = () => {
    return covers.some(
      (item) => item.coverType.toLowerCase() === coverType.toLowerCase()
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

  const handleAddCover = async () => {
    if (coverType === null || coverType === "") {
      setVali("error");
      setInfo("Cover type is not empty!");
    } else if (isCoverExist()) {
      setVali("error");
      setInfo("CoverType is exist!");
    } else {
      try {
        await addCovers({ coverType });
        // Hiển thị alert khi thêm thể loại thành công
        setVali("success");
        setInfo("Adding complete");
        setCoverType("");
      } catch (error) {
        // Xử lý khi có lỗi xảy ra trong quá trình thêm thể loại
        setVali("error");
        setInfo("Adding fail check field!");
      }
    }
  };
  const handleRowClick = (id) => {
    const selected = covers.find((cover) => cover.id === id);
    if (selected) {
      setCoverType(selected.coverType);
      setcoverId(selected.id);
    }
  };
  const handleUpdateCover = async () => {
    if (coverType === null || coverType === "") {
      setVali("error");
      setInfo("Cover type is not empty!");
    } else if (isCoverExist()) {
      setVali("error");
      setInfo("Cover type is exist!");
    } else {
      try {
        await updateCovers(coverId, { coverType });
        // Hiển thị alert khi thêm thể loại thành công
        setVali("success");
        setInfo("Update complete!");
        setCoverType("");
      } catch (error) {
        // Xử lý khi có lỗi xảy ra trong quá trình thêm thể loại
        setVali("error");
        setInfo("Update fail!");
      }
    }
  };
  const handleDeleteCover = async (id) => {
    try {
      const result = await deleteCovers(id);
      if (result !== true) {
        // Xóa thất bại
        setVali("error");
        setInfo("Delete fail!");
      } else {
        // Xóa thành công
        setVali("success");
        setInfo("Delete complete!");
      }
      setCoverType("");
    } catch (error) {
      console.error("Error deleting cover:", error);
    }
  };
  const handleSearchChange = async (e) => {
    const searchValue = e.target.value;
    await findCover(searchValue);
  };
  return (
    <div className={CoverStyle.coverWrapper}>
      <div className={CoverStyle.coverContainer}>
        <h4>Manage Cover</h4>
        <div>
          <div className={CoverStyle.inputForm}>
            <FormInput
              onChange={(e) => setCoverType(e.target.value)}
              type={"text"}
              value={coverType}
              placeholder={"Cover name"}
            />
          </div>
          <div className={CoverStyle.buttonForm}>
            <FormButton content={"Add"} onClick={handleAddCover} />
            <FormButton content={"Update"} onClick={handleUpdateCover} />
          </div>
        </div>
        <AlertAdmin vali={vali} info={info} />
        <div className={CoverStyle.search}>
          <label htmlFor="default-search">Search</label>
          <input
            onChange={handleSearchChange}
            type="search"
            id="default-search"
            placeholder="Search"
            required
          />
        </div>
        <div className={CoverStyle.table}>
          <table>
            <thead>
              <tr>
                {TH.map((item, index) => (
                  <th key={index}>{item.names}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {covers.map((coverRow, rowIndex) => (
                <tr
                  key={rowIndex}
                  name={rowIndex}
                  onClick={() => handleRowClick(coverRow.id)}
                >
                  {Object.values(coverRow).map((value, col) => (
                    <td key={col}>{value}</td>
                  ))}
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDeleteCover(coverRow.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div>
          <div>
            <div>
              <div>
                <FormInput
                  onChange={(e) => setCoverType(e.target.value)}
                  type={"text"}
                />
              </div>
            </div>
            <div>
              <FormButton content={"Add"} onClick={handleAddCover} />
              <FormButton content={"Update"} onClick={handleUpdateCover} />
            </div>
          </div>
          <div>
            <form>
              <label htmlFor="default-search">Search</label>
              <div>
                <div></div>
                <input
                  onChange={handleSearchChange}
                  type="search"
                  id="default-search"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </div>
          
        </div> */}
      </div>
    </div>
  );
}
export default AdminCover;
