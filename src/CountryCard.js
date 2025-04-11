import React from "react";
import "./CountryCard.css";
function countryCard({ name, img }) {
    return (
        <div className="card">
            <img className="imgStyle" src={img} alt={`Flag of ${name}`} />
            <h2>{name}</h2>
        </div>
    )
}

export default countryCard;