import React, { useState, useEffect } from "react";
import axios from "axios";
function CoverData() {
  const [covers, setCovers] = useState([]);
  const [coversSL, setCoverSL] = useState([]);
  
  const headers = {
    Authorization: "bearer " + sessionStorage.getItem("accessToken"),
    "Content-Type": "application/json", // Thêm các headers khác nếu cần
  };

  const fetchCovers = async () => {
    try {
      const token = "your_actual_access_token_value";
      const response = await axios.get(
        "http://localhost:8080/api/v1/cover/all",
        {}
      );
      const modifiedCovers = response.data.data.map((cover) => ({
        id: cover.coverID,
        coverType: cover.coverType,
      }));
      setCovers(modifiedCovers);
    } catch (error) {
      console.error("Error fetching Covers:", error);
    }
  };
  const GetCoverSelect = async (id) => {
    try {

        const response = await axios.get('http://localhost:8080/api/v1/publications_cover/' + id, {headers:headers});
        return response.data.data;
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
};

  const addCovers = async (data) => {
    try {
      const token = "your_actual_access_token_value";
      const response = await axios.post(
        "http://localhost:8080/api/v1/cover",
        data,{headers:headers}
      );
      fetchCovers();
    } catch (error) {
      console.error("Error adding genre:", error);
    }
  };
  const updateCovers = async (id, data) => {
    console.log(id);
    try {
      const token = "your_actual_access_token_value";
      const response = await axios.put(
        "http://localhost:8080/api/v1/cover/" + id,
        data,{headers:headers}
      );
      fetchCovers();
    } catch (error) {
      console.error("Error adding genre:", error);
    }
  };
  const deleteCovers = async (id) => {
    console.log(id);
    try {
      const token = "your_actual_access_token_value";
      const response = await axios.delete(
        "http://localhost:8080/api/v1/cover/" + id,
        {headers:headers}
      );
      fetchCovers();
      return true;
    } catch (error) {
      console.error("Error adding genre:", error);
      return false;
    }
  };
  const findCover = async (name) => {
    try {
      if (name !== null && name !== "") {
        const token = "your_actual_access_token_value";
        const response = await axios.get(
          "http://localhost:8080/api/v1/cover/search/" + name,
          {}
        );
        const modifiedCovers = response.data.data.map((cover) => ({
          id: cover.coverID,
          coverType: cover.coverType,
        }));
        setCovers(modifiedCovers);
      } else {
        const token = "your_actual_access_token_value";
        const response = await axios.get(
          "http://localhost:8080/api/v1/cover/all",
          {}
        );
        const modifiedCovers = response.data.data.map((cover) => ({
          id: cover.coverID,
          coverType: cover.coverType,
        }));
        setCovers(modifiedCovers);
      }
    } catch (error) {
      return error;
    }
  };
  const CoverSelect = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/cover/all', {headers:headers});
      const modifiedCover = response.data.data.map(cover => ({
        value: cover.coverID,
        label: cover.coverType
      }));
      setCoverSL(modifiedCover);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  }

  useEffect(() => {
    fetchCovers();
    CoverSelect();
  }, []);

  return {
    covers,
    fetchCovers,
    addCovers,
    updateCovers,
    deleteCovers,
    findCover,
    coversSL,
    GetCoverSelect
  }; // Trả về cả fetchGenres và addGenres
}

export default CoverData;
