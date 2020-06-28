/// app.js
import React from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import data from "./data"
import { StaticMap } from 'react-map-gl'
import { Controller } from "@deck.gl/core"
import Charts from "./Charts" 
import { wells, percentages } from './Data-processing';


console.log(wells, percentages)

// order 
// oil, gas, oil+gas, inactive, misc

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

let layerData = wells.map((obj) => obj.coords);
console.log(layerData)

// Color the processed data into fractions in the processing file and use that, instead of the arrays of data

class App extends React.Component {
  _renderLayers() {
    const {
      data = layerData,
      radius = 1
    } = this.props
    
    return [
      new ScatterplotLayer({
        id: 'scatter-plot',
        data,
        radiusScale: radius,
        radiusMinPixels: 1,
        getPosition: d => [d[0], d[1], 0],
        getFillColor: d => [244, 244, 0],
        getRadius: 1,

      })
    ]
  }

  render() {
    const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = this.props

    return (
      <div>
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
        <Charts />
      </div>
    );
  }
}

export default App;
