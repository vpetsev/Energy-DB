import React from "react";
import { categoryLength } from "../../data"
// icons


const units = {
    wells: "wells",
    percentage: "percent"
}

// Function to add commas

export const CategoryList = ({ data, categories, handleClick, activeMetric }) => {
    return categories.map((category, i) => {
        console.log(category)
        let typeOfWell = category.name
        let value = categoryLength[typeOfWell].length

        let max = 0;

    const style = {
         background: category.active ? category.color : '#000000',
         width: category.active ? (value / max) * 100 + '%' : '0%',
      };

        let format = "";
        if (activeMetric === "wells") {
            format = `${value}`
        } 

        return (
            <div
                key={i}
                className="category noselect"
            >
                <div style={style}  />
                <span
                    style={{ color: category.color }}
                    className="title"
                >
                    {category.name.charAt(0).toUpperCase() +
                        category.name.substring(1) + ":"}
                </span>
                {<span className="sub">{format + " Wells"}</span>}
                <span className="legendColor" style={{ marginLeft: "30px", backgroundColor: `${category.hexColor}`}}>{`${category.hexColor}`}</span>
            </div>
        )
    })
}
