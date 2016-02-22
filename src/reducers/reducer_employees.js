import { FETCH_EMPLOYEES, CREATE_EMPLOYEE, DELETE_EMPLOYEE } from '../actions/index';

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      //convert to array
      let employees = [];
      Object.keys(action.payload.data).map((key) => {
        let employee = action.payload.data[key];
        employee.key = key;
        employees.push(employee);
      });
      return { ...state, all: employees };
    case CREATE_EMPLOYEE:
      return state;
    case DELETE_EMPLOYEE:
      return state;
    default:
      return state;
  }
}
