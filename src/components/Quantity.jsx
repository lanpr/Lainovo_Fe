import React, { useState } from 'react';

function Quantity({ initialQuantity, onChange, type, id, name }) {
    const [quantity, setQuantity] = useState(initialQuantity || 1); 

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onChange(newQuantity);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onChange(newQuantity);
        }
    };

    return (
        <div className="flex items-center">
            <button onClick={decreaseQuantity} className="ml-2 px-3 py-1 bg-gray-400 text-white rounded-md">-</button>
            <input
                type={type}
                id={id}
                name={name}
                value={quantity}
                onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    setQuantity(newQuantity);
                    onChange(newQuantity);
                }}
                className="w-16 border border-gray-300 rounded-md py-1 px-2"
            />
            <button onClick={increaseQuantity} className="ml-1 px-3 py-1 bg-gray-400 text-white rounded-md">+</button>
        </div>
    );
}

export default Quantity;
