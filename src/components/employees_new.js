import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

import { createEmployee } from '../actions/index';

class EmployeesNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
    super(props);
  }

  onSubmit(props){
    this.props.createEmployee(props)
      .then(() => {
        //employee has been created, navigate to index
        this.context.router.push('/');
      })

  }

  formGroupClassName(field){
    return `form-group ${field.touched && field.invalid ? 'has-danger' : ''}`;
  }

  render() {
    const { fields: { first, last }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new Employee</h3>
        <div className={this.formGroupClassName(first)}>
          <label>First</label>
          <input type="text" className="form-control" {...first} />
          <div className="text-help">
            {first.touched ? first.error : ''}
          </div>
        </div>

        <div className={this.formGroupClassName(last)}>
          <label>Last</label>
          <input type="text" className="form-control" {...last} />
          <div className="text-help">
            {last.touched ? last.error : ''}
          </div>
        </div>

        <button type='submit' className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values){
  const errors = {};

  if (!values.first) {
    errors.first = 'Enter a first name';
  }

  if (!values.last) {
    errors.last = 'Enter a last name';
  }

  return errors;
}

export default reduxForm({
  form: 'EmployeesNewForm',
  fields: ['first', 'last'],
  validate
}, null, { createEmployee })(EmployeesNew);
