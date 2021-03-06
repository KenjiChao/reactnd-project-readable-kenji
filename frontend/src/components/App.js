import React, { Component } from 'react';
import logo from './logo.svg';
import fetchCategories from '../utils/api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data',
    };
  }

  componentDidMount() {
    fetchCategories()
      .then((data) => {
        this.setState({ backend: data });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Talking to the backend yields these categories: <br/>
          {this.state.backend}
        </p>
      </div>
    );
  }
}

export default App;
