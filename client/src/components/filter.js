// import wellCategoriesArr from "../Data-processing"

function filter(data, { categories }) {
  const output = [];
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].active) {
      output.push(...data.filter((d) => d.wellType === categories[i].name));
    }
  }
  return output;
}

function filterState(state) {
  const { data, categories } = state;
  return {
    ...state,
    data: filter(data, { categories }),
  };
}

export default filterState;