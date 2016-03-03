import React, { Component } from 'react';

import EmployeesDetail from '../containers/employees_detail';

export default class EmployeesNew extends Component {

  render() {

    return (
      <EmployeesDetail mode='create' />
    );
  }
}
