import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Header from './Header/Header';
import Posts from './Posts/Posts';
import Post from './Post/Post';
import Footer from './Footer/Footer';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
	background: #fff;
	font-family: "Josefin Sans", arial, sans-serif;
    font-weight: 300;
    font-size: 18px;
    line-height: 1.9;
    color: #6c757d;
  }

  a {
  	-webkit-transition: .3s all ease;
  	-o-transition: .3s all ease;
  	transition: .3s all ease;
  	text-decoration: none;
  }

  a:hover {
  	text-decoration: none;
  }

  h1, h2, h3, h4, h5 {
  	color: #000;
  	font-family: "Josefin Sans", arial, sans-serif;
  }
`;

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <Route exact path='/' component={Posts}/>
        <Route exact path='/post/:postId' component={Post}/>
        <Footer />
      </div>
    );
  }
}

export default App;
