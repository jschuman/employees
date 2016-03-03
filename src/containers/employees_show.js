import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchEmployee } from '../actions/index';
import EmployeesDetail from './employees_detail';

class EmployeesShow extends Component {

  constructor(props) {
    super(props);
    props.fetchEmployee(this.props.params.id);
  }

  render() {
    return (
      <EmployeesDetail mode='update' employee={this.props.employee} employeeKey={this.props.params.id}/>
    );
  }
}

function mapStateToProps(state) {
  return { employee: state.employees.employee };
}
export default connect(mapStateToProps, { fetchEmployee })(EmployeesShow);
