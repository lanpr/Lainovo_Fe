import React, { useState, useEffect } from "react";
import CustomerStyle from "../scss/CustomerManager.module.scss";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import {
  fetchAllCustomers,
  fetchUpdateStatusCustomers,
  fetchCustomersWithEmail,
} from "../../../services/Service";

function CustomerManager() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isBlocked, setBlocked] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const response = await fetchAllCustomers();
      setCustomers(response.data.data);
    };
    fetchCustomerData();
  }, []);

  const handleRadioChange = (e) => {
    setBlocked(e.target.value === "1");
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setCustomerId(customer.customerId);
    setFullName(customer.fullName);
    setEmail(customer.email);
    if (customer.addresses) {
      setPhoneNumber(customer.addresses.phoneNumber);
      setAddress(customer.addresses.address);
    } else {
      setPhoneNumber("");
      setAddress("");
    }
    setBlocked(customer.isBlocked);
  };

  const refreshCustomerData = async () => {
    const response = await fetchAllCustomers();
    setCustomers(response.data.data);
  };

  const handleUpdateStatusCustomer = async (event) => {
    event.preventDefault();
    if (typeof selectedCustomer === "undefined" || selectedCustomer === null) {
    } else {
      try {
        const response = await fetchUpdateStatusCustomers({
          customerId: selectedCustomer.customerId,
          isBlocked,
        });
        if (response.status === 200) {
          setMessage("Customer updated successfully");
          setIsSuccess(true);
          refreshCustomerData();
          setTimeout(() => {
            setMessage("");
          }, 1000);
        } else {
          setMessage("Failed to update customer");
          setIsSuccess(false);
          setTimeout(() => {
            setMessage("");
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSearchCustomer = async (searchQuery) => {
    if (searchQuery.trim() === "") {
      const response = await fetchAllCustomers();
      if (response.status === 200) {
        console.log(response.data.data);
        setCustomers(response.data.data);
      } else {
        setCustomers([]);
      }
      return;
    }

    const response = await fetchCustomersWithEmail(searchQuery);
    if (response.status === 200 && response.data.data.length > 0) {
      setCustomers(response.data.data);
    } else {
      setCustomers([]);
      ``;
    }
  };

  return (
    <div className={CustomerStyle.customerWrapper}>
      <div className={CustomerStyle.customerContainer}>
        <h4>Manager customer</h4>
        <form>
          <FormInput
            placeholder={"Full name"}
            label={"Full name"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disable={true}
          />
          <FormInput
            placeholder={"Email"}
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disable={true}
          />

          <FormInput
            placeholder={"Phone number"}
            label={"Phone number"}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disable={true}
          />
          <FormInput
            placeholder={"Address"}
            label={"Address"}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disable={true}
          />
          <div className={CustomerStyle.radioStyle}>
            <label htmlFor="">Block account</label>
            <div>
              <input
                type="radio"
                id="choice1"
                name="choice"
                value="1"
                checked={isBlocked}
                onChange={handleRadioChange}
              />
              <label htmlFor="choice1">Block</label>
            </div>
            <div>
              <input
                type="radio"
                id="choice2"
                name="choice"
                value="2"
                checked={!isBlocked}
                onChange={handleRadioChange}
              />
              <label htmlFor="choice2">Not block</label>
            </div>
          </div>
          <div>
            <FormButton
              content={"Update"}
              onClick={(event) => handleUpdateStatusCustomer(event)}
            />
          </div>
        </form>
        <div className={CustomerStyle.tableWrapper}>
          <FormInput
            label={"Search employee"}
            type={"search"}
            onChange={(e) => handleSearchCustomer(e.target.value)}
          />
          {message && (
            <div className={CustomerStyle.messageWrapper}>
              <div style={{ color: isSuccess ? "green" : "red" }}>
                {message}
              </div>
            </div>
          )}
          <table>
            <thead>
              <tr>
                <td>Full name</td>
                <td>Email</td>
                <td>Phone number</td>
                <td>Address</td>
                <td>Blocked</td>
              </tr>
            </thead>
            <tbody>
              {customers &&
                customers.map((customer) => (
                  <tr
                    key={customer.id}
                    onClick={() => handleRowClick(customer)}
                  >
                    <td>{customer.fullName}</td>
                    <td>{customer.email}</td>
                    <td>
                      {!customer.addresses
                        ? "No phone number yet"
                        : customer.addresses.phoneNumber}
                    </td>
                    <td>
                      {!customer.addresses
                        ? "No address yet"
                        : customer.addresses.address}
                    </td>
                    <td>{customer.isBlocked ? "Yes" : "No"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerManager;
