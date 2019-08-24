import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Navigation from './Navigation';
import Header from './Header';
import Service from './Services';

import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  render(){
  	return (
	    <div>
	      <Navigation logoTitle="React Protfolio"/>
	      <Header title="Stylish Protfolio" button="Find Out More"/>
	      <Service />
	    </div>
	  );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
