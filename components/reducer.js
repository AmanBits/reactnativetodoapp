import {ADD_TASK} from './constants';
const initialState = [];

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.tasks];
    default:
      return state;
  }
};
