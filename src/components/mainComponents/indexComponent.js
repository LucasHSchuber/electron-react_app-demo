// components/Home.js

import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
// import fs from 'fs';
// import path from 'path';



function Index() {

    //define states
    const [name, setName] = useState("");

    const Navigate = useNavigate();


    // Load the name from localStorage when the component mounts
    useEffect(() => {
        const storedName = localStorage.getItem('savedName');
        if (storedName) {
            setName(storedName);
        }
    }, []);


    const navigateToHome = () => {
        Navigate('/');
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log("sent");
        console.log("Name:", name);
        if (name.trim() !== "") {
            console.log(name);
            localStorage.setItem('savedName', name);
            // Write the name to the JSON file
            // const updatedData = { name };
            // const filePath = path.join(__dirname, 'saved_data', 'name.json');
            // fs.writeFile(filePath, JSON.stringify(updatedData), (err) => {
            //     if (err) {
            //         console.error('Error writing name to file:', err);
            //     } else {
            //         console.log('Name written to file:', name);
            //         setName("");
            //     }
            // });

            Navigate('/portal');

        } else {
            console.log("Enter a valid name");
        }
    }



    return (
        <div className='index-wrapper slide-in-effect'>
            <form onSubmit={submitForm}>
                <input placeholder='Namn' id="name" value={name} onChange={(e) => setName(e.target.value)} />
                <button className="button standard my-3" type='submit'><i class="fa-icon fa-solid fa-arrow-right"></i></button>
            </form>

            <div>
                <button className='back-button' onClick={navigateToHome}><i class="fa-icon fa-solid fa-caret-left"></i></button>
            </div>
        </div>
    );
}

export default Index;
