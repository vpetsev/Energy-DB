export const categories = [
    {
        name: "oil",
        color: [0, 255, 0],
        hexColor: "#00FF00",
        modes: ['oil'],
        active: true
    },
    {
        name: "gas",
        color:  [255, 0, 0],
        hexColor: "#FF0000",
        modes: ['gas'],
        active: true
    },
    {
        name: "oilAndGas",
        color: [255, 204, 153],
        hexColor: "#FFCC99",
        modes: ['oilAndGas'],
        active: true
    },
    {
        name: "misc",
        color: [0, 0, 255],
        hexColor: "#0000FF",
        modes: ['misc'],
        active: true
    },
    {
        name: "inactive",
        color: [191, 193, 194],
        modes: ['inactive'],
        active: true,
        hexColor: "#BFC1C2"
    }
]

// categories

export const viewStates = [
    {
        longitude: -95.773046,
        latitude: 30.049046,
        zoom: 7,
        minZoom: 2,
        maxZoom: 16,
        pitch: 10,
        bearing: 0,
    },
]