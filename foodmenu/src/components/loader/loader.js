
import React from "react"



function Loader({ name }) {
    return (
        <div className="loader">
            <div className="animation"></div>
            <div className="title">{name}</div>

        </div>
    )
}
export default Loader 