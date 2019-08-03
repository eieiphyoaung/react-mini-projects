import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App_Aside"></div>
      <div className="App_Form">
        <div className="PageSwitcher">
          <a href="#" className="PageSwitcher-Item">Sign In</a>
          <a href="#" className="PageSwitcher-Item PageSwitcher-Item-Active">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default App;
