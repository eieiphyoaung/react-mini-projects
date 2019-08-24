import React from 'react';
import Background from './img/orange.jpg';
import './Header.css';

const myStyles = {
		backgroundImage: `url(${Background})`,
		height:'50vh',
		backgroundSize:'cover',
	}
	
class Header extends React.Component{
	render(){
		return(
			<header style={myStyles}>
				<h1>{this.props.title}</h1>
				<p>A Free Bootstrap Theme By Start Bootstrap</p>
				<a href="#about" class="btn btn-primary" type="button">{this.props.button}</a>
			</header>
		);
	}
}

export default Header;