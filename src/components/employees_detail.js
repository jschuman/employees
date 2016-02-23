import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

import { createEmployee, updateEmployee } from '../actions/index';

class EmployeesDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props){
    if (this.props.mode === 'create'){
      this.props.createEmployee(props)
        .then(() => {
          //employee has been created, navigate to index
          this.context.router.push('/');
        })
    } else if (this.props.mode === 'update'){
      props.key = this.props.employeeKey;
      this.props.updateEmployee(props)
        .then(() => {
          //employee has been updated, navigate to index
          this.context.router.push('/');
        })
    }

  }

  renderTitle(){
    return (
      <h3>{this.props.mode === 'create' ? 'Create' : 'Update'} an Employee</h3>
    );
  }

  formGroupClassName(field){
    return `form-group ${field.touched && field.invalid ? 'has-danger' : ''}`;
  }

  render() {
    const { fields: { first, last, birthday }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {this.renderTitle()}
        <div className={this.formGroupClassName(first)}>
          <label>First</label>
          <input type="text" className="form-control" autoFocus {...first} />
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

        <div className={this.formGroupClassName(birthday)}>
          <label>Birthday (mm/dd/yyy)</label>
          <input type="text" className="form-control" {...birthday} />
          <div className="text-help">
            {birthday.touched ? birthday.error : ''}
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

  if (!values.birthday) {
    errors.birthday = 'Enter a birthday';
  }

  return errors;
}

function mapStateToProps(state, ownProps){
  return { initialValues: ownProps.mode == 'update' ? state.employees.employee : null };
}

export default reduxForm({
  form: 'EmployeesDetailForm',
  fields: ['first', 'last', 'birthday'],
  validate
}, mapStateToProps, { createEmployee, updateEmployee })(EmployeesDetail);
