import React from "react";
import Modal from "react-modal";
import Style from "../ModalComponent/Modal.module.scss";

function OrderModal({ isOpen, onRequestClose, order }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={Style.modal}
    >
      {order && (
        <>
          <h1>Order Details</h1>
          <table>
            <thead>
              <tr>
                <th>Code Order</th>
                <th>Name Product</th>
                <th>Image</th>
                <th>Total Price</th>
                <th>Quantity</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Publishing Year</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItem.map((item, index) => {
                const totalPrice = item.publications.unitPrice * item.quantity;
                return (
                  <tr key={index}>
                    <td>{order.displayID}</td>
                    <td>{item.publications.publicationsName}</td>
                    <td>
                      <img
                        src={item.publications.images[0].imageURL}
                        alt={item.publications.publicationsName}
                        width="300px"
                        height="300px"
                      />
                    </td>
                    <td>{totalPrice.toLocaleString("vi-VN")}₫</td>{" "}
                    <td>{item.quantity}</td>
                    <td>{item.publications.author}</td>
                    <td>{item.publications.publisher}</td>
                    <td>{item.publications.publicationYear}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </Modal>
  );
}

export default OrderModal;
