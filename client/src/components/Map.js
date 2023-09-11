import React, { useEffect, useState, useMemo } from "react";
import { connect } from 'react-redux'
import filterState from "./filter"
import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl";
import {
    SCATTERPLOT_CONTROLS,
    HEXAGON_CONTROLS,
    MapStylePicker,
    LayerControls,
} from "../Controls";
import { tooltipStyle } from "../Style";
import { wells, wellsData } from "../data";
import { viewStates as initialViewStates, categories } from "../config";

import {scatterLayer} from "./layers/Scatterplot";
import { hexLayer } from "./layers/Hexagon"


// Can move viewstate to state


// Move to config
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoidnBldHNldjk2IiwiYSI6ImNrYnRzMTBxejAwZnYycXA3bzZ0OXFpdHUifQ.Dv0v0YoPuv-SNDoHUVoMmw";

export const initialViewState =
{
    longitude: -95.773046,
    latitude: 30.049046,
    zoom: 7,
    minZoom: 2,
    maxZoom: 16,
    pitch: 10,
    bearing: 0,
}


const MapConst = ({activeLayer, data, categories }) => {
  let style = "mapbox://styles/mapbox/dark-v9";
  
  const wellData = useMemo(() => wells, [
    ...categories.map(x => x.active)
  ])

  const layers = [
    activeLayer === "scatter"
      ? scatterLayer({data: wellData})
      : activeLayer === "hexbins"
        ? hexLayer({ data: wellData })
        : null
  ]

    return (
      <div className="map-container">
        <DeckGL
          layers={layers}
          initialViewState={initialViewState}
          controller={true}
        >
          <Map
            mapStyle={style}
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
      </div>
    );
}

const mapStateToProps = (state) => filterState(state);
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(MapConst);