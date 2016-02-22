import { combineReducers } from 'redux';
import EmployeesReducer from './reducer_employees';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  employees: EmployeesReducer,
  form: formReducer
});

export default rootReducer;
