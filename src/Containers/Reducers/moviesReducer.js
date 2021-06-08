import { ADD_Movie, DELETE_Movie, UPDATE_Movie } from "../types";

// Setup initial State
const initialState = {
  Name: "",
  rate: null,
  desc: "",
  movies: [
    {
      id: null,
      name: "",
      rate: null,
      desc: "",
      category_id: null,
    },
  ],

  categories: [{ id: 1, name: "aaa", desc: "aaa" }],
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_Movie:
      return {
        ...state,
        movies: state.movies.concat({
          id: Math.random(),
          name: action.name,
          desc: action.desc,
          rate: action.rate,
          category_id: action.id,
        }),
      };
    case DELETE_Movie:
      return {
        ...state,
        movies: state.movies.filter(function (item) {
          return item.id !== action.id;
        }),
      };

    case "UPDATE_Movie":
      return {
        ...state,
        movies: state.movies.map((item) =>
          item.id === action.id
            ? { ...item, name: action.name, rate: action.rate, desc: action.desc }
            : item
        ),
      };

    default:
      return state;
  }
};
