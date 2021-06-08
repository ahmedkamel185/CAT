import { createStore, combineReducers } from "redux";
import rootReducer from "../Containers/Reducers/rootReducer";

// const rootReducer = combineReducers({
//   categories: categoryReducer
// });

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
