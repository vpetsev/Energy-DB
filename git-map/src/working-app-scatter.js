// /// app.js
// import React from "react";
// import DeckGL from "@deck.gl/react";
// import { ScatterplotLayer } from "@deck.gl/layers";
// import { StaticMap } from "react-map-gl";
// import { Controller } from "@deck.gl/core";
// import Charts from "./Charts";
// import { wells, percentages } from "./Data-processing";
// import { renderLayers } from "./ScatterplotLayer";
// import { SCATTERPLOT_CONTROLS } from "./Controls";

// // order
// // oil, gas, oil+gas, inactive, misc

// const MAPBOX_ACCESS_TOKEN =
//   "pk.eyJ1IjoidnBldHNldjk2IiwiYSI6ImNrYnRzMTBxejAwZnYycXA3bzZ0OXFpdHUifQ.Dv0v0YoPuv-SNDoHUVoMmw";

// const INITIAL_VIEW_STATE = {
//   longitude: -99.733147,
//   latitude: 32.448734,
//   zoom: 7,
//   minZoom: 2,
//   maxZoom: 16,
//   pitch: 10,
//   bearing: 0,
// };

// let layerData = wells.map((obj) => {
//   return {
//     coords: obj.coords,
//     type: obj.attributes.wellType,
//     color: obj.color,
//   };
// });

// // button to manage hexagon and scatter controls

// // Color the processed data into fractions in the processing file and use that, instead of the arrays of data

// class App extends React.Component {
//   state = {
//     hover: {
//       x: 0,
//       y: 0,
//       hoveredObject: null,
//     },
//     points: [],
//     settings: Object.keys(SCATTERPLOT_CONTROLS).reduce(
//       (accu, key) => ({
//         ...accu,
//         [key]: SCATTERPLOT_CONTROLS[key].value,
//       }),
//       {}
//     ),
//     selectedHour: null,
//     style: "mapbox://styles/mapbox/light-v9",
//   };

//   componentDidMount() {
//     this._processData();
//   }

//   _processData = () => {
//     let points = wells.map((obj) => {
//       return {
//         coords: obj.coords,
//         type: obj.attributes.wellType,
//         color: obj.color,
//       };
//     });
//     console.log(points);
//     this.setState({
//       points,
//     });
//   };

//   render() {
//     const data = this.state.points;
//     if (!data.length) {
//       return null;
//     }

//     return (
//       <div>
//         <DeckGL
//           layers={renderLayers({
//             data: this.state.points,
//           })}
//           initialViewState={INITIAL_VIEW_STATE}
//           controller={true}
//         >
//           <StaticMap
//             mapStyle={this.state.style}
//             mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
//           />
//         </DeckGL>
//         <Charts />
//       </div>
//     );
//   }
// }

// export default App;
