import { FETCH_EMPLOYEES, FETCH_EMPLOYEE } from '../actions/index';

const INITIAL_STATE = { all: [], employee: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      //convert to array
      let employees = [];
      if (action.payload.data){
        Object.keys(action.payload.data).map((key) => {
          let employee = action.payload.data[key];
          employee.key = key;
          employees.push(employee);
        });
      }
      return { ...state, all: employees };
    case FETCH_EMPLOYEE:
      return { ...state, employee: action.payload.data };
    default:
      return state;
  }
}
