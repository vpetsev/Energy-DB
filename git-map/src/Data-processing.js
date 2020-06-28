// / DATA PROCESSING ///
import data from "./data"

// Inactive is grey
let inactiveWells = [
  "Plugged Gas Well",
  "Plugged Oil Well",
  "Plugged Oil / Gas",
  "Plugged Storage",
  "Shut-In Gas",
  "Shut-In Oil",
];

// Oil is green
let oilWells = [
  "Oil Well",
  "Plugged Oil Well",
  "Oil/Gas Well",
  "Plugged Oil / Gas",
  "Injection / Disposal from Oil",
  "Shut-In Oil",
  "Injection / Disposal from Oil/Gas",
  "Observation from Oil",
];

// Gas is red
let gasWells = [
  "Gas Well",
  "Plugged Gas Well",
  "Oil/Gas Well",
  "Plugged Oil / Gas",
  "Shut-In Gas",
  "Injection / Disposal from Gas",
  "Injection / Disposal from Oil/Gas",
];

// Oil and Gas is Yellow
let oilAndGasWells = [
  "Oil/Gas Well",
  "Injection / Disposal from Oil/Gas",
  "Plugged Oil / Gas",
];

// Misc is Purple
let miscWells = [
  "Dry Hole",
  "Permitted Location",
  "Injection / Disposal",
  "Canceled / Abandoned Location",
  "Plugged Storage",
  "Observation Well",
  "Water Supply Well",
];

let typesOfWells = [
  "Gas Well",
  "Dry Hole",
  "Plugged Gas Well",
  "Permitted Location",
  "Plugged Oil Well",
  "Oil Well",
  "Oil/Gas Well",
  "Plugged Oil / Gas",
  "Injection / Disposal",
  "Canceled / Abandoned Location",
  "Plugged Storage",
  "Shut-In Gas",
  "Injection / Disposal from Oil",
  "Shut-In Oil",
  "Injection / Disposal from Gas",
  "Observation Well",
  "Water Supply Well",
  "Injection / Disposal from Oil/Gas",
  "Observation from Oil"
];

let oilWellsArr = [];
let gasWellsArr = [];
let oilAndGasWellsArr = [];
let inactiveWellsArr = [];
let miscWellsArr = [];

let wellCategoriesArr = [
  oilWellsArr,
  gasWellsArr,
  oilAndGasWellsArr,
  inactiveWellsArr,
  miscWellsArr,
];

export const wells = data.map((obj) => {
  let coordsArr = obj.WKT.replace(/([A-Za-z\(\)])/gm, "")
    .trim()
    .split(" ")
    .join(", ")
    .split(", ");
  let wellNum = obj.GIS_WELL_NUMBER; // Sometimes there are non-numbers
  let symbolNum = Number(obj.SYMNUM);
  let reliab = Number(obj.RELIAB);
  let apiNum = Number(obj.API);
  let long83 = Number(obj.GIS_LONG83);
  let lat83 = Number(obj.GIS_LAT83);
  let lat27 = Number(obj.GIS_LAT27);
  let long27 = Number(obj.GIS_LONG27);
  let id = Number(obj.UNIQID);
  let shapeX = Number(obj.SHAPE_X);
  let shapeY = Number(obj.SHAPE_Y);
  let source = obj.GIS_LOCATION_SOURCE;
  let symbDesc = obj.GIS_SYMBOL_DESCRIPTION;

  let coords = coordsArr.map((el) => Number(el));

  let gisApi;
  if (obj.GIS_API5 !== " ") {
    gisApi = parseFloat(obj.GIS_API5);
  } else {
    gisApi = 0;
  }

  // let wellType = () => {
  // }
  let wellType;

  if (oilWells.includes(symbDesc)) {
    wellType = symbDesc;
    oilWellsArr.push(obj);
  } else if (gasWells.includes(symbDesc)) {
    wellType = symbDesc;
    gasWellsArr.push(obj);
  } else if (oilAndGasWells.includes(symbDesc)) {
    wellType = symbDesc;
    oilAndGasWellsArr.push(obj);
  } else if (miscWells.includes(symbDesc)) {
    wellType = symbDesc;
    miscWellsArr.push(obj);
  } else if (inactiveWells.includes(symbDesc)) {
    wellType = symbDesc;
    inactiveWellsArr.push(obj);
  } else {
    return symbDesc;
  }

  let wellObj = {
    coords: coords,
    id: id,
    attributes: {
      symbDesc: symbDesc,
      source: source,
      wellType: wellType,
    },
    identifiers: {
      symbolNum: symbolNum,
      apiNum: apiNum,
      wellNum: wellNum,
      gisApi: gisApi,
      reliab: reliab,
      symbDesc: symbDesc,
    },
    detailCoords: {
      lat83: lat83,
      long83: long83,
      lat27: lat27,
      long27: long27,
    },
    shape: {
      shapeX,
      shapeY,
    },
  };

  return wellObj;
});

let dataLength = data.length;

let oilWellsArrLength = oilWellsArr.length;
let gasWellsArrLength = gasWellsArr.length;
let oilAndGasWellsArrLength = oilAndGasWellsArr.length;
let inactiveWellsArrLength = inactiveWellsArr.length;
let miscWellsArrLength = miscWellsArr.length;

export let percentages = [];
const getPercentage = (arr) => {
  let arrLength = arr.length;
  let percentage = (arrLength / dataLength) * 100;
  percentages.push(percentage);
  return percentage;
};



wellCategoriesArr.forEach((category) => {
  getPercentage(category);
});


// let descriptionArr = data.map(point => point.identifiers.symbDesc)
// console.log(descriptionArr)

// let descs = [...new Set(descriptionArr)]


// let typesOfWells = [
//   "Gas Well",
//   "Dry Hole",
//   "Plugged Gas Well",
//   "Permitted Location",
//   "Plugged Oil Well",
//   "Oil Well",
//   "Oil/Gas Well",
//   "Plugged Oil / Gas",
//   "Injection / Disposal",
//   "Canceled / Abandoned Location",
//   "Plugged Storage",
//   "Shut-In Gas",
//   "Injection / Disposal from Oil",
//   "Shut-In Oil",
//   "Injection / Disposal from Gas",
//   "Observation Well",
//   "Water Supply Well",
//   "Injection / Disposal from Oil/Gas",
//   "Observation from Oil"
// ];
