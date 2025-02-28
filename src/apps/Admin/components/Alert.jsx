import React from "react";
import Alert from "@mui/material/Alert";

export function AlertAdmin({ vali, info }) {
    return (
        <div className="w-3/12 py-1">
            <Alert variant="outlined" severity={vali} >
                {info}
            </Alert>
        </div>
    )
}

