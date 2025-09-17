import React from 'react'
import {FaCoins} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <Link to='/' className='logo-link'>
                <FaCoins className='icon' />
                <h1> Crypto<span className='purple'>Table</span></h1>
            </Link>
            <span className='by-mg'>by <a href="https://portfoliobymg.netlify.app/" target="_blank" rel="noopener noreferrer" className="mg-link">MG</a></span>
        </div>
    )
}

export default Navbar
