// ChangeAddress.jsx
import React, { useState, useEffect } from "react";
import InputUser from "../InputUser/InputUser";
import Toast from "../ToastMessage/Toast";
import {
  fetchUserAddress,
  fetchUpdateAddress,
  fetchCreateAddress,
} from "../../../../services/Service";

function ChangeAddress() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState(["", ""]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
    // Set initial phone number
    setPhoneNumber("(+8x) ");
  }, []);

  const updateOrCreateAddress = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
        setToastMessage("Update/Create Address Fail!");
        setToastType("error");
        setShowToast(true);
        console.log("Phone number is in wrong format");
        return;
      }
      try {
        let userHasAddress = true;
        try {
          await fetchUserAddress();
        } catch (error) {
          if (error.response && error.response.status === 404) {
            userHasAddress = false;
          } else {
            throw error;
          }
        }
        if (userHasAddress) {
          await fetchUpdateAddress(address, phoneNumber);
          setToastMessage("Update Address Success!");
          setToastType("success");
          setShowToast(true);
        } else {
          // Check if the fields are not empty
          if (!validateEmptyFields(address, phoneNumber)) {
            setToastMessage("Create Address Fail!");
            setToastType("error");
            setShowToast(true);
            return;
          } else {
            await fetchCreateAddress(address, phoneNumber);
            setToastMessage("Create Address Success!");
            setToastType("success");
            setShowToast(true);
          }
        }
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        setToastMessage("Update/Create Address Fail!");
        setToastType("error");
        setShowToast(true);
      }
    } else {
      console.log("User is not logged in!");
    }
  };
  // ----------------------------------------------------------------

  // Validate Empty Fields
  const validateEmptyFields = (address, phoneNumber) => {
    let valid = true;
    let errors = ["", ""];

    if (!phoneNumber) {
      errors[0] = "Phone number cannot be empty!";
      valid = false;
    }

    if (!address) {
      errors[1] = "Address cannot be empty!";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  //-------------------------------------------------------------------------------

  // Validate Phone Number
  const validatePhoneNumber = (number) => {
    let valid = true;
    const length = number.replace(/\D/g, "").length; // remove non-digit characters
    if (length < 10 || length > 15) {
      setErrors((prevErrors) => [
        "Phone number from 10 - 15 digits!",
        prevErrors[0],
      ]);
      valid = false;
    } else if (
      !/^\(\+\d{2,3}\) \d{9}$/.test(number) &&
      !/^0\d{9}$/.test(number)
    ) {
      setErrors((prevErrors) => [
        "Phone number must be in format 0xxxxxxxxxx or (+xx) xxxxxxxxx!",
        prevErrors[0],
      ]);
      valid = false;
    }
    if (/[^0-9\(\)\+\s]/.test(number)) {
      setErrors((prevErrors) => [
        "Phone number must only contain digits!",
        prevErrors[0],
      ]);
      valid = false;
    }
    if (valid) {
      setErrors((prevErrors) => [prevErrors[0], ""]);
    }
    return valid;
  };
  // ----------------------------------------------------------------

  const fields = [
    {
      label: "New Phone Number *",
      type: "tel",
      placeholder: "",
      value: phoneNumber,
      onChange: (e) => setPhoneNumber(e.target.value),
    },
    {
      label: "New Address *",
      type: "text",
      placeholder: "Enter your new address",
      value: address,
      onChange: (e) => setAddress(e.target.value),
    },
  ];

  return (
    <div>
      <InputUser
        title="Change Address"
        fields={fields}
        onSubmit={updateOrCreateAddress}
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

export default ChangeAddress;
