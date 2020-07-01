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


const Map = ({ activeView, activeLayer, data, zoom }) => {
    let defaultStyle = "mapbox://styles/mapbox/dark-v9"
    let initialHoverObj = {
        hover: {
            x: 0,
            y: 0,
            hoveredObject: null
        }
    }
    let initialSettings =
        Object.keys(SCATTERPLOT_CONTROLS).reduce(
            (accu, key) => ({
                ...accu,
                [key]: SCATTERPLOT_CONTROLS[key].value,
            })
        )
    
    
    const [hover, setHover] = useState(initialHoverObj);
    const [settings, setSettings] = useState(initialSettings);
    const [style, setStyle] = useState(defaultStyle);
    const [viewStates, setViewStates] = useState(initialViewStates);

    const _onHover = ({ x, y, object }) => {
    const label = object
        ? object.coords
        ? `( Lat: ${object.coords[1].toFixed(4)},
        Long: ${object.coords[0].toFixed(4)}
    )
    Type: ${object.type}`
        : null
        : "null 2";
        setHover({hover: { x, y, hoveredObject: object, label } })
    }

    const _updateLayerSettings = (settings) => {
        setSettings({ settings })
    }

    const onStyleChange = style => {
        setStyle({style})
    }

    const layers = [
      activeLayer === "hexbins"
        ? hexLayer({
            data: wellsData,
            categories: categories.map((c) => c.active),
          })
        : scatterLayer({
            data: wellsData,
            categories: categories.map((c) => c.active),
          }),
    ];
    
    if (!data.length) {
        return null;
    }



    return (
        <div className="map-container">
            {hover.hoveredObject && (
                <div style={{
                    ...tooltipStyle,
                    transform: `translate(${hover.x}px, ${hover.y}px)`
                }}
                >
                <div>{hover.label}</div>
                </div>
            )}
            <MapStylePicker
                onStyleChange={onStyleChange}
                currentStyle={style}
            />
            {/* <LayerControls
                settings={settings}
                propType={HEXAGON_CONTROLS}
                onChange={(settings) => this._updateLayerSettings(settings)}
            /> */}
            <DeckGL
                layers={layers ? layers : scatterLayer({
                    data: data,
                    onHover: (hover) => _onHover(hover),
                    settings: settings
                })}
                initialViewState={viewStates[0]}
                controller={true}
            >
                <StaticMap
                    mapStyle={style}
                    mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                />
            </DeckGL>
        </div>

    )
}

const mapStateToProps = (state) => filterState(state);
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Map);