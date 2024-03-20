import React, { useState } from 'react';

function Newteam() {
    // Define states
    const [name, setName] = useState('');
    const [workname, setWorkname] = useState('');
    const [county, setCounty] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form:', name, workname, county);
        if (window.Bridge && window.Bridge.sendSubmit) {
            window.Bridge.sendSubmit({ name, workname, county });
        } else {
            console.log('Bridge or sendSubmit function not available');
        }
        setName('');
        setWorkname('');
        setCounty('');
    };
    

    return (
        <div>
            <h1>Add User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder='Name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <input placeholder='Workname' type="text" value={workname} onChange={(e) => setWorkname(e.target.value)} />
                </div>
                <div>
                    <input placeholder='County' type="text" value={county} onChange={(e) => setCounty(e.target.value)} />
                </div>
                <button className='button standard' type="submit">Add User</button>
            </form>
        </div>
    );
}

export default Newteam;
