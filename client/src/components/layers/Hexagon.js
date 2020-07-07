import { HexagonLayer} from "@deck.gl/aggregation-layers";


export function hexLayer(props) {
  const {
      data,
      onHover,
      settings
  } = props

  const HEATMAP_COLORS = [
    [255, 255, 204],
    [199, 233, 180],
    [127, 205, 187],
    [65, 182, 196],
    [44, 127, 184],
    [37, 52, 148],
  ];

  const elevationRange = [0, 1000];

  return [
    new HexagonLayer({
      id: "hexagon-layer",
      colorRange: HEATMAP_COLORS,
      elevationRange,
      elevationScale: 500,
      extruded: true,
      getPosition: (d) => [d.coords[0], d.coords[1], 0],
      opacity: 0.8,
      upperPercentile: 99,
      pickable: true,
      data,
      onHover,
      ...settings,
    }),
  ];
    
}