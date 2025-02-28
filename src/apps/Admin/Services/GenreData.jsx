import React, { useState, useEffect } from "react";
import axios from "axios";

function GenreData() {
    const [genres, setGenres] = useState([]);
    const [genresSL, setGenresSL] = useState([]);

    const headers = {
        Authorization: "bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json", // Thêm các headers khác nếu cần
    };

    const fetchGenres = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/v1/genre/all",
                {}
            );
            const modifiedGenres = response.data.data.map((genre) => ({
                id: genre.genreID,
                genre: genre.genre,
            }));
            setGenres(modifiedGenres);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };
    const GetGenreSelect = async (id) => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/v1/publications_genre/" + id,
                {headers:headers}
            );
            return response.data.data;
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    const addGenres = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/genre/create",
                data,
                { headers: headers }
            );
            fetchGenres();
        } catch (error) {
            console.error("Error adding genre:", error);
        }
    };
    const updateGenres = async (id, data) => {
        console.log(id);
        try {
            const response = await axios.put(
                "http://localhost:8080/api/v1/genre/" + id,
                data, { headers: headers }
            );
            fetchGenres();
        } catch (error) {
            console.error("Error adding genre:", error);
        }
    };
    const deleteGenres = async (id) => {
        try {
            const response = await axios.delete(
                "http://localhost:8080/api/v1/genre/" + id,
                { headers: headers }
            );
            fetchGenres();
            return true;
        } catch (error) {
            return false;
        }
    };
    const findGenre = async (name) => {
        try {
            if (name !== null && name !== "") {
                const response = await axios.get(
                    "http://localhost:8080/api/v1/genre/search/" + name,
                    {}
                );
                const modifiedGenres = response.data.data.map((genre) => ({
                    id: genre.genreID,
                    genre: genre.genre,
                }));
                setGenres(modifiedGenres);
            } else {
                const response = await axios.get(
                    "http://localhost:8080/api/v1/genre/all",
                    {}
                );
                const modifiedGenres = response.data.data.map((genre) => ({
                    id: genre.genreID,
                    genre: genre.genre,
                }));
                setGenres(modifiedGenres);
            }
        } catch (error) {
            return error;
        }
    };
    const GenreSelect = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/v1/genre/all",
                {}
            );
            const modifiedGenres = response.data.data.map((genre) => ({
                value: genre.genreID,
                label: genre.genre,
            }));
            setGenresSL(modifiedGenres);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    useEffect(() => {
        fetchGenres();
        GenreSelect();
    }, []);

    return {
        genres,
        fetchGenres,
        addGenres,
        updateGenres,
        deleteGenres,
        findGenre,
        genresSL,
        GetGenreSelect,
    }; // Trả về cả fetchGenres và addGenres
}

export default GenreData;
