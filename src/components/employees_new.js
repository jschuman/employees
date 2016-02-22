import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createEmployee } from '../actions/index';

class EmployeesNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = { first: '', last: ''};
  }

  onCancel(e){
    e.preventDefault();
    this.context.router.push('/');
  }

  onFormSubmit(e){
    e.preventDefault();
    this.props.createEmployee({first: this.state.first, last: this.state.last})
      .then(() => {
        //employee has been created, navigate to index
        this.context.router.push('/');
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
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input
            type='text'
            value={this.state.first}
            onChange={this.onFirstInputChange.bind(this)}
          />
          <input
            type='text'
            value={this.state.last}
            onChange={this.onLastInputChange.bind(this)}
          />
          <button className='btn' type='submit'>Add</button>
          <button className='btn' type='button' onClick={this.onCancel.bind(this)}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { createEmployee })(EmployeesNew);
