import React, { useState, useEffect } from "react";
import InputUser from "../InputUser/InputUser";
import Toast from "../ToastMessage/Toast";
import { fetchChangePassword } from "../../../../services/Service";

function ChangePassword() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(["", "", ""]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [passwordChecked, setPasswordChecked] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const changePassword = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      if (!validateForm()) {
        return;
      }
      try {
        const response = await fetchChangePassword(
          password,
          newPassword,
          confirmPassword
        );
        if (response.data.status === "fail") {
          setToastMessage("Change Password Fail!");
          setToastType("error");
          setShowToast(true);
        } else {
          setToastMessage("Change Password Success!");
          setToastType("success");
          setShowToast(true);
          setErrors(["", "", ""]);

          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        }
      } catch (error) {
        setToastMessage("Change Password Fail!");
        setToastType("error");
        setShowToast(true);
      }
    } else {
      console.log("User is not logged in!");
    }
  };

  useEffect(() => {
    setPasswordChecked(false);
  }, [password]);

  const validateForm = async () => {
    let valid = true;
    const newErrors = ["", "", ""];

    if (isLoggedIn && !passwordChecked) {
      try {
        const response = await fetch("/api/v1/customer/verifyPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: password }),
        });

        if (!response.valid) {
          newErrors[0] = "Old password is incorrect!";
          valid = false;
        }

        setPasswordChecked(true);
      } catch (error) {
        console.error("Error verifying old password:", error);
      }
    }

    if (!password.trim()) {
      newErrors[0] = "Field cannot be empty!";
      valid = false;
    }

    if (!newPassword.trim()) {
      newErrors[1] = "Field cannot be empty!";
      valid = false;
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(newPassword)) {
      newErrors[1] = "Password format is incorrect!";
      valid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors[2] = "Field cannot be empty!";
      valid = false;
    } else if (newPassword && newPassword !== confirmPassword) {
      newErrors[1] = "New password does not match!";
      newErrors[2] = "Confirm password does not match!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const fields = [
    {
      label: "Old Password *",
      type: "password",
      name: "oldPassword",
      placeholder: "Enter Old Password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      error: errors[0],
    },
    {
      label: "New Password *",
      type: "password",
      name: "newPassword",
      placeholder: "Enter New Password",
      value: newPassword,
      onChange: (e) => setNewPassword(e.target.value),
      error: errors[1],
    },
    {
      label: "Confirm Password *",
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
      error: errors[2],
    },
  ];

  return (
    <div>
      <InputUser
        title="Change Password"
        fields={fields}
        onSubmit={changePassword}
        errors={errors}
      />
      <Toast
        message={toastMessage}
        type={toastType}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </div>
  );
}

export default ChangePassword;
