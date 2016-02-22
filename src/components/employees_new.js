import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createEmployee, fetchEmployees } from '../actions/index';

class EmployeesNew extends Component {
  constructor(props){
    super(props);

    this.state = { first: '', last: ''};

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFirstInputChange = this.onFirstInputChange.bind(this);
    this.onLastInputChange = this.onLastInputChange.bind(this);
  }

  onFormSubmit(e){
    e.preventDefault();
    this.props.createEmployee({first: this.state.first, last: this.state.last})
      .then(() => {
        this.setState({first: '', last: ''});
        this.props.fetchEmployees();
      })

  }

  onFirstInputChange(event){
    this.setState({...this.state, first: event.target.value });
  }

  onLastInputChange(event){
    this.setState({...this.state, last: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            type='text'
            value={this.state.first}
            onChange={this.onFirstInputChange}
          />
          <input
            type='text'
            value={this.state.last}
            onChange={this.onLastInputChange}
          />
          <button className='btn' type='submit'>Add</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { createEmployee, fetchEmployees })(EmployeesNew);
