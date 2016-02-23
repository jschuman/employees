import { SORT_EMPLOYEES } from '../actions/index';

export default function(state = {key: 'name', order: 'asc'}, action){
  switch (action.type) {
    case SORT_EMPLOYEES:
      if (state.key === action.payload){
        return {key: state.key, order: state.order === 'asc' ? 'desc' : 'asc'};
      } else {
        return {key: action.payload, order: 'asc'};
      }
  }
  return state;
}
