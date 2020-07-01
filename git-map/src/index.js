import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from "redux"
import { viewStates, categories } from "./config";
import { wells as data } from "./data"


const initialState = {
  viewStates,
  data,
  categories: categories,
  activeLayer: 'scatter',
  activeMetric: 'wells',
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  const stateCopy = { ...state }

  if (type === "SET_ACTIVE") {
      const { key, value } = payload;
      if (key === 'metric') {
         stateCopy.activeMetric = value;
      } else if (key === 'layer') {
         stateCopy.activeLayer = value;
      } else if (key === 'view') {
         stateCopy.activeView = value;
      }
   } else if (type === 'SET_CATEGORY') {
      const categories = [...stateCopy.categories];
        console.log(categories)
        categories.forEach((category) => {
         if (category.name === payload) {
            category.active = !category.active;
         }
      });
      stateCopy.categories = categories;
  }
  return stateCopy;
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById("root")
);

