import { useState, useEffect } from "react";
import axios from "axios";
function GiftData() {
    const [GiftsSL, setGiftSL] = useState([]);
    const [Gifts, setGifts] = useState([]);
    const headers = {
        Authorization: "bearer " + sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json", // Thêm các headers khác nếu cần
      };
    const fetchGifts = async () => {
        try {
            const token = 'your_actual_access_token_value';
            const response = await axios.get('http://localhost:8080/api/v1/gift/all', {});
            const modifiedGifts = response.data.data.map(Gift => ({
                promotionalGiftID: Gift.promotionalGiftID,
                GiftName: Gift.promotionalGiftName,
                GiftType: Gift.promotionalGiftType
            }));
            setGifts(modifiedGifts);
        } catch (error) {
            console.error('Error fetching Gifts:', error);
        }
    };
    const addGifts = async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/gift', data,{headers:headers});
            fetchGifts();
        } catch (error) {
            console.error('Error adding genre:', error);
        }
    };
    const GetGiftSelect = async (id) => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/publications_gift/' + id, {headers:headers});
            return response.data.data;
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };
    const updateGifts = async (id, data) => {
        try {
            const response = await axios.put('http://localhost:8080/api/v1/gift/' + id, data,{headers:headers});
            fetchGifts();
        } catch (error) {
            console.error('Error adding genre:', error);
        }
    };
    const deleteGifts = async (id) => {
        try {
            const response = await axios.delete('http://localhost:8080/api/v1/gift/' + id, {headers:headers});
            fetchGifts();
            return true;
        } catch (error) {
            console.error('Error adding genre:', error);
            return false;
        }
    };
    const findGift = async (name) => {
        try {
            if (name !== null && name !== '') {
               
                const response = await axios.get('http://localhost:8080/api/v1/gift/search/' + name, {});
                const modifiedGifts = response.data.data.map(Gift => ({
                    promotionalGiftID: Gift.promotionalGiftID,
                    GiftName: Gift.promotionalGiftName,
                    GiftType: Gift.promotionalGiftType
                }));
                setGifts(modifiedGifts);
            } else {
               
                const response = await axios.get('http://localhost:8080/api/v1/gift/all', {});
                const modifiedGifts = response.data.data.map(Gift => ({
                    promotionalGiftID: Gift.promotionalGiftID,
                    GiftName: Gift.promotionalGiftName,
                    GiftType: Gift.promotionalGiftType
                }));
                setGifts(modifiedGifts);
            }
        } catch (error) {
            return error;
        }
    }
    const GiftSelect = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/gift/all', {});
            const modifiedGifts = response.data.data.map(Gift => ({
                value: Gift.promotionalGiftID,
                label: Gift.promotionalGiftName
            }));
            setGiftSL(modifiedGifts);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    }

    useEffect(() => {
        fetchGifts();
        GiftSelect();
    }, []);

    return { Gifts, fetchGifts, addGifts, updateGifts, deleteGifts,findGift,GiftsSL ,GetGiftSelect}; // Trả về cả fetchGenres và addGenres
}

export default GiftData;