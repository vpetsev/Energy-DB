import React from 'react';
import { connect } from 'react-redux';
import DeckGL from '@deck.gl/react';
import MapGL from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import filterState from './filter';
import { scatterLayer } from './layers/Scatterplot';
import { hexLayer } from './layers/Hexagon';

export const initialViewState = {
  longitude: -95.773046,
  latitude: 30.049046,
  zoom: 7,
  minZoom: 2,
  maxZoom: 16,
  pitch: 10,
  bearing: 0,
};

function Map({ activeLayer, data }) {
  const layers = activeLayer === 'hexbins'
    ? hexLayer({ data })
    : scatterLayer({ data });

  return (
    <div className="map-container">
      <DeckGL
        layers={layers}
        initialViewState={initialViewState}
        controller={true}
        getTooltip={({ object }) => object?.attributes
          ? object.attributes.symbDesc
          : object?.points
            ? `${object.points.length} wells`
            : null}
      >
        <MapGL
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          attributionControl={true}
        />
      </DeckGL>
    </div>
  );
}

export default connect(filterState)(Map);
