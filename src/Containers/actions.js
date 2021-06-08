import { ADD_Category, ADD_Movie, DELETE_Movie, UPDATE_Movie } from "./types";

// Add Category
export const addCategory = (categoryName, categoryDesc) => {
  return {
    type: ADD_Category,
    name: categoryName,
    desc: categoryDesc,
    movies: [],
  };
};

// Add Movie
export const addMovie = (id, movieName, movieRate, movieDesc) => {
  return {
    type: ADD_Movie,
    id: id,
    name: movieName,
    desc: movieDesc,
    rate: movieRate,
  };
};

// Delete Movie
export const deleteMovie = (id) => {
  return {
    type: DELETE_Movie,
    id: id,
  };
};

// Update Movie
export const updateMovie = (id, movieName, movieRate, movieDesc) => {
  return {
    type: "UPDATE_Movie",
    id: id,
    name: movieName,
    rate: movieRate,
    desc: movieDesc,
  };
};
