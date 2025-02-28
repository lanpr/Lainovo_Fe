// Info.jsx
import React, { useState, useEffect } from "react";
import styles from "../Info/Info.module.scss";
import { fetchUserInfo, fetchUserAddress } from "../../../../services/Service";
import Toast from "../ToastMessage/Toast";

function Info() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        try {
          setIsLoggedIn(true);
          const userInfoResponse = await fetchUserInfo();
          setUserInfo(userInfoResponse.data.data);
          const userAddressResponse = await fetchUserAddress();
          setUserAddress(userAddressResponse.data.data);
        } catch (error) {
          console.error("Error fetching user info or address: ", error);
          setToastMessage("User has no address yet!");
          setToastType("error");
          setShowToast(true);
        }
      } else {
        setIsLoggedIn(false);
        setToastMessage("User is not logged in");
        setToastType("error");
        setShowToast(true);
      }
    })();
  }, []);

  const info = [
    { field: "Full Name", value: userInfo?.fullName },
    { field: "Email", value: userInfo?.email },
    { field: "Phone Number", value: userAddress?.phoneNumber },
    { field: "Address", value: userAddress?.address },
  ];

  return (
    <div className={styles.column}>
      <div className={styles.details}>
        <h1>Account Information</h1>
        <hr className={styles.line} />
        {isLoggedIn ? (
          userAddress ? (
            info.map((item, index) => (
              <p key={index}>
                <span>{item.field}</span>: {item.value}
              </p>
            ))
          ) : (
            <p style={{ color: "red", fontSize: "20px" }}>
              User has no address yet!
            </p>
          )
        ) : (
          <p style={{ color: "red", fontSize: "20px" }}>
            User is not logged in!
          </p>
        )}
      </div>
      <Toast
        message={toastMessage}
        type={toastType}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </div>
  );
}
export default Info;
