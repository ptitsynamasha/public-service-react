import React from 'react';
import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import Banner from './banner.jpg';

function Header() {
  return (
    <div>
      <A href="https://twitter.com/mxstbr">
        <Img src={Banner} alt="react-boilerplate - Logo"/>
      </A>
      <NavBar />
    </div>
  );
}

export default Header;
