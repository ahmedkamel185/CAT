import { createStore, combineReducers } from 'redux';
import {categoryReducer} from './categoryReducer';
import {moviesReducer} from './moviesReducer';


const rootReducer = combineReducers({
  categories: categoryReducer,
  movies: moviesReducer, 
});

 export default rootReducer
