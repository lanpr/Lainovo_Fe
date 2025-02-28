import React from "react";
import Padgina from "./Padgination";


function TableAdmin({ arraysTH, arraysTD }) {

    return (
        <div className="w-12/12 mb-2 mt-1 ">
            <table className="w-full overflow-y-scroll border-s border-black">
                <thead className="border-b border-black bg-gray-500 uppercase ">
                    <tr>
                        {arraysTH.map((item, index) => (
                            <th className=" text-center font-bold border-r border-black" key={index}>{item.names}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="overflow-y-scroll">
                    {arraysTD.map((items, rowIndex) => (
                        <tr key={rowIndex} name={rowIndex} className="cursor-pointer border-b  border-black hover:bg-gray-400">
                            {Object.values(items).map((value, colIndex) => (
                                <td className="text-center border-r border-black" key={colIndex}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )

}
export default TableAdmin
