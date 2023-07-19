import React, { Component } from 'react'
import logo from "../public/logo.png";
import "./Header.css"


export class Header extends Component {
  render() {
    return (
        <header className="Header">
        <img src={logo} className="Header-logo" alt="Logo" />
      </header>
    )
  }
}

export default Header;
