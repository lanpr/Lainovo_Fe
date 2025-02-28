import React from "react";

function BtnAdmin({ names ,onclicks}) {
    return (
        <button
            type="button"
            onClick={onclicks}
            className="w-24 h-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-sans rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
        >
            {names}
        </button>
    )
}
export default BtnAdmin