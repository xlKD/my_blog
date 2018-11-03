import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Posts from './Posts/Posts';
import Post from './Post/Post';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={Posts}/>
        <Route exact path='/post/:postId' component={Post}/>
      </div>
    );
  }
}

export default App;
