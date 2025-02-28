import React, { useState, useEffect } from "react";
import GiftData from "../Services/GiftData";
import { AlertAdmin } from "../components/Alert";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import FormButton from "../components/FormButton";
import GiftStyle from "../scss/GiftManager.module.scss";
import FormInput from "../components/FormInput";

function AdminGift() {
  const [GiftId, setGiftId] = useState("");
  const [promotionalGiftType, setGiftType] = useState("");
  const [promotionalGiftName, setGiftName] = useState("");
  const { Gifts, addGifts, updateGifts, deleteGifts, findGift } = GiftData();
  const [vali, setVali] = useState("");
  const [info, setInfo] = useState("");

  const isCoverExist = () => {
    return Gifts.some(
      (item) =>
        item.GiftName.toLowerCase() === promotionalGiftName.toLowerCase()
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

  const handleAddGift = async () => {
    if (
      promotionalGiftType.trim() !== "" &&
      promotionalGiftName.trim() !== ""
    ) {
      if (isCoverExist()) {
        setVali("error");
        setInfo("Gift name is exist!");
      } else {
        await addGifts({ promotionalGiftName, promotionalGiftType });
        setGiftType("");
        setGiftName("");
        setVali("success");
        setInfo("Adding complete!");
      }
    } else {
      setVali("error");
      setInfo("Gift name and gift type not empty!");
      console.error("Gift type and name must not be empty");
    }
  };
  const handleRowClick = (id) => {
    const selected = Gifts.find((gift) => gift.promotionalGiftID === id);
    if (selected) {
      setGiftName(selected.GiftName);
      setGiftType(selected.GiftType);
      setGiftId(selected.promotionalGiftID);
    }
  };
  const handleUpdateGift = async () => {
    if (
      promotionalGiftType.trim() !== "" &&
      promotionalGiftName.trim() !== ""
    ) {
      await updateGifts(GiftId, { promotionalGiftName, promotionalGiftType });
      setGiftType("");
      setGiftName("");
      setGiftId("");
      setVali("success");
      setInfo("Update complete!");
    } else {
      setVali("error");
      setInfo("Gift name and gift type not empty!");
    }
  };
  const TH = [
    { names: "Id" },
    { names: "Gift Name" },
    { names: "Gift Type" },
    { names: "" },
  ];
  const handleDeleteGift = async (id) => {
    try {
      const result = await deleteGifts(id);
      if (result !== true) {
        // Xóa thất bại
        setVali("error");
        setInfo("Delete fail!");
      } else {
        // Xóa thành công
        setVali("success");
        setInfo("Delete complete!");
      }
      setGiftType("");
      setGiftName("");
      setGiftId("");
    } catch (error) {
      console.error("Error deleting cover:", error);
    }
  };
  const handleSearchChange = async (e) => {
    const searchValue = e.target.value;
    await findGift(searchValue);
  };
  return (
    <div className={GiftStyle.giftWrapper}>
      <div className={GiftStyle.giftContainer}>
        <h4>Manage Gift</h4>
        <div>
          <div className={GiftStyle.inputForm}>
            <FormInput
              type={"text"}
              value={promotionalGiftName}
              onChange={(e) => setGiftName(e.target.value)}
              placeholder={"Gift name"}
            />
            <FormInput
              type={"text"}
              value={promotionalGiftType}
              onChange={(e) => setGiftType(e.target.value)}
              placeholder={"Gift type"}
            />
          </div>
          <div className={GiftStyle.inputForm}>
            <FormButton content={"Add"} onClick={handleAddGift} />
            <FormButton content={"Update"} onClick={handleUpdateGift} />
          </div>
        </div>
        <AlertAdmin vali={vali} info={info} />
        <div className={GiftStyle.search}>
          <label htmlFor="default-search">Search</label>
          <input
            onChange={handleSearchChange}
            type="search"
            id="default-search"
            placeholder="Search"
            required
          />
        </div>
        <div className={GiftStyle.table}>
          <table>
            <thead>
              <tr>
                {TH.map((item, index) => (
                  <th key={index}>{item.names}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Gifts.map((giftRow, rowIndex) => (
                <tr
                  key={rowIndex}
                  name={rowIndex}
                  onClick={() => handleRowClick(giftRow.promotionalGiftID)}
                >
                  {Object.values(giftRow).map((value, col) => (
                    <td key={col}>{value}</td>
                  ))}
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteGift(giftRow.promotionalGiftID)
                      }
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
export default AdminGift;
