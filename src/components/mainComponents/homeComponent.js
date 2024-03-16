// components/Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from "../../assets/images/logo512.png"
import soccerball from "../../assets/images/soccer-ball.png"

function Home() {
    //define states


    const Navigate = useNavigate();

    //navigate user to index
    const navigateToIndex = () => {
        Navigate('/index');
    }


    return (
        <div className='home-wrapper fade-in-effect'>
            <h1 className='title'>Teamleader</h1>
            <p>Enter your name and choosen language to start the application</p>

            <img src={soccerball} className='home-logo' alt='home-logo' ></img>

            <div>
                <button className='button standard forced-width' onClick={navigateToIndex}>Start</button>
            </div>
            <div>
                <select className='select' id="languageSelect">
                    <option>Svenska</option>
                    <option>Finska</option>
                    <option>Tyska</option>
                    <option>Norska</option>
                </select>
            </div>
        </div>
    );
}

export default Home;
