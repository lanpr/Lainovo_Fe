import style from "./scss/BtnUser.module.scss";
import IconUser from "../../assets/icons/User";
function BtnUser() {
  return (
    <div className={`${style.btnUserWrapper}`}>
      <button>
        <IconUser />
      </button>
    </div>
  );
}

export default BtnUser;
