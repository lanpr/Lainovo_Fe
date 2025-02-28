import { useEffect, useState } from "react";
import style from "./Categories.module.scss";
import { fetchAllGenre } from "../../../services/Service";
import FilterOn from "../../../assets/icons/FilterOn";
import FilterOff from "../../../assets/icons/FilterOff";
function Categories({ onCategorySelect }) {
  const [listGenre, setListGenre] = useState([]);
  const [selectGenreId, setSelectGenreId] = useState(null);
  const [openGenreList, setOpenGenreList] = useState(false);
  useEffect(() => {
    const fetchGenre = fetchAllGenre();
    fetchGenre.then((response) => {
      setListGenre(response.data.data);
    });
  }, []);

  const handleCategoryClick = (genreId) => {
    if (genreId == selectGenreId) {
      setSelectGenreId(null);
      onCategorySelect(null);
    } else {
      setSelectGenreId(genreId);
      onCategorySelect(genreId);
    }
  };
  const toggleCategories = () => {
    setIsExpanded(!isExpanded);
  };
  const handleOpenFilter = () => {
    setOpenGenreList(!openGenreList);
  };
  return (
    <div className={style.categoriesWrapper} onClick={toggleCategories}>
      <button onClick={handleOpenFilter} className={selectGenreId !== null ? `${style.active}` : ""}>
        {
          selectGenreId == null ? <FilterOff /> : <FilterOn />
        }
        Filter
      </button>
      {openGenreList ? (
        <div className={style.wrapper}>
          <div>
            {listGenre.map((item, index) => (
              <button
                className={
                  item.genreID === selectGenreId ? `${style.isSelected}` : ""
                }
                key={index}
                onClick={() => handleCategoryClick(item.genreID)}
              >
                {item.genre}
              </button>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Categories;
