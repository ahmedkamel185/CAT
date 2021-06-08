import { ADD_Category } from "../types";

const initialState = {
  categoryName: "",
  categories: [],
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_Category:
      return {
        ...state,
        categories: state.categories.concat({
          id: Math.random(),
          name: action.name,
          desc: action.desc,
          movies: action.movies,
        }),
      };

    default:
      return state;
  }
};
