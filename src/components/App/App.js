import React from 'react';
import { Steps } from '../Steps';
import logo from '../../assets/logo-endless.svg';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <div className="content-container">
          <img id="logo" src={logo} alt="Endless Logo" />
        </div>
      </header>
      <main>
        <div id="couch">
          <div className="content-container">
            <h2>New Games &amp; Accessories</h2>
            <span>Monthly packages.<br/>Excitement delivered daily.</span>
            <p>
              What’s the best way to shop for the latest video games and peripherals? 
              How about never shopping at all? You’ll get new stuff on your doorstep &mdash; every month.
            </p>
            <button>Get Started</button>
          </div>
        </div>
        <Steps />
      </main>
    </div>
  );
}

export default App;
