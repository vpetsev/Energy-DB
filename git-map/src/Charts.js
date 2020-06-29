import React from 'react';
import { RadialChart } from "react-vis";
import { percentages } from "./Data-processing";

export const chartsStyle = {
  background: "white",
  borderRadius: 3,
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  fontFamily:
    'ff-clan-web-pro, "Helvetica Neue", Helvetica, sans-serif !important',
  fontSize: "12px",
  lineHeight: 1.833,
  height: 210,
  padding: "10px",
  position: "absolute",
  left: 20,
  bottom: 20,
  width: 500,
  zIndex: 100,
  display: "flex",
  opacity: 0.8
};

export default function Charts({
  highlight,
  highlightedType,
  points,
  select,
  selectedType
}) {
  if (!points) {
    return (<div style={chartsStyle} />)
  }
  const data = points.map(d => {
    return (
    [
      {
        angle: 1,
        color: d.color,
        name: d.type,
      },
      {
        angle: 1,
        color: d.color,
        name: d.type,
      },
      {
        angle: 1,
        color: d.color,
        name: d.type,
      },
      {
        angle: 1,
        color: d.color,
        name: d.type,
      },
      {
        angle: 1,
        color: d.color,
        name: d.type,
      }
    ])
  })

  console.log(data)
  return (
    <div
      style={chartsStyle}
      // onMouseLeave={() => highlight(null)}
    >
      <div>
        <h2>Types of wells</h2>
        <p> As percentage of all wells</p>
      </div>
      <RadialChart
        colorType={"literal"}
        getLabel={(d) => d.name}
        data={data}
        labelsRadiusMultiplier={1.1}
        labelsStyle={{ fontSize: 16, fill: "#222" }}
        showLabels
        style={{ stroke: "#fff", strokeWidth: 2, cursor: "pointer" }}
        width={200}
        height={150}
        // onValueMouseOver={d => highlight(d)}
      />
    </div>
  );
}

// Use saved data from the arrays