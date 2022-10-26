import { createStore, combineReducers } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { counterReducer } from './counter/counter.reducer';

const rootReducer = combineReducers({
  counter: counterReducer,
});
// const composeEnhancer = composeWithDevTools(applyMiddleware());

export const reduxStore = createStore(rootReducer); // , composeEnhancer);
