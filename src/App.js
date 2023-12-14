import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Customize } from './customize/customize';
import { Game } from './game/game';
import { Gallery } from './gallery/gallery';
import './App.scss';

function App() {

  return (
    <BrowserRouter>
      <div>
        <div className='navbar' id='navbar'>
          <a>
            <NavLink to=''>
              Home
            </NavLink>
          </a>
          <a>
            <NavLink to='customize'>
              Customize
            </NavLink>
          </a>
          <a>
            <NavLink to='game'>
              Game
            </NavLink>
          </a>
          <a>
            <NavLink to='gallery'>
              Gallery
            </NavLink>
          </a>
        </div>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/customize' element={<Customize />} />
          <Route path='/game' element={<Game />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='*' element={<Login />} />
        </Routes>

        <footer className="footer">
          <a href="https://github.com/soph1e-mart1n/startup.git">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
