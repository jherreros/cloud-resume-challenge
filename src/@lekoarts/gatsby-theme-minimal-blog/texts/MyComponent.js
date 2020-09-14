import React, { Component } from "react";
const axios = require('axios');
const apiUrl = 'https://o1bo5vy254.execute-api.eu-central-1.amazonaws.com/Prod/count/default';

export default class MyComponent extends Component {
  state = {
    error: null,
    isLoaded: false,
    userCount: 0
  };

  componentDidMount() {

    axios.get(apiUrl).then(
      response => {
        this.setState({
          isLoaded: true,
          userCount: response.data.userCount
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    const { error, isLoaded, userCount } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <p>Number of visits: {userCount}</p>
      );
    }
  }
}