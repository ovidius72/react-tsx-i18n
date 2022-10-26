import { INCREMENT, ADD, SUBTRACT, DECREMENT } from './counter.costants';

const initialState = 0;

// -- HOW TO DISPATCH AN ACTION:

// NOTE:
// dispatch({ type: 'ACTION_NAME', payload: 12}):
// type: required.
// payload can be any name (payload, data etc...) payload is the convention.

// REDUCER

// counterSlice
export const counterReducer = (
  state = initialState,
  action: { type: string; payload: number },
) => {
  const { type, payload } = action;
  console.log('DEBUGPRINT[1]: counter.reducer.ts:19: action=', action);

  switch (type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case ADD:
      return state + payload;
    case SUBTRACT:
      return state - payload;
    default:
      return state;
  }
};
