import React from 'react';
import styled from 'styled-components';

function Footer() {
  const Footer = styled.div`
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    padding: 1em 0;
    background: #000;
  `;

  return (
    <Footer>
      <div className="container">
        <div className="row">
          <div class="col-md-12">
            Copyright ©<script>document.write(new Date().getFullYear());</script>2018 All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default Footer;
