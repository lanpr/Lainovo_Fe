import { useState, useEffect } from "react";
import axios from "axios";
import CoverData from "../Services/CoverData";
import GenreData from "../Services/GenreData";
import TypeData from "../Services/TypeData";
import GiftData from "../Services/GiftData";

function PublicData() {
    const [publics, setPublics] = useState([]);
    const { GetCoverSelect } = CoverData();
    const { GetGenreSelect } = GenreData();
    const { GetTypeSelect } = TypeData();
    const { GetGiftSelect } = GiftData();
    const headers = {
        Authorization: "bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json", // Thêm các headers khác nếu cần
    };
    const fetchPublics = async () => {
        try {
            const token = 'your_actual_access_token_value';
            const response = await axios.get('http://localhost:8080/api/v1/publications/all', {});
            setPublics(response.data.data);
        } catch (error) {
            console.error('Error fetching Publics:', error);
        }
    };
    const addPublics = async (publics, imagePaths, genres, covers, types, gifts) => {
        try {
            const token = 'your_actual_access_token_value';
            const response = await axios.post('http://localhost:8080/api/v1/publications', publics, { headers: headers });
            const data = response.data.data
            const responseImage = await axios.post('http://localhost:8080/api/v1/images/' + data.publicationsID, imagePaths, { headers: headers })
                .then((responseImage) => {
                    return true;
                })
                .catch((error) => {
                    console.error(error);
                    return false;
                });
            if (genres !== null) {
                const listGenres = genres.map(genre => genre.value);
                const responseGenres = await axios.post('http://localhost:8080/api/v1/publications_genre/' + data.publicationsID, listGenres, { headers: headers })
            }
            if (covers !== null) {
                const listCovers = covers.map(cover => cover.value);
                const responseCovers = await axios.post('http://localhost:8080/api/v1/publications_cover/' + data.publicationsID, listCovers, { headers: headers })
            }
            if (types !== null) {
                const listTypes = types.map(type => type.value);
                const responseTypes = await axios.post('http://localhost:8080/api/v1/publications_type/' + data.publicationsID, listTypes, { headers: headers })
            }
            if (gifts !== null) {
                const listGifts = gifts.map(gift => gift.value);
                const responseGifts = await axios.post('http://localhost:8080/api/v1/publications_gift/' + data.publicationsID, listGifts, { headers: headers })
            }
        } catch (error) {
            console.error('Error fetching publication:', error);
            return false;
        }
        fetchPublics();
    };
    const updatePublics = async (id, publics, imagePaths, genres, covers, types, gifts) => {
        try {
            const response = await axios.put('http://localhost:8080/api/v1/publications/' + id, publics, { headers: headers });
            const data = response.data.data
            if (imagePaths.length !== 0) {
                const responseDelImage = await axios.delete('http://localhost:8080/api/v1/images/delImage/' + id, { headers: headers });
                const responseImage = await axios.post('http://localhost:8080/api/v1/images/' + data.publicationsID, imagePaths, { headers: headers })
                    .then((responseImage) => {
                        return true;
                    })
                    .catch((error) => {
                        console.error(error);
                        return false;
                    });
            }
            if (genres !== null) {
                const listGenres = genres.map(genre => genre.value);
                const genreSelectData = await GetGenreSelect(id);
                if (genreSelectData.length === 0) {
                    const responseGenres = await axios.post('http://localhost:8080/api/v1/publications_genre/' + id, listGenres, { headers: headers })
                } else {
                    const del = await axios.delete('http://localhost:8080/api/v1/publications_genre/' + id, { headers: headers });
                    const responseGenres = await axios.post('http://localhost:8080/api/v1/publications_genre/' + id, listGenres, { headers: headers })
                }
            }
            if (covers !== null) {
                const listCovers = covers.map(cover => cover.value);
                const coverSelectData = await GetCoverSelect(id);
                if (coverSelectData.length === 0) {
                    const responseCovers = await axios.post('http://localhost:8080/api/v1/publications_cover/' + id, listCovers, { headers: headers })
                } else {
                    const del = await axios.delete('http://localhost:8080/api/v1/publications_cover/' + id, { headers: headers });
                    const responseCovers = await axios.post('http://localhost:8080/api/v1/publications_cover/' + id, listCovers, { headers: headers })
                }
            }
            if (types !== null) {
                const listTypes = types.map(type => type.value);
                const typeSelectData = await GetTypeSelect(id);
                if (typeSelectData.length === 0) {
                    const responseTypes = await axios.post('http://localhost:8080/api/v1/publications_type/' + id, listTypes, { headers: headers })
                } else {
                    const del = await axios.delete('http://localhost:8080/api/v1/publications_type/' + id, { headers: headers });
                    const responseTypes = await axios.post('http://localhost:8080/api/v1/publications_type/' + id, listTypes, { headers: headers })
                }
            }
            if (gifts !== null) {
                const listGifts = gifts.map(gift => gift.value);
                const giftSelectData = await GetGiftSelect(id);
                if (giftSelectData.length === 0) {
                    const responseGifts = await axios.post('http://localhost:8080/api/v1/publications_gift/' + id, listGifts, { headers: headers })
                } else {
                    const del = await axios.delete('http://localhost:8080/api/v1/publications_gift/' + id, { headers: headers });
                    const responseGifts = await axios.post('http://localhost:8080/api/v1/publications_gift/' + id, listGifts, { headers: headers })
                }
            }

        } catch (error) {
            console.error('Error fetching publication:', error);
            return false;
        }
        fetchPublics();
    };
    const findPublic = async (name) => {
        if (name !== null && name !== '') {
            const response = await axios.get("http://localhost:8080/api/v1/publications/search/" + name, {});
            setPublics(response.data.data)
        } else {
            const response = await axios.get("http://localhost:8080/api/v1/publications/all", {});
            setPublics(response.data.data)
        }
    }
    useEffect(() => {
        fetchPublics()
    }, []);

    return { publics, fetchPublics, addPublics, updatePublics, findPublic }; // Trả về cả fetchGenres và addGenres
}
export default PublicData;