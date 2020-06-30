import React, { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import {
    SCATTERPLOT_CONTROLS,
    HEXAGON_CONTROLS,
    MapStylePicker,
    LayerControls,
} from "../Controls";
import { tooltipStyle } from "../Style";
import { wells } from "../Data-processing";

import {scatterLayer} from "./layers/Scatterplot";
import {hexLayer} from "./layers/Hexagon"

// Can move viewstate to state
const INITIAL_VIEW_STATE = {
  longitude: -99.733147,
  latitude: 32.448734,
  zoom: 7,
  minZoom: 2,
  maxZoom: 16,
  pitch: 10,
  bearing: 0,
};

// Move to config
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoidnBldHNldjk2IiwiYSI6ImNrYnRzMTBxejAwZnYycXA3bzZ0OXFpdHUifQ.Dv0v0YoPuv-SNDoHUVoMmw";


const Map = () => {
    let defaultStyle = "mapbox://styles/mapbox/dark-v9"
    let initialHoverObj = {
        hover: {
            x: 0,
            y: 0,
            hoveredObject: null
        }
    }
    let initialSettings =
        Object.keys(HEXAGON_CONTROLS).reduce(
            (accu, key) => ({
                ...accu,
                [key]: HEXAGON_CONTROLS[key].value,
            })
        )
    
    
    const [hover, setHover] = useState(initialHoverObj);
    const [settings, setSettings] = useState(initialSettings);
    const [style, setStyle] = useState(defaultStyle);
    const [data, setData] = useState([]);
    
    
    useEffect(() => {
        _processData()
    }, [])
    
    const _processData = () => {
        let data = wells.map((obj) => {
            return {
                coords: obj.coords,
                type: obj.attributes.wellType,
                color: obj.color,
                apiNum: obj.apiNum                
            }
        })
        setData(data)
    }

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
                propType={SCATTERPLOT_CONTROLS}
                onChange={(settings) => this._updateLayerSettings(settings)}
            /> */}
            <DeckGL
                layers={hexLayer({
                    data: data,
                    onHover: (hover) => _onHover(hover),
                    settings: settings
                })}
                initialViewState={INITIAL_VIEW_STATE}
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

export default Map;