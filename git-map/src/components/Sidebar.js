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
              <h1 >Oil and Gas DB</h1>
            <>
                <p style={{ marginBottom: 15}}>
                A visualization of wells in and around Houston. Made by Victor Petsev.
                </p>
                <Section>
                    <h2>Well Analytics</h2>
                    <Selector
                        category="metric"
                        options={["Wells", "Percentages"]}
                        active={activeMetric}
                        changeActive={(key, value) => 
                            dispatch({
                                category: "SET_ACTIVE",
                                payload: { key, value },
                            })
                        }
                        />
                    <CategoryList // Same as ProviderList
                        handleClick={(category) => 
                            dispatch({
                                category: "SET_CATEGORY",
                                payload: category,
                            })
                        }
                        types={types}
                        data={data}
                        activeMetric={activeMetric}
                        categories={categories}
                    />
                    <p> Filter by well type. </p>
                </Section>
                <Section>
                    <h2>Toggle Layer category</h2>
                    <Selector
                        category="layer"
                        options={["hexbins", "scatter"]} // Heatmap maybe later
                        active={activeLayer}
                        changeActive={(key, value) => 
                            dispatch({
                                category: "SET_ACTIVE",
                                payload: { key, value }
                            })
                        }
                    />
                    <p>
                        {activeLayer === "scatter" &&
                            "Scatter - plots each individual well by type"
                          }
                          <br />
                      
                        Hexbins - aggregate wells in a specific radius
                    </p>
                 </Section>
            </>
        </div>
    );
}

const mapStateToProps = (state) => filterState(state);
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
