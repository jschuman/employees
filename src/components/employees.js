import React, { Component } from 'react';
import Firebase from 'firebase';

export default class Employees extends Component {

  constructor(props){
      super(props)
      this.employees = [];
      this.state = {employees: []}
  }

  componentWillMount() {
    this.firebaseRef = new Firebase("https://solstreet-employees.firebaseio.com/employees/");

    this.firebaseRef.on("child_added", function(dataSnapshot) {
      let employee = {};
      employee[dataSnapshot.key()] = dataSnapshot.val();
      this.employees.push(employee);
      this.setState({
        employees: this.employees
      });
    }.bind(this));

    this.firebaseRef.on("child_removed", function(dataSnapshot) {
      const key = dataSnapshot.key();
      for(let i = 0; i < this.employees.length; i++) {
        if(Object.keys(this.employees[i])[0] === key) {
          this.employees.splice(i, 1);
          break;
        }
      }

      this.setState({
        employees: this.employees
      });
    }.bind(this));
  }

  onDeleteClick(key, e) {
    this.firebaseRef.child(key).remove();
  }

  renderEmployeeList(){
    if (this.state.employees.length === 0){
      return (
          <tr>
            <td>Loading...</td>
          </tr>
        );
    }
    return this.state.employees.map((employee) => {
      let key = Object.keys(employee)[0];
      return (
        <tr key={key}>
          <td>{employee[key].first}</td>
          <td>{employee[key].last}</td>
          <td>
            <button
              type="button"
              onClick={this.onDeleteClick.bind(this, key)}
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
      </div>
    );
  }
}
