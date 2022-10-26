import { INCREMENT, ADD, SUBTRACT, DECREMENT } from './counter.costants';

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
