import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
    .then(res => {
      this.setState({
        posts: res.data
      });
    })
    .catch(err => {
      console.log(err.message)
    });
  }

  render() {
    return (
      <div className="App">
      {
        this.state.posts.map(post => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.contents}</p>
          </div>
        ))
      }
      </div>
    );
  }
}

export default App;