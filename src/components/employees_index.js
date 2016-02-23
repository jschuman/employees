import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchEmployees, deleteEmployee, sortEmployees } from '../actions/index';

class EmployeesIndex extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

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

  onEmployeeClick(key, e) {
    this.context.router.push(`/employees/${key}`);
  }

  onHeaderClick(key, e){
    this.props.sortEmployees(key);
  }

  renderSortIcon(sortKey){
    if (this.props.employees.length > 0 && this.props.sort.key === sortKey){
      let iconName = this.props.sort.order === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc';
      return <i className={`fa ${iconName}`}></i>;
    } else {
      return '';
    }
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
          <td
            className='employeeListItem'
            onClick={this.onEmployeeClick.bind(this, employee.key)}>
            {employee.last + ', ' + employee.first}
          </td>
          <td>
            <span onClick={this.onDeleteClick.bind(this, employee.key)}>
              <i className="fa fa-trash-o"></i>
            </span>
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
              <th
                className='sort-header'
                onClick={this.onHeaderClick.bind(this, 'name')}>
                Name
                {this.renderSortIcon('name')}
              </th>
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

function mapStateToProps({ employees, sort }){
  let sortedEmployees = employees.all.concat().sort(function(a,b){
    let aSortKey = a[sort.key];
    let bSortKey = b[sort.key];
    if (sort.key === 'name'){
      aSortKey = a.last + ', ' + a.first;
      bSortKey = b.last + ', ' + b.first;
    }
    if (sort.order === 'asc'){
      return aSortKey > bSortKey;
    } else {
      return aSortKey < bSortKey;
    }
  });
  return {
    employees: sortedEmployees,
    sort: sort };
}

export default connect(mapStateToProps, { fetchEmployees, deleteEmployee, sortEmployees })(EmployeesIndex);
