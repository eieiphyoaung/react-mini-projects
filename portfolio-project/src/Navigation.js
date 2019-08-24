import React from 'react';
import './Navigation.css';

class Navigation extends React.Component{
	render(){
		const sections = ['Home','About','Service','Portfolio','Contact'];
		const navLinks = sections.map( section => {
			return(
				<li><a href={ '#' + section}>{section}</a></li>
				)
		});
		return(
		
			<nav>
				<h2 className="logo">{this.props.logoTitle}</h2>
				<ul>	
					{navLinks}
				</ul>
			</nav>

		)
	}
}

export default Navigation;