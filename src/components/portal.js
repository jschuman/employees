import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Portal extends Component {

  render(){
    return (
      <div>
        <h1>Solution Street HR Portal</h1>
        <Link to='employees'>Employee Management</Link>
      </div>
    )
  }
}
