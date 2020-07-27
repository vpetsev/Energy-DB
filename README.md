CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Installation
 * Technologies Used

---------------------

INTRODUCTION
------------
Energy DB is an interactive map and visualization tool for oil wells in and around Houston. Such information is publicly available ([rrc.state.tx.us][1]) but difficult to locate and time-consuming to compile and/or search. The data used here was compiled and cleaned with parsing libraries in python and javascript. The purpose of this application is to make the data easier to parse and visualize in an appealing way.

Built entirely on the client-side in ReactJS with Uber's Vis.gl, openGL suite, D3, and redux. 


    DEMO SITE: http://energy-db.surge.sh/


INSTALLATION 
------------

Visit the demo site at:

Energy-db.surge.sh ** Recommended **

or run in the command line:

    git clone git@github.com:VPetsev/Energy-DB.git
    cd Energy-DB/client
    npm install
    npm start


TECHNOLOGIES USED 
------------

- React.js
- Vis.GL suite - Deck.GL, Map.GL, React-Vis
- HTML
- CSS
- Redux
- JavaScript ES6/7


[1]: https://www.rrc.state.tx.us/oil-gas/research-and-statistics/obtaining-commission-records/oil-and-gas-well-records/np 
