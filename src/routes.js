import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import EmployeesIndex from './components/employees_index';
import EmployeesNew from './components/employees_new';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={EmployeesIndex} />
    <Route path="employees/new" component={EmployeesNew} />
  </Route>

);
