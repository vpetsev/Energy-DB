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

export default function Charts(props) {
  return (
    <div
      style={chartsStyle}
      // onMouseLeave={() => highlight(null)}
    >
      <h2>Types of wells</h2>
      <p> As percentage of all wells</p>
      <RadialChart
        colorType={"literal"}
        getLabel={(d) => d.name}
        data={[
          {
            angle: percentages[0].percentage,
            color: percentages[0].color,
            name: percentages[0].type
          },
          {
            angle: percentages[1].percentage,
            color: percentages[1].color,
            name: percentages[1].type
          },
          {
            angle: percentages[2].percentage,
            color: percentages[2].color,
            name: percentages[2].type
          },
          {
            angle: percentages[3].percentage,
            color: percentages[3].color,
            name: percentages[3].type
          },
          {
            angle: percentages[4].percentage,
            color: percentages[4].color,
            name: percentages[4].type
          }
        ]}
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