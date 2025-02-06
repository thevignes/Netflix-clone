import React from 'react'
import yticon from '../../assets/youtube_icon.png';
import twiterIcon from '../../assets/twitter_icon.png'
import InstgramIcon from '../../assets/instagram_icon.png'
import faceBookIcon from '../../assets/facebook_icon.png'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer'>
    <div className='footer-icon'>
        <img src={faceBookIcon} alt="Facebook" />
        <img src={InstgramIcon} alt="Instagram" />
        <img src={twiterIcon} alt="Twitter" />
        <img src={yticon} alt="YouTube" />
    </div>
    <div className='footer-links'>
        <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Speed Test</a></li>
        </ul>
        <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Cookie Preferences</a></li>
            <li><a href="#">Legal Notices</a></li>
        </ul>
        <ul>
            <li><a href="#">Account</a></li>
            <li><a href="#">Ways to Watch</a></li>
            <li><a href="#">Corporate Information</a></li>
            <li><a href="#">Only on Netflix</a></li>
        </ul>
        <ul>
            <li><a href="#">Media Center</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Contact Us</a></li>
        </ul>
    </div>
    <div className='footer-text'>
        <p>© 2024 Netflix, Inc.</p>
    </div>
</div>
  )
}

export default Footer
