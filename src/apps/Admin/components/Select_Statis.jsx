import React, { useState } from "react";
import Select from "react-tailwindcss-select";


function _Select({ options }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (value) => {
        setSelectedOption(value);
    };

    return (
        <div className="py-3 flex-col inline-block ms-2">
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
            />
        </div>

    );
}
export default _Select