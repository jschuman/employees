import { combineReducers } from 'redux';
import EmployeesReducer from './reducer_employees';
import SortReducer from './reducer_sort';
import { reducer as formReducer } from 'redux-form';

import normalizeDate from '../utils/normalize_date';

const rootReducer = combineReducers({
  employees: EmployeesReducer,
  sort: SortReducer,
  form: formReducer.normalize({
    EmployeesDetailForm: {
      birthday: normalizeDate
    }
  })
});

export default rootReducer;
