import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import moment from 'moment';

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
          this.context.router.push('/employees');
        })
    } else if (this.props.mode === 'update'){
      props.key = this.props.employeeKey;
      this.props.updateEmployee(props)
        .then(() => {
          //employee has been updated, navigate to index
          this.context.router.push('/employees');
        })
    }

  }

  renderTitle(){
    return (
      <h3>{this.props.mode === 'create' ? 'Create' : 'Update'} an Employee</h3>
    );
  }

  formGroupClassName(field){
    return `form-group row ${field.touched && field.invalid ? 'has-danger' : ''}`;
  }

  renderFormField(field, label, inputAttrs={}){
    return (
      <div style={{marginTop: '20px'}} className={this.formGroupClassName(field)}>
        <label className="col-sm-2 form-control-label">{label}</label>
        <div className="col-sm-6">
          <input
            type="text"
            className="form-control"
            {...inputAttrs}
            {...field}
          />
          <div className="text-help">
            {field.touched ? field.error : ''}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { fields: { first, last, address1, address2, city, state, zip, hire_date, birthday }
            , handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {this.renderTitle()}
        {this.renderFormField(first, 'First', {autoFocus: true})}
        {this.renderFormField(last, 'Last')}
        {this.renderFormField(address1, 'Address 1')}
        {this.renderFormField(address2, 'Address 2')}
        {this.renderFormField(city, 'City')}
        {this.renderFormField(state, 'State')}
        {this.renderFormField(zip, 'Zip Code')}
        {this.renderFormField(hire_date, 'Hire Date', {placeholder: 'MM/DD/YYYY'})}
        {this.renderFormField(birthday, 'Birthday', {placeholder: 'MM/DD/YYYY'})}

        <button type='submit' className="btn btn-primary">Submit</button>
        <Link to="/employees" className="btn btn-danger">Cancel</Link>
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

  if (values.birthday) {
    //verify valid date
    if (!moment(values.birthday, "MM/DD/YYYY", true).isValid()){
      errors.birthday = 'Enter a valid date for birthday';
    }
  } else {
    errors.birthday = 'Enter a birthday';
  }

  if (values.hire_date) {
    //verify valid date
    if (!moment(values.hire_date, "MM/DD/YYYY", true).isValid()){
      errors.hire_date = 'Enter a valid date for hire_date';
    }
  } else {
    errors.hire_date = 'Enter a hire_date';
  }

  return errors;
}

function mapStateToProps(state, ownProps){
  return { initialValues: ownProps.mode == 'update' ? state.employees.employee : null };
}

export default reduxForm({
  form: 'EmployeesDetailForm',
  fields: ['first', 'last', 'address1', 'address2', 'city', 'state', 'zip', 'hire_date', 'birthday'],
  validate
}, mapStateToProps, { createEmployee, updateEmployee })(EmployeesDetail);
