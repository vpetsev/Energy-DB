/// app.js
import React from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import wellsData from "./data"
import { StaticMap } from 'react-map-gl'
import { Controller } from "@deck.gl/core"

console.log(Controller)

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoidnBldHNldjk2IiwiYSI6ImNrYnRzMTBxejAwZnYycXA3bzZ0OXFpdHUifQ.Dv0v0YoPuv-SNDoHUVoMmw";

const INITIAL_VIEW_STATE = {
  longitude: -99.733147,
  latitude: 32.448734,
  zoom: 7,
  minZoom: 2,
  maxZoom: 16,
  pitch: 10,
  bearing: 0,
};

let layerData = wellsData.map(obj => obj.coords)

// let descriptionArr = wellsData.map(point => point.identifiers.symDesc)
// console.log(descriptionArr)

// let descs = [...new Set(descriptionArr)]
// console.log(descs)

let typesOfWells = [
  "Gas Well",
  "Dry Hole",
  "Plugged Gas Well",
  "Permitted Location",
  "Plugged Oil Well",
  "Oil Well",
  "Oil/Gas Well",
  "Plugged Oil / Gas",
  "Injection / Disposal",
  "Canceled / Abandoned Location",
  "Plugged Storage",
  "Shut-In Gas",
  "Injection / Disposal from Oil",
  "Shut-In Oil",
  "Injection / Disposal from Gas",
  "Observation Well",
  "Water Supply Well",
  "Injection / Disposal from Oil/Gas",
  "Observation from Oil"
];

class App extends React.Component {
  _renderLayers() {
    const {
      data = layerData,
      radius = 10
    } = this.props
    
    return [
      new ScatterplotLayer({
        id: 'scatter-plot',
        data,
        radiusScale: radius,
        radiusMinPixels: 5,
        getPosition: d => [d[0], d[1], 0],
        getFillColor: d => [244, 244, 0],
        getRadius: 1,

      })
    ]
  
  }

  render() {
    const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = this.props

    return (
        <DeckGL
          layers={this._renderLayers()}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
        >
          <StaticMap
            mapStyle={mapStyle}
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
    );
  }
}

export default App;
