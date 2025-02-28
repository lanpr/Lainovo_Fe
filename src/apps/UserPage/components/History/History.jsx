import React, { useState, useEffect } from "react";
import styles from "../History/History.module.scss";
import { fetchHistory } from "../../../../services/Service";
import { jwtDecode } from "jwt-decode";
import OrderModal from "../History/ModalComponent/Modal";

function History() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        const jwtPayload = jwtDecode(token);
        const customerId = jwtPayload.customerId;
        console.log(customerId);
        try {
          const historyResponse = await fetchHistory(customerId);
          // setPurchaseHistory(historyResponse.data.data);

          const dataWithRandomCode = historyResponse.data.data.map((order) => {
            let randomCode = localStorage.getItem(order.orderID);
            if (!randomCode) {
              randomCode =
                String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                Math.floor(Math.random() * 10000)
                  .toString()
                  .padStart(4, "0");
              localStorage.setItem(order.orderID, randomCode);
            }
            return { ...order, displayID: randomCode };
          });
          setPurchaseHistory(dataWithRandomCode);
        } catch (error) {
          console.error("Error fetching purchase history: ", error);
        }
      } else {
        setPurchaseHistory([]);
      }
    })();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={styles.history}>
      <h1>Purchase History</h1>
      <table>
        <thead>
          <tr>
            <th>Code Order</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
            <th>Order Status</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {purchaseHistory.map((order, index) => {
            const totalQuantity = order.orderItem.reduce(
              (total, item) => total + item.quantity,
              0
            );

            return (
              <tr key={index} onClick={() => openModal(order)}>
                <td>{order.displayID}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.address}</td>
                <td>{totalQuantity}</td>
                <td>{order.totalPrice.toLocaleString("vi-VN")}₫</td>
                <td>{order.paymentStatus ? "Paid" : "Unpaid"}</td>
                <td>{order.orderStatus}</td>
                <td>{new Date(order.orderDay).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <OrderModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        order={selectedOrder}
      />
    </div>
  );
}

export default History;
