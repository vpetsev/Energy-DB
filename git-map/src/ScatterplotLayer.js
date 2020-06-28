import { ScatterplotLayer } from 'deck.gl';
import { wells, percentages } from "./Data-processing";

export function renderLayers(props) {
    const {
        data,
        onHover,
        settings
    } = props
    return [
    settings.showScatterplot &&
      new ScatterplotLayer({
        id: 'scatter-plot',
        getPosition: d => [d.coords[0], d.coords[1], 0],
        getColor: d => `${d.color}`,
        getRadius: d => 3,
        opacity: 0.8,
        radiusMinPixels: 2,
        radiusMaxPixels: 25,
        pickable: true,
        data,
        onHover,
        ...settings
      })
    ]
}