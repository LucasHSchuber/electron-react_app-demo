import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/headerComponents/headerComponent';
import Home from './components/mainComponents/homeComponent';
import Index from './components/mainComponents/indexComponent';
import Portal from './components/mainComponents/portalComponent';
import Newteam from './components/mainComponents/newteamComponent';


//importing css style
import './assets/css/global.css';
import './assets/css/main.css';
import './assets/css/buttons.css';
import './assets/css/animations.css';

function App() {
  return (
    <div>

      <Router>

        <div className=''>
          <Header />
        </div>

        <div className='center-page'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
        <div className='center-page'>
          <Routes>
            <Route path='/index' element={<Index />} />
          </Routes>
        </div>
        <div className='center-page'>
          <Routes>
            <Route path='/portal' element={<Portal />} />
          </Routes>
        </div>
        <div className='center-page'>
          <Routes>
            <Route path='/newteam' element={<Newteam />} />
          </Routes>
        </div>

      </Router>

    </div>
  );
}

export default App;
