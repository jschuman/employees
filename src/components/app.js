import React, { Component } from 'react';
import EmployeesIndex from './employees_index';
import EmployeesNew from './employees_new';

export default class App extends Component {
  render() {
    return (
      <div>
        <EmployeesIndex />
        <EmployeesNew />
      </div>
    );
  }
}
