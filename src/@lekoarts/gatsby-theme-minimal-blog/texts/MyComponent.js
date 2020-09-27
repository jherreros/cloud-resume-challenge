import React, { Component } from "react";
const apiUrl = 'https://api.juanherreros.com/count/default';
const apiKey = "API_KEY_PLACEHOLDER";

export default class MyComponent extends Component {
  state = {
    error: null,
    isLoaded: false,
    userCount: 0
  };

  componentDidMount() {

    fetch(apiUrl, {
      method: 'GET', 
      mode: 'cors',
      headers: {
        'X-Api-Key': apiKey,
      },
    }).then(
      response => {
        response.json()
          .then((data) => {
            this.setState({
              userCount: data['userCount'],
              isLoaded: true
            });
          })
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      },
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
        <div>Number of visits: {userCount}</div>
      );
    }
  }
}