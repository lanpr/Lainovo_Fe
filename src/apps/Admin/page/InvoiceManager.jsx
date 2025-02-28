import React, { useEffect, useState } from "react";
import OrderData from "../Services/OrderData";
import moment from "moment/moment";
import Select from "react-tailwindcss-select";
import { Card } from "react-bootstrap";
import { AlertAdmin } from "../components/Alert";
import FormButton from "../components/FormButton";

function Invoice() {
  const { orders, updateOrder, fetchOrder } = OrderData();
  const [orderStatus, setorderStatus] = useState();
  const [payment, setPayment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [Order, setOrder] = useState();
  const [vali, setVali] = useState("");
  const [info, setInfo] = useState("");

  const handleOrderStatusChange = (value) => {
    setorderStatus(value);
  };
  const handlePayment = (value) => {
    setPayment(value);
  };
  const handleRowClick = (id) => {
    const selected = orders.find((o) => o.orderID === id);
    setOrder(selected);
    setItemList(selected.orderItem);
    setorderStatus(orderSta.find((o) => o.value === selected.orderStatus));
    setPayment(paymentSta.find((p) => p.value === selected.paymentStatus));
  };
  const updateOrders = async (order) => {
    order.orderStatus = orderStatus.value;
    order.paymentStatus = payment.value;
    order.orderDay = new Date();
    const response = await updateOrder(order);
    if (response != null) {
      fetchOrder();
      setVali("success");
      setInfo("Update success!");
    } else {
      setVali("error");
      setInfo("Update fail!");
    }
  };
  const OderTH = [
    { names: "Customer" },
    { names: "Phone Number" },
    { names: "Address" },
    { names: "Total" },
    { names: "Order Status" },
    { names: "Payment Status" },
    { names: "Order Day" },
  ];
  const ItemTH = [
    { names: "Order Id" },
    { names: "Publication" },
    { names: "Quantity" },
  ];
  const formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });
  const orderSta = [
    { value: "Wait for confirmation!", label: "Wait for confirmation" },
    { value: "Confirmed!", label: "Confirmed" },
    { value: "In progress!", label: "In progress" },
    { value: "Delivering!", label: "Delivering" },
    { value: "Delivered!", label: "Delivered" },
  ];
  const paymentSta = [
    { value: false, label: "Unpaid" },
    { value: true, label: "Paid" },
  ];
  useEffect(() => {
    // Xác định hàm để ẩn AlertAdmin sau 5 giây
    const hideAlert = setTimeout(() => {
      setVali("");
      setInfo("");
    }, 5000);

    // Clear timeout khi component unmount để tránh memory leaks
    return () => clearTimeout(hideAlert);
  }, [vali, info]);
  return (
    <div className="h-screen pt-12">
      <div className="mt-4 ">
        <div className="text-black text-start">
          <h3 className="font-bold">Manage Invoice</h3>
        </div>
      </div>
      <div className="flex mt-3 mb-2">
        <div className="py-2 flex-col  ms-1 w-3/12 ">
          <label>Order Status</label>
          <Select
            value={orderStatus}
            onChange={handleOrderStatusChange}
            options={orderSta}
            placeholder="Order Status"
          />
        </div>
        <div className="py-2 flex-col  ms-1 w-3/12 ">
          <label>Payment Status</label>
          <Select
            value={payment}
            onChange={handlePayment}
            options={paymentSta}
            placeholder="Payment Status"
            isDisabled={payment.value ? true : false}
          />
        </div>
      </div>
      <div className="flex gap-1">
        <FormButton content={"Update"} onClick={() => updateOrders(Order)} />
        <FormButton
          content={"Detail Invoice"}
          onClick={() => setShowModal(true)}
        />
      </div>
      <AlertAdmin vali={vali} info={info} />
      <div className="h-96 border-2 border-black overflow-auto">
        <div className="text-center bg-[#92814d] font-bold">
          <span>Invoice</span>
        </div>
        <table className="w-full h-full">
          <thead className="border-b border-black bg-[#c2aa67]  ">
            <tr>
              {OderTH.map((item, index) => (
                <th
                  className=" text-center font-normal border-r border-black"
                  key={index}
                >
                  {item.names}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                name={rowIndex}
                onClick={() => handleRowClick(item.orderID)}
                className="cursor-pointer border-b  border-black hover:bg-gray-400"
              >
                <td className="text-center border-r border-black">
                  {item.fullname}
                </td>
                <td className="text-center border-r border-black">
                  {item.phoneNumber}
                </td>
                <td className="text-center border-r border-black">
                  {item.address}
                </td>
                <td className="text-center border-r border-black">
                  {formatter.format(item.totalPrice)}{" "}
                </td>
                <td className="text-center border-r border-black">
                  {item.orderStatus}
                </td>
                <td className="text-center border-r border-black">
                  {item.paymentStatus ? "Paid" : "Unpaid"}
                </td>
                <td className="text-center border-r border-black">
                  {moment(item.orderDay).format("DD-MM-YYYY hh:mm:ss A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal ? (
        <>
          <div className=" justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full h-2/3  mx-auto max-w-3xl ">
              <div className="h-screen border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">List Item</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="p-4 w-full grid grid-cols-3 overflow-y-scroll">
                  {itemList.map((item, key) => (
                    <Card className="bg-dark w-2/3  text-black" key={key}>
                      <Card.Img src={item.publications.images[0].imageURL} />
                      <Card.ImgOverlay className="">
                        <span>{item.publications.publicationsName}</span>
                        <Card.Text>Quantity: {item.quantity}</Card.Text>
                      </Card.ImgOverlay>
                    </Card>
                  ))}
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
export default Invoice;
