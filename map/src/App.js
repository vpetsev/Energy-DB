import React, { useState } from 'react';
import './App.css';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"

import * as data from "./data.json"



// Map Properties
const libraries = ["places"]
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}
const center = {
  lat: 29.582182,
  lng: -95.76078
};

console.log(data.wells)


function App() {
  // Accessing API
  const { isLoaded, loadError } = useLoadScript({
    libraries,
  });

  // Initializing Local State
  const [markers, setMarkers] = useState([])

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Maps"

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onClick={(event) => {
          setMarkers(current => [
            ...current,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date()
            }
          ])
        }}
      >
        {data.wells.map((well) => (
          <Marker
            key={well.wellNum}
            position={
              {
                lat: well.attributes.lat,
                lng: well.attributes.long
              }
            }
          />
        ))}
      </GoogleMap>
    </div>
  )
  
}

export default App;
