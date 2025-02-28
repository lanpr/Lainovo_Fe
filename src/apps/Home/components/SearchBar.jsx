import style from "./SearchBar.module.scss";
import IconArrow from "../../../assets/icons/ArrowRightIcon";
function SearchBar({ handleSearch }) {
  return (
    <div className={style.searchBarWrapper}>
      <div>
        <input type="text" onChange={(e) => handleSearch(e)} placeholder="Search"/>
      </div>
    </div>
  );
}

export default SearchBar;
