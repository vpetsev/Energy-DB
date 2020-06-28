/// app.js
import React from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl'
import { Controller } from "@deck.gl/core"
import Charts from "./Charts" 
import { wells, percentages } from './Data-processing';
import { renderLayers } from './ScatterplotLayer';
import { SCATTERPLOT_CONTROLS, HEXAGON_CONTROLS, MapStylePicker, LayerControls } from "./Controls"
import { tooltipStyle } from './Style';


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

// button to manage hexagon and scatter controls

class App extends React.Component {
  state = {
    hover: {
      x: 0,
      y: 0,
      hoveredObject: null,
    },
    points: [],
    settings: Object.keys(SCATTERPLOT_CONTROLS).reduce(
      (accu, key) => ({
        ...accu,
        [key]: SCATTERPLOT_CONTROLS[key].value,
      }),
      {}
    ),
    selectedType: null,
    style: "mapbox://styles/mapbox/dark-v9",
  };

  componentDidMount() {
    this._processData()
  }

  _processData = () => {
    let points = wells.map((obj) => {
      return {
        coords: obj.coords,
        type: obj.attributes.wellType,
        color: obj.color,
        apiNum: obj.apiNum
      };
    });
    this.setState({
      points
    })
  }

  _onHover({ x, y, object }) {
    const label = object
      ? object.coords
        ? "Test"
        : "null"
      : "null 2"

    this.setState({ hover: { x, y, hoveredObject: object, label } });
  }

  _onHighlight(highlightedType) {
    this.setState({ highlightedType })
  }

  _onSelect(selectedType) {
    this.setState({
      selectedType:
        selectedType === this.state.selectedType ?
          null :
          selectedType
    })
  }

  _onWebGLInitialize = gl => {
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
  }

  _updateLayerSettings(settings) {
    this.setState({ settings });
  }

  onStyleChange = style => {
    this.setState({ style })
  }

  render() {
    const { viewState, controller = true } = this.props;
    const data = this.state.points
    if (!data.length) {
      return null;
    }
    const { hover, settings } = this.state;
    return (
      <div>
        {hover.hoveredObject && (
          <div style={{
            ...tooltipStyle,
            transform: `translate(${hover.x}px, ${hover.y}px)`,
          }}
          ><div>{hover.label}</div>
          </div>
        )}
        <MapStylePicker
          onStyleChange={this.onStyleChange}
          currentStyle={this.state.style}
        />
        <LayerControls
          settings={this.state.settings}
          propTypes={SCATTERPLOT_CONTROLS}
          onChange={(settings) => this._updateLayerSettings(settings)}
          />
        <DeckGL
          {...this.state.settings}
          onWebGLInitialize={this._onWebGLInitialize}
          layers={renderLayers({
            data: this.state.points,
            type: this.state.highlightedType || this.state.selectedType,
            onHover: (hover) => this._onHover(hover),
            settings: this.state.settings
          })}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
        >
          <StaticMap
            mapStyle={this.state.style}
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
        <Charts {...this.state}
          highlight={type => this._onHighlight(type)}
          select={type => this._onSelect(type)}
        />
      </div>
    );
  }
}

export default App;
