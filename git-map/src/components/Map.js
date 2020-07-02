import React, { useEffect, useState, useMemo } from "react";
import { connect } from 'react-redux'
import filterState from "./filter"
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
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
import {hexLayer} from "./layers/Hexagon"

// Can move viewstate to state


// Move to config
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoidnBldHNldjk2IiwiYSI6ImNrYnRzMTBxejAwZnYycXA3bzZ0OXFpdHUifQ.Dv0v0YoPuv-SNDoHUVoMmw";

export const viewStates =
{
    longitude: -95.773046,
    latitude: 30.049046,
    zoom: 7,
    minZoom: 2,
    maxZoom: 16,
    pitch: 10,
    bearing: 0,
}

const Map = () => {
    let style = "mapbox://styles/mapbox/dark-v9";


    return (
            <DeckGL
                layers={scatterLayer({
                    data: wells,
                })}
                initialViewState={viewStates}
                controller={true}
            >
                <StaticMap
                    mapStyle={style}
                    mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                />
            </DeckGL>
    )
}

const mapStateToProps = (state) => filterState(state);
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Map);