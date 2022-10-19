import { AnyAction, createStore } from 'redux';

const initialState = 0;

// COSTANTS:
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';

// -- HOW TO DISPATCH AN ACTION:

// NOTE:
// dispatch({ type: 'ACTION_NAME', payload: 12}):
// type: required.
// payload can be any name (payload, data etc...) payload is the convention.

// ACTION CREATORS
export const incrementAction = () => ({
  type: INCREMENT,
});

export const decrementAction = () => ({
  type: DECREMENT,
});

export const addAction = (payload: number) => ({
  type: ADD,
  payload,
});

export const subtratAction = (payload: number) => ({
  type: SUBTRACT,
  payload,
});

// REDUCER
const reducer = (
  state = initialState,
  action: AnyAction & { payload: number },
) => {
  const { type, payload } = action;

  switch (type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case ADD:
      return state + payload;
    case SUBTRACT:
      return state - payload;
  }
};

// STORE
const store = createStore(reducer);

export default store;
