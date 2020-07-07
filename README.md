CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Directory Layout
 * Installation
 * Configuration
 * Troubleshooting
 * FAQ
 * Maintainers

---------------------

INTRODUCTION
------------
    Energy DB is an interactive map and visualization tool for oil wells in and around Houston. Such information is publicly available ([rrc.state.tx.us][1]) but difficult to locate and time-consuming to compile and/or search. The purpose of this application is to make the data easier to parse and visualize in an appealing way.

    Built entirely on the client-side in ReactJS with Uber's Vis.gl suite, D3, and redux. 


    DEMO SITE: http://energy-db.surge.sh/


DIRECTORY LAYOUT
----------------

.
└── client
    ├── public
    │   ├── index.html                      
    │   └── ...
    └── src
        ├── App.js                          # Container for Map and Sidebar components
        ├── Charts.js                       # *Charts implementation
        ├── Controls.js                     # *Map Controls
        ├── Style.js                        # JS Styles for some components and layers
        ├── components                  
        │   ├── Map.js                      # Loads MapBox map and Deck.gl - Memoizes data points
        │   ├── Selector.js                 # Sidebar selection logic - easily scalable for additional options
        │   ├── Sidebar.js                  # Sidebar JSX
        │   ├── controls
        │   │   └── CategoriesList.js       # Manages color coding for different well types
        │   ├── filter.js                   # *Filters layers by options
        │   └── layers
        │       ├── Hexagon.js              # Hexagon map layer
        │       └── Scatterplot.js          # Scatterplot map layer
        ├── config.js                       # Categories and view states config
        ├── data-houston.json               # Well data in Houston (~100k points)
        ├── data.js                         # Picks random subsection of Houston Data (~2500) and filters
        ├── index.js                        # Redux initialization and component container
        └── ... (css)



INSTALLATION 
------------

    Visit the demo site at [Energy-db.surge.sh].

    or run:
    git clone 



[1]: https://www.rrc.state.tx.us/oil-gas/research-and-statistics/obtaining-commission-records/oil-and-gas-well-records/np 
