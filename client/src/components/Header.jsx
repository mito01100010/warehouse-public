import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Logo from "../img/logo.png"

const Header = () => {
  const {currentUser, logout} = useContext(AuthContext);

  return (
    <div className='header'>
      <div className="header__inner">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>

        <nav className="nav">
          <Link className='link nav__link' to="/findProduct">Find Product</Link>

          <Link className='link nav__link' to="/addProduct">Add Product</Link>

          <span>{currentUser?.username}</span>

          <span className='logout' onClick={logout}>Logout</span>
        </nav>
      </div>
    </div>
  )
}

export default Header