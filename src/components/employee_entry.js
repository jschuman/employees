import React, { Component } from 'react';

export default class Employees extends Component {
  constructor(props){
    super(props);

    this.state = { first: '', last: ''};

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFirstInputChange = this.onFirstInputChange.bind(this);
    this.onLastInputChange = this.onLastInputChange.bind(this);
  }

  onFormSubmit(e){
    e.preventDefault();
    this.firebaseRef = new Firebase("https://solstreet-employees.firebaseio.com/employees/");
    this.firebaseRef.push({
      first: this.state.first,
      last: this.state.last
    });

    this.setState({first: '', last: ''});
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
