import React from 'react';
import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import Banner from './banner.jpg';

function Header() {
  return (
    <div>
      <Img src={Banner} alt="react-boilerplate - Logo"/>
      <NavBar />
    </div>
  );
}

export default Header;
