/// app.js
import React from 'react';
import Map from "./components/Map"
import Sidebar from "./components/Sidebar"


// order 
// oil, gas, oil+gas, inactive, misc

// button to manage hexagon and scatter controls

// Color the processed data into fractions in the processing file and use that, instead of the arrays of data

function App() {
    return (
      <div>
        <Map />
        <Sidebar />
      </div>
    );
  }

export default App;
