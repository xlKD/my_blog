import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';

function Header() {
  const Header = styled.header`
	position: relative;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    font-weight: 400;
    background: #fff !important;

	.navbar {
	  padding-top: 0;
      padding-bottom: 0;
      background: transparent !important;

	  .container {
	    border-bottom: 1px solid #e6e6e6;
	  }

      .nav-link {
        padding: 1.7rem 1rem;
        font-size: 13px;
        outline: none !important;
        text-transform: uppercase;
        letter-spacing: .05em;
      }

	  @media (max-width: 991.98px) {
		header .navbar .nav-link {
		  padding: 1.7rem 1rem;
		}
	  }

	  @media (max-width: 767.98px) {
		header .navbar .nav-link {
		  padding: .5rem 0rem;
		}
	  }
	}
  `;
  const TopBar = styled.div`
    background: #000;
    padding: 10px 0;

    .social {
      text-align:left;

      a {
        color: #fff;
        opacity: .5;
        padding: 6px;
      }
    }
  `;

  const SearchTop = styled.div`
    .search-top-form {
      position: relative;
      float: right;
    }

	.icon {
	  position: absolute;
      right: 10px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      font-size: 15px;
      color: #fff;
	}

	input {
	  color: #fff;
      background: #212121;
      width: inherit;
      min-width: 300px;
      border: none;
      -webkit-transition: .3s all ease;
      -o-transition: .3s all ease;
      transition: .3s all ease;
      padding: 4px 30px 4px 15px;
      font-size: 16px;
	}
  `;

  return (
    <Header role="banner">
      <TopBar>
        <div className="container">
          <div className="row">
            <div className="col-9 social">
              <a href="#"><span className="fa fa-twitter"></span></a>
              <a href="#"><span className="fa fa-facebook"></span></a>
              <a href="#"><span className="fa fa-instagram"></span></a>
            </div>
            <SearchTop className="col-3">
              <form action="#" className="search-top-form">
                <span className="icon fa fa-search"></span>
                <input type="text" id="s" placeholder="Type keyword to search..." />
              </form>
            </SearchTop>
          </div>
        </div>
      </TopBar>

      <Nav />
    </Header>
  );
}

export default Header;
