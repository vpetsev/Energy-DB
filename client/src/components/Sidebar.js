import React from "react";
import "./Sidebar.css";
import Selector from "./Selector";
import { connect } from "react-redux";
import { CategoryList} from "./controls/CategoriesList";
import filterState from "./filter"
import { categories } from "../config"



const Section = ({ children }) => {
    return (
        <div
            style={{
                borderTop: "1px solid #E8E8E8",
                padding: "15px 0"
            }}
        >
            { children }
        </div>
    );
};

const Sidebar = ({
    data,
    dispatch,
    activeMetric,
    activeLayer,
    activeView,
    types
}) => {
      return (
        <div className="sidebar">
          <h1>Oil and Gas DB</h1>
          <>
            <p style={{ marginBottom: 15 }}>
              A visualization of wells in and around Houston. Made by Victor
              Petsev.
            </p>
            <Section>
              <h2>Well Analytics</h2>
              <Selector
                type="wells"
                options={["wells", "percentages"]}
                active={activeMetric}
                changeActive={(key, value) =>
                  dispatch({
                    type: "SET_ACTIVE",
                    payload: { key, value },
                  })
                }
              />
              <CategoryList // Same as ProviderList
                handleClick={(category) =>
                  dispatch({
                    type: "SET_CATEGORY",
                    payload: category,
                  })
                }
                data={data}
                activeMetric={activeMetric}
                categories={categories}
              />
              {/* <p> Filter by well type. </p> */}
            </Section>
            <Section>
              <h2>Toggle Layer category</h2>
              <Selector
                type="layer"
                options={["scatter", "hexbins"]} // Heatmap maybe later
                active={activeLayer}
                changeActive={(key, value) =>
                  dispatch({
                    type: "SET_ACTIVE",
                    payload: { key, value },
                  })
                }
              />
              <p>
                {activeLayer === "scatter" &&
                  "Scatterplot - Data points plotted individually."}
                {activeLayer === "hexbins" &&
                  "Hexagons - Aggregates well data within a certain radius to Hexagons."}
                <br />
              </p>
            </Section>
          </>
        </div>
      );
}

const mapStateToProps = (state) => filterState(state);
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
