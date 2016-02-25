import { combineReducers } from 'redux';
import EmployeesReducer from './reducer_employees';
import { reducer as formReducer } from 'redux-form';

import normalizeDate from '../utils/normalize_date';
import normalizeZip from '../utils/normalize_zip';

const rootReducer = combineReducers({
  employees: EmployeesReducer,
  form: formReducer.normalize({
    EmployeesDetailForm: {
      hire_date: normalizeDate,
      birthday: normalizeDate,
      zip: normalizeZip
    }
  })
});

export default rootReducer;
