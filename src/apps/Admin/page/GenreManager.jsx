import { useState, useEffect } from "react";
import React from "react";
import GenreStyle from "../scss/GenreManager.module.scss";
// import SearchBar from "../components/SearchBar";
import GenreData from "../Services/GenreData";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import { AlertAdmin } from "../components/Alert";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";

function Genre() {
  const [genre, setGenre] = useState("");
  const {
    genres,
    fetchGenres,
    addGenres,
    updateGenres,
    deleteGenres,
    findGenre,
  } = GenreData();
  const [genreId, setGenreId] = useState("");
  const [vali, setVali] = useState("");
  const [info, setInfo] = useState("");

  const TH = [{ names: "Id" }, { names: "Genre" }, { names: "" }];
  const isGenreExist = () => {
    return genres.some(
      (item) => item.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const handleAddGenre = async () => {
    if (genre === null || genre === "") {
      setVali("error");
      setInfo("Genre name is not empty!");
    } else if (isGenreExist()) {
      setVali("error");
      setInfo("Genre name is exist!");
    } else {
      try {
        await addGenres({ genre });
        // Hiển thị alert khi thêm thể loại thành công
        setVali("success");
        setInfo("Adding complete");
        setGenre("");
      } catch (error) {
        // Xử lý khi có lỗi xảy ra trong quá trình thêm thể loại
        setVali("error");
        setInfo("Adding fail check field!");
      }
    }
  };
  const handleRowClick = (id) => {
    // Tìm kiếm thông tin genre từ mảng genres dựa trên ID đã truyền
    const selected = genres.find((genre) => genre.id === id);
    if (selected) {
      setGenre(selected.genre);
      setGenreId(selected.id);
    }
  };

  const handleUpdateGenre = async () => {
    if (genre === null || genre === "") {
      setVali("error");
      setInfo("Genre name is not empty!");
    } else if (isGenreExist()) {
      setVali("error");
      setInfo("Genre name is exist!");
    } else {
      try {
        await updateGenres(genreId, { genre });
        // Hiển thị alert khi thêm thể loại thành công
        setVali("success");
        setInfo("Update complete!");
        setGenre("");
      } catch (error) {
        // Xử lý khi có lỗi xảy ra trong quá trình thêm thể loại
        setVali("error");
        setInfo("Update fail!");
      }
    }
  };
  const handleDeleteGenre = async (id) => {
    try {
      const result = await deleteGenres(id);
      if (result !== true) {
        // Xóa thất bại
        setVali("error");
        setInfo("Delete fail!");
      } else {
        // Xóa thành công
        setVali("success");
        setInfo("Delete complete!");
      }
      setGenre("");
      fetchGenres();
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };
  const handleSearchChange = async (e) => {
    const searchValue = e.target.value;
    await findGenre(searchValue);
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
  return (
    <div className={GenreStyle.genreWrapper}>
      <div className={GenreStyle.genreContainer}>
        <h4>Manage Genre</h4>
        <div>
          <div className={GenreStyle.inputForm}>
            <FormInput
              onChange={(e) => setGenre(e.target.value)}
              type={"text"}
              placeholder={"Genre name"}
              value={genre}
            />
          </div>
          <div className={GenreStyle.buttonForm}>
            <FormButton content={"Add"} onClick={handleAddGenre} />
            <FormButton content={"Update"} onClick={handleUpdateGenre} />
          </div>
        </div>
        <AlertAdmin vali={vali} info={info} />
        <div className={GenreStyle.search}>
          <label htmlFor="default-search">Search</label>
          <input
            onChange={handleSearchChange}
            type="search"
            id="default-search"
            placeholder="Search"
            required
          />
        </div>
        <div className={GenreStyle.table}>
          <table>
            <thead>
              <tr>
                {TH.map((item, index) => (
                  <th key={index}>{item.names}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {genres.map((genreRow, rowIndex) => (
                <tr
                  key={rowIndex}
                  name={rowIndex}
                  onClick={() => handleRowClick(genreRow.id)}
                >
                  {Object.values(genreRow).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDeleteGenre(genreRow.id)}
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
export default Genre;
