// components/Home.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from "../../assets/images/logo512.png"
import soccerball from "../../assets/images/soccer-ball.png"
import camera from "../../assets/images/camera.png"

function Portal() {

    //define states
    const [loggedInUser, setLoggedInUser] = useState("");
    const [todayDate, setTodayDate] = useState("");

    const Navigate = useNavigate();

    useEffect(() => {

        //get logged in user from localstorage
        setLoggedInUser(localStorage.getItem('savedName'));

        //get todays date
        const getTodayDate = () => {
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();
    
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
    
            setTodayDate(`${day}-${month}-${year}`);
        }

        getTodayDate();

    }, [])

    const navigateToIndex = () => {
        Navigate('/index');
    }
    const navigateToNewTeam = () => {
        Navigate('/newteam');
    }

   

    return (
        <div className='portal-wrapper slide-in-effect'>
            <div className=''>
                <h3>Portalen</h3>
                <p>
                    {/* <img className='mx-1 mb-1' src={camera} alt='camera icon' style={{ width: "1.3em" }}></img> */}
                    <em>Fotograf: {loggedInUser}</em>
                </p>
            </div>
            <div className='my-4'>
                <button className='button standard forced-width mx-1' >Skicka data</button>
                <button className='button standard forced-width mx-1' onClick={navigateToNewTeam}>Nytt lag</button>
            </div>
            <div>
                <h5>Dina jobb <span style={{ fontSize: "0.9em" }} ><em>({todayDate})</em></span></h5>
                <div className='my-3'>
                    <h6>Jobb1</h6>
                    <h6>Jobb2</h6>
                    <h6>Jobb3</h6>
                </div>
            </div>

            <div>
                <button className='back-button' onClick={navigateToIndex}><i class="fa-icon fa-solid fa-caret-left"></i></button>
            </div>
        </div>
    );
}

export default Portal;
