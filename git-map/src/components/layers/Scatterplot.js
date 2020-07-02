import { ScatterplotLayer } from 'deck.gl';

export function scatterLayer(props) {
    const {
        data,
        onHover,
        settings
    } = props
    
    console.log(data)
  
    return [
      new ScatterplotLayer({
        id: "scatter-plot",
        getPosition: (d) => [d.coords[0], d.coords[1], 0],
        getColor: (d) => d.color.rgb,
        getRadius: (d) => 3,
        opacity: 0.8,
        radiusMinPixels: 2,
        radiusMaxPixels: 25,
        pickable: true,
        data,
        onHover,
        ...settings,
      })
  ];
}