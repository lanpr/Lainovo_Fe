import React, { useState, useEffect } from "react";
import axios from "axios";
function OrderData() {
  const [orders, setOrders] = useState([]);
  const headers = {
    Authorization: "bearer " + sessionStorage.getItem("accessToken"),
    "Content-Type": "application/json", // Thêm các headers khác nếu cần
  };

  const fetchOrder = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/order/getAll", {});
      const modifiedorder = response.data.data
      setOrders(modifiedorder);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };
  const getOrderbyId = async (id) => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/order/" + id, {});
      return response.data.data;
    } catch (error) {
      return null;
    }
  }
  const updateOrder = async (orders) => {
    try {
      const response = await axios.put("http://localhost:8080/api/v1/order/update" , orders,{headers:headers});
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return {
    orders,
    fetchOrder,
    getOrderbyId,
    updateOrder
  }; // Trả về cả fetchGenres và addGenres
}

export default OrderData;
