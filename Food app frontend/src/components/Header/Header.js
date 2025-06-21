import React from 'react'
import './Header.css'
import {Link} from "react-router-dom";
const Header = () => {
  return (
    <div className='header'>
      <div className='overlay'>
        <div className='slider'>
        <div className="header-contents">
        <h2>Taste the Best, Anytime, Anywhere!</h2>
        <p>Explore our menu packed with fresh, flavorful dishes crafted to satisfy every taste. Order now and enjoy quick delivery to your door!</p>
        <Link to='/menu'>
        </Link>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Header
