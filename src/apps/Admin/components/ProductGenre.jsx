import React, { useState, useEffect } from "react";
import axios from "axios";
import MultiSelect from "./Multiple_Select";



export default function ProductGenre() {
    useEffect(() => {
        const [genres, setGenres] = useState([]);
        const fetchGenres = async () => {
            try {
                const token = 'your_actual_access_token_value';
                const response = await axios.get('http://localhost:8080/api/v1/genre/all', {});
                const modifiedGenres = response.data.data.map(genre => ({
                    value: genre.genreID,
                    label: genre.genre
                }));
                setGenres(modifiedGenres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
    }, []);
}

