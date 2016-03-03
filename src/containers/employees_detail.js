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
      <h3>{this.props.mode === 'create' ? 'Create' : 'Update'} Employee</h3>
    );
  }

  formGroupClassName(field){
    return `form-group row ${field.touched && field.invalid ? 'has-danger' : ''}`;
  }

  renderFormInputField(field, label, inputAttrs={}){
    return (
      <div className={this.formGroupClassName(field)}>
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
    const { fields: { first, last, address1, address2, city, state, zip,
                      hire_date, status, subcontractor, birthday }
            , handleSubmit } = this.props;

    return (
      <div>
        <Link to="/employees">Back to Employee Management</Link>
        {this.renderTitle()}
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

          {this.renderFormInputField(first, 'First', {autoFocus: true})}
          {this.renderFormInputField(last, 'Last')}
          {this.renderFormInputField(address1, 'Address 1')}
          {this.renderFormInputField(address2, 'Address 2')}
          {this.renderFormInputField(city, 'City')}
          {this.renderFormInputField(state, 'State')}
          {this.renderFormInputField(zip, 'Zip Code')}
          {this.renderFormInputField(hire_date, 'Hire Date', {placeholder: 'MM/DD/YYYY'})}
          <div className='form-group row'>
            <label className='col-sm-2 form-control-label'>Status</label>
            <div className='col-sm-2'>
              <select
                {...status}
                value={status.value || ''}  // required syntax for reset form to work
                                            // undefined will not change value to first empty option
                                            // when resetting
                >
                <option></option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
            <label className='col-sm-4 form-control-label'>
              <input type="checkbox" {...subcontractor}/> Subcontractor
            </label>
          </div>
          {this.renderFormInputField(birthday, 'Birthday', {placeholder: 'MM/DD/YYYY'})}

          <button type='submit' className="btn btn-primary">Submit</button>
          <Link to="/employees" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
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
  fields: ['first', 'last', 'address1', 'address2', 'city', 'state', 'zip',
           'hire_date', 'status', 'subcontractor', 'birthday'],
  validate
}, mapStateToProps, { createEmployee, updateEmployee })(EmployeesDetail);
