import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchEmployees, deleteEmployee } from '../actions/index';

class EmployeesIndex extends Component {

  constructor(props){
      super(props)
      this.props.fetchEmployees();
  }

  onDeleteClick(key, e) {
    this.props.deleteEmployee(key)
      .then(() => {
        // use key to call another action to remove employee from state?
        // or just re-fetchEmployees?
        this.props.fetchEmployees();
      });
  }

  renderEmployeeList(){
    if (this.props.employees.length === 0){
      return (
          <tr>
            <td>Loading...</td>
          </tr>
        );
    }
    return this.props.employees.map((employee) => {
      return (
        <tr key={employee.key}>
          <td>{employee.first}</td>
          <td>{employee.last}</td>
          <td>
            <button
              type="button"
              onClick={this.onDeleteClick.bind(this, employee.key)}
              className="btn btn-default">
              Remove
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Employees</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>First</th>
              <th>Last</th>
            </tr>
          </thead>
          <tbody>
            {this.renderEmployeeList()}
          </tbody>
        </table>
        <Link to='/employees/new'>
          Add Employee...
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { employees: state.employees.all };
}

export default connect(mapStateToProps, { fetchEmployees, deleteEmployee })(EmployeesIndex);
