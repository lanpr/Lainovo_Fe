import React,{useState} from "react";
import Select from "react-tailwindcss-select";


export default function MultiSelect({options}) {
    const [props, setId] = useState([]);

    const handleChange = value => {
        console.log("value:", value);
        setId(value);
    };

    return (
        <Select
            
            isMultiple
            isSearchable
            value={props}
            onChange={handleChange}
            options={options}
        />
    );
}
