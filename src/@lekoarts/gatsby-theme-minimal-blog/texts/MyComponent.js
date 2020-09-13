import React, { Component } from "react";
const axios = require('axios');
const ipApi = "https://json.geoiplookup.io/api";
const apiUrl = 'https://o1bo5vy254.execute-api.eu-central-1.amazonaws.com/Prod/count/';

export default class MyComponent extends Component {
  state = {
    error: null,
    isLoaded: false,
    userIp: '0.0.0.0',
    userCount: 0
  };

  componentDidMount() {
    axios.get( ipApi ).then(
      response => {
        this.setState({
          userIp: response.data.ip
        });
        axios.get( apiUrl.concat(this.state.userIp) ).then(
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
      },
      error => {
        this.setState({
            isLoaded: true,
            error
        });
      }
      );
  }

  render() {
    const { error, isLoaded, userIp, userCount } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      <p>You have visited this page {userCount} times from your IP: {userIp}</p>
      );
    }
  }
}