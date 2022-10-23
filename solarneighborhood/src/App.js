import logo from './icons/logo.png';
import './App.css';
import { QuestionnairePageinit} from './QuestionnairePage';
import {useNavigate} from "react-router-dom";
import { renderHook } from '@testing-library/react';
import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

//const QuestionnairePage = require("./QuestionnairePage.js");
  
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className= "Welcome">
          Welcome to Solar Neighborhood!
        </p>
      </header>
        <img src={logo} className="App-logo" alt="logo" />
        <p className= "Text">
          Are you a:
        </p>
        <Router>
          <div>
            <nav>
            <ul>
              <li>
               <Link to="/QuestionnairePage">
              <button className="Homepage-buttons" role= "button">
                Consumer
              </button>
              </Link>
                </li>
            </ul>
            </nav>
            <Routes>
              <Route exact path='/' element={<QuestionnairePageinit/>}>
              </Route>
              <Route exact path= "/QuestionnairePage" element = {<QuestionnairePageinit/>}>
              </Route>
            </Routes>
        </div>
      </Router>
        <button className= "Homepage-buttons" role= "button">
          Company
        </button>
    </div>
    
  );
}
export default App;