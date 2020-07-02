let data = require("./data-houston.json");

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

export let wellsData = getRandom(data, 2500);



// Inactive is grey
let inactiveWells = [
      'Plugged Oil Well',
      'Plugged Gas Well',
      'Canceled / Abandoned Location',
      'Plugged Oil / Gas',
      'Observation Well',
      'Plugged Storage',
];

// Oil is green
let oilWells = [
      'Oil Well',
      'Injection / Disposal from Oil',
      'Shut-In Oil',
      'Water Supply from Oil',
      'Injection/Disposal from Storage/Oil',
      'Storage from Oil',
      'Observation from Oil',
];

// Gas is red
let gasWells = [
  'Gas Well',
  'Shut-In Gas',
  'Injection / Disposal from Gas',
  'Water Supply from Gas',
  'Storage from Gas',
  'Service from Storage/Gas',
  'Observation from Gas',

];

// Oil and Gas is Yellow
let oilAndGasWells = [
  'Injection / Disposal from Oil/Gas',
  'Oil/Gas Well',
  'Water Supply from Oil/Gas',
  'Storage from Oil/Gas',
  'Observation from Oil / Gas'
];

// Misc is Purple
let miscWells = [
      'Dry Hole',
      'Permitted Location',
      'Injection / Disposal',
      'Water Supply Well',
  'Geothermal Well',
  'Sulfur Core Test',
  'Service',
  'Brine Mining',
  'Storage Well',
  'Core Test',
  'Injection/Disposal from Storage',
];

let oilWellsArr = [];
let gasWellsArr = [];
let oilAndGasWellsArr = [];
let inactiveWellsArr = [];
let miscWellsArr = [];

export let wellCategoriesArr = [
  oilWellsArr,
  gasWellsArr,
  oilAndGasWellsArr,
  inactiveWellsArr,
  miscWellsArr,
];

export const wells = wellsData.map((obj) => {
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
  let wellType, wellCategory, color;

  if (oilWells.includes(symbDesc)) {
      wellCategory = "oil"
      wellType = symbDesc;
      // green
      color = [0, 255, 0];
    oilWellsArr.push(obj);
  } else if (gasWells.includes(symbDesc)) {
      wellCategory = "gas"
      wellType = symbDesc;
      gasWellsArr.push(obj);
      //red
      color = [255, 0, 0]
  } else if (oilAndGasWells.includes(symbDesc)) {
      wellCategory = "oilAndGas"
      wellType = symbDesc;
      oilAndGasWellsArr.push(obj);
      // Mix? Half green half red?
      color = [255, 204, 153]
  } else if (miscWells.includes(symbDesc)) {
      wellCategory = "misc"
      wellType = symbDesc;
      miscWellsArr.push(obj);
      // purple
      color = [33, 255, 248]
  } else if (inactiveWells.includes(symbDesc)) {
      wellCategory = "inactive"
      wellType = symbDesc;
      inactiveWellsArr.push(obj);
      //grey
      color = [0, 255, 255]
  } else {
    return symbDesc;
  }

  let wellObj = {
    coords: coords,
      id: id,
    color: color,
    attributes: {
      symbDesc: symbDesc,
      source: source,
      wellType: wellType,
      wellCategory: wellCategory
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

console.log(wellCategoriesArr)


wellCategoriesArr.forEach((category) => {
  getPercentage(category);
});

export let categoryLength = [
  oilWellsArr.length,
  gasWellsArr.length,
  oilAndGasWellsArr.length,
  inactiveWellsArr.length,
  miscWellsArr.length,
];

// let descriptionArr = data.map(point => point.GIS_SYMBOL_DESCRIPTION)

// let descs = [...new Set(descriptionArr)]

// console.log(descs)

// let typesOfWells = [

































// ]

// console.log(typesOfWells.length)
// const rows = data.split(",");
// const fields = rows[0].split(",");
// const dataRows = rows.slice(1);
// console.log(dataRows)
// const format = {
//   WKT: String,
//   SYMNUM: String,
//   GIS_SYMBOL_DESCRIPTION: String,
//   RELIAB: String,
//   GIS_LOCATION_SOURCE: String,
//   API: String,
//   GIS_WELL_NUMBER: String,
//   GIS_API5: String,
//   GIS_LONG83: String,
//   GIS_LAT83: String,
//   GIS_LAT27: String,
//   UNIQID: String,
//   GIS_LONG27: String,
//   SHAPE_X: String,
//   SHAPE_Y: String,
// };

// const wells = data.map((obj) => {
//   let coordsArr = obj.WKT
//     .replace(/([A-Za-z\(\)])/gm, "")
//     .trim()
//     .split(" ")
//     .join(", ")
//   .split(", ")
//   let wellNum = obj.GIS_WELL_NUMBER // Sometimes there are non-numbers
//   let symbolNum = Number(obj.SYMNUM)
//   let reliab = Number(obj.RELIAB)
//   let apiNum = Number(obj.API)
//   let long83 = Number(obj.GIS_LONG83)
//   let lat83 = Number(obj.GIS_LAT83)
//   let lat27 = Number(obj.GIS_LAT27)
//   let long27 = Number(obj.GIS_LONG27)
//   let id = Number(obj.UNIQID)
//   let shapeX = Number(obj.SHAPE_X)
//   let shapeY = Number(obj.SHAPE_Y)
//   let type = obj.GIS_SYMBOL_DESCRIPTION
//   let source = obj.GIS_LOCATION_SOURCE
//   let symDesc = obj.GIS_SYMBOL_DESCRIPTION

//   let gisApi;
//   if (obj.GIS_API5 !== " ") {
//     gisApi = parseFloat(obj.GIS_API5);
//   } else {
//     gisApi = 0;
//   }

//   let coords = coordsArr.map((el) => Number(el))

//   return {
//     coords: coords,
//     id: id,
//     attributes: {
//       type: type,
//       source: source,
//     },
//     identifiers: {
//       symbolNum: symbolNum,
//       apiNum: apiNum,
//       wellNum: wellNum,
//       gisApi: gisApi,
//       reliab: reliab,
//       symDesc: symDesc
//     },
//     detailCoords: {
//       lat83: lat83,
//       long83: long83,
//       lat27: lat27,
//       long27: long27,
//     },
//     shape: {
//       shapeX,
//       shapeY,
//     },
//   };
// })


// module.exports = dataRows.map((r) =>
//   r.split(",").reduce((prev, curr, i) => {
//     const field = fields[i];
//     prev[field] = format[field](curr);
//     return prev;
//   }, {})
// );