import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Griddle from 'griddle-react';

import { fetchEmployees, deleteEmployee } from '../actions/index';

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

  render() {
    let LinkComponent = React.createClass({
      render: function(){
        let url = `employees/${this.props.rowData.key}`;
        let displayName = `${this.props.rowData.first} ${this.props.rowData.last}`;
        return <a href={url}>{displayName}</a>
      }
    });
    let DeleteComponent = React.createClass({
      render: function(){
        let self = this.props.metadata.customComponentMetadata.self;
        return (
          <span onClick={self.onDeleteClick.bind(self, this.props.rowData.key)}>
            <i className="fa fa-trash-o"></i>
          </span>
        )
      }
    });

    let columnMeta = [
      {
        "columnName": "first",
        "order": 1,
        "displayName": "Employee Name",
        "customComponent": LinkComponent
      },
      {
        "columnName": "birthday",
        "order": 2,
        "displayName": "Birthday"
      },
      {
        "columnName": "deleteLink",
        "order": 3,
        "displayName": "",
        "customComponent": DeleteComponent,
        "customComponentMetadata": {self: this}
      }

    ];
    return (
      <div>
        <h1>Employees</h1>

        <Griddle
          results={this.props.employees}
          columns={['first', 'birthday', 'deleteLink']}
          showFilter={true}
          columnMetadata={columnMeta}
        />

        <Link to='/employees/new'>
          Add Employee...
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ employees }){
  return { employees: employees.all };
}

export default connect(mapStateToProps, { fetchEmployees, deleteEmployee })(EmployeesIndex);
