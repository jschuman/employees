import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img src='/images/ss-logo.png' />
        </Link>
        {this.props.children}
      </div>
    );
  }
}
