import React, { useState, useEffect } from "react";
import axios from "axios";
function TypeData() {
  const [types, setTypes] = useState([]);
  const [typesSL, setTypeSL] = useState([]);

  const headers = {
    Authorization: "bearer " + sessionStorage.getItem("accessToken"),
    "Content-Type": "application/json", // Thêm các headers khác nếu cần
  };
  const fetchTypes = async () => {
    try {
      
      const response = await axios.get(
        "http://localhost:8080/api/v1/type/all",
        {}
      );
      const modifiedTypes = response.data.data.map((type) => ({
        id: type.typeID,
        typeName: type.typeName,
      }));
      setTypes(modifiedTypes);
    } catch (error) {
      console.error("Error fetching Types:", error);
    }
  };

  const addTypes = async (data) => {
    try {
      
      const response = await axios.post(
        "http://localhost:8080/api/v1/type",
        data,{headers:headers}
      );
      fetchTypes();
    } catch (error) {
      console.error("Error adding Type:", error);
    }
  };
  const updateTypes = async (id, data) => {
    try {
      
      const response = await axios.put(
        "http://localhost:8080/api/v1/type/" + id,
        data,{headers:headers}
      );
      fetchTypes();
    } catch (error) {
      console.error("Error adding Type:", error);
    }
  };
  const deleteTypes = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/v1/type/" + id,
        {headers:headers}
      );
      fetchTypes();
      return true;
    } catch (error) {
      return false;
    }
  };
  const findType = async (name) => {
    try {
      if (name !== null && name !== "") {
        const response = await axios.get(
          "http://localhost:8080/api/v1/type/search/" + name,
          {}
        );
        const modifiedTypes = response.data.data.map((type) => ({
          id: type.typeID,
          typeName: type.typeName,
        }));
        setTypes(modifiedTypes);
      } else {
        const response = await axios.get(
          "http://localhost:8080/api/v1/type/all",
          {}
        );
        const modifiedTypes = response.data.data.map((type) => ({
          id: type.typeID,
          typeName: type.typeName,
        }));
        setTypes(modifiedTypes);
      }
    } catch (error) {
      return error;
    }
  };
  const TypeSelect = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/type/all', {});
      const modifiedCover = response.data.data.map(type => ({
        value: type.typeID,
        label: type.typeName
      }));
      setTypeSL(modifiedCover);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };
  const GetTypeSelect = async (id) => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/publications_type/' + id, {headers:headers});
        return response.data.data;
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
};

  useEffect(() => {
    fetchTypes();
    TypeSelect();
  }, []);

  return {
    types,
    fetchTypes,
    addTypes,
    updateTypes,
    deleteTypes,
    findType,
    typesSL,
    GetTypeSelect
  }; // Trả về cả fetchTypes và addTypes
}

export default TypeData;
