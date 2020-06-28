import { ScatterplotLayer } from 'deck.gl';
import { wells, percentages } from "./Data-processing";

// Scatter plot colors follow an rgb arr [r, g, b]
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
        getColor: d => d.color.rgb,
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