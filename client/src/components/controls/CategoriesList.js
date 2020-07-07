import React from "react";
import { categoryLength, dataLength } from "../../data"
// icons


const units = {
    wells: "wells",
    percentage: "%"
}

// Function to add commas

export const CategoryList = ({ categories, handleClick, activeMetric }) => {
    return categories.map((category, i) => {
        let typeOfWell = category.name
        let value = categoryLength[typeOfWell].length

        let max = 0;

    const style = {
         background: category.active ? category.color : '#000000',
         width: category.active ? (value / max) * 100 + '%' : '0%',
      };

        let format = "";
        if (activeMetric === "wells") {
            format = `${value} wells`
        } else if (activeMetric === "percentages") {
            value = ((value / dataLength) * 100).toFixed(2)
            format = `${value}%`
        }

        return (
            <div
                key={i}
                className="category noselect"
                onClick={() => handleClick(category.name)}
            >
                <div style={style}  />
                <span
                    style={{ backgroundColor: category.color + " !important" }}
                    className="title"
                >
                    {category.name.charAt(0).toUpperCase() +
                        category.name.substring(1) + ":"}
                </span>
                {<span className="sub">{format}</span>}
                <span className="legendColor" style={{ marginLeft: "30px", backgroundColor: `${category.hexColor}`}}>{`${category.hexColor}`}</span>
            </div>
        )
    })
}
