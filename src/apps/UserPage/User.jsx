// Menu.jsx
import React from "react";
import Profile from "./components/Profile/Profile";
import styles from "./User.module.scss";
import Info from "./components/Info/Info";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import ChangeAddress from "./components/ChangeAddress/ChangeAddress";
import History from "./components/History/History";

function User() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.upperContainer}>
          <div className={styles.info}>
            <Info />
          </div>
          <div>
            <div className={styles.password}>
              <ChangePassword />
            </div>
            <div className={styles.address}>
              <ChangeAddress />
            </div>
          </div>
        </div>
        <div className={styles.lowerContainer}>
          <History />
        </div>
      </div>
    </div>
  );
}

export default User;
