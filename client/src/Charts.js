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
    <div style={chartsStyle}>
      <RadialChart
        style={{ stroke: "#fff", strokeWidth: 2, cursor: "pointer" }}
        colorType={"literal"}
        colorDomain={[0, 100]}
        colorRange={[0, 10]}
        margin={{ top: 100 }}
        getLabel={(d) => d.name}
        data={[
          { angle: percentages[0], color: "#89DAC1", name: "green" },
          { angle: percentages[1], color: "#F6D18A", name: "yellow" },
          { angle: percentages[2], color: "#1E96BE", name: "cyan" },
          { angle: percentages[3], color: "#DA70BF", name: "magenta" },
          { angle: percentages[4], color: "#F6D18A", name: "yellow again" },
        ]}
        labelsRadiusMultiplier={1.1}
        labelsStyle={{ fontSize: 16, fill: "#222" }}
        showLabels
        style={{ stroke: "#fff", strokeWidth: 2 }}
        width={150}
        height={150}
      />
    </div>
  );
}
