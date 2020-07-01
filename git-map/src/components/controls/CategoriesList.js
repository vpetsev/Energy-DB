import React from "react";
import { percentages } from "../../data"
// icons

const units = {
    wells: "wells",
    percentage: "percent"
}

// Function to add commas

export const CategoryList = ({ data, categories, handleClick, activeMetric }) => {
    return categories.map((category, i) => {
        const filteredData = data.filter(
            (d) => (
                d.wellType === category.name
            )
        );

        let value = 0;
        let max = 0;

        if (category.active) {
            if (activeMetric === "wells") {
                value = filteredData.length;
                max = data.length;
            } else if (activeMetric === "percentage") {
                console.log(percentages)
            } else {
                value = filteredData
                    .map((x) => {
                        console.log(x.wellType)
                        return x.wellType
            })
            }
        }
    const style = {
         background: category.active ? category.color : '#DBDBDB',
         width: category.active ? (value / max) * 100 + '%' : '0%',
      };

        let format = "";
        if (activeMetric === "wells") {
            format = `${value}`
        } else if (activeMetric === "percentages") {
            console.log(percentages)
        }

        return (
            <div
                key={i}
                className="category noselect"
                onClick={() => handleClick(category.name)}
            >
                <div style={style} className="line" />
                <span
                    style={{ color: category.active ? "black" : "#737373" }}
                    className="title"
                >
                    {category.name.charAt(0).toUpperCase() +
                        category.name.substring(1)}
                </span>
                {<span className="sub">{format}</span>}
            </div>
        )
    })
}
