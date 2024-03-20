// components/Home.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import logo from "../../assets/images/logo512.png"
import soccerball from "../../assets/images/soccer-ball.png"




function Home() {
    //define states
    const [homeDir, setHomeDir] = useState('');
    const [arch, setArch] = useState('');
    const [osVersion, setOsVersion] = useState('');

    

    const Navigate = useNavigate();

    //navigate user to index
    const navigateToIndex = () => {
        Navigate('/index');
    }

    useEffect(() => {
        // Access the exposed electron object
        if (window.electron) {
            // Call the homeDir function
            const homedir = window.electron.homeDir();
            const arch = window.electron.arch();
            const osVersion = window.electron.osVersion();
            setHomeDir(homedir);
            setArch(arch);
            setOsVersion(osVersion);
        }
    }, []);






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

            <div className='mt-4'>
                <h6>Home Directory: <em>{homeDir}</em></h6>
                <h6>OS arch: <em>{arch}</em></h6>
                <h6>OS version: <em>{osVersion}</em></h6>
            </div>

        </div>
    );
}

export default Home;
