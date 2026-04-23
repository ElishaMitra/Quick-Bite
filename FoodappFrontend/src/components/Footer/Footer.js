import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.footerlogo} alt=""/>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus et quam id veniam voluptas similique ipsam culpa facilis minus consequuntur ab, ut itaque nam nesciunt laboriosam quasi necessitatibus ipsum placeat.</p>
                <div className='footer-social-icon'>
                    <img src={assets.facebook_icon} alt=""/>
                    <img src={assets.twitter_icon} alt=""/>
                    <img src={assets.linkedin_icon} alt=""/>

                </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>
                        Home
                    </li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-121-456-7892</li>
                    <li>contact@quickbite.com</li>
                </ul>
            </div>
        </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 @ QuickBite.com-All Right Reserved.</p>
    </div>
  )
}

export default Footer
