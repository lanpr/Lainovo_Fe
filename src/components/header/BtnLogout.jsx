import style from "./scss/BtnLogout.module.scss";
import IconLogout from "../../assets/icons/LogoutIcon";
function BtnLogout({ handleLogout }) {
  return (
    <div className={style.btnLogoutWrapper}>
      <button onClick={handleLogout}>
        <IconLogout />
      </button>
    </div>
  );
}

export default BtnLogout;
