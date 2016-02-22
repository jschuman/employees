import React, { Component } from 'react';
import Employees from './employees';
import EmployeeEntry from './employee_entry';

export default class App extends Component {
  render() {
    return (
      <div>
        <Employees />
        <EmployeeEntry />
      </div>
    );
  }
}
