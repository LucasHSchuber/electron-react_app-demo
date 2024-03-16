// components/Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from "../../assets/images/logo512.png"
import soccerball from "../../assets/images/soccer-ball.png"

function Header() {

    return (
        <div className='header fade-in-effect'>
            <div className='d-flex'>
                <div className=''>
                    <img src={soccerball} className='header-logo' alt='home-logo' ></img>
                </div>
                <div className='mx-4 mt-2' >
                    <h5>EXPRESS-BILD</h5>
                </div>
            </div>
        </div>
    );
}

export default Header;
