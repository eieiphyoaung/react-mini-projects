import React from 'react';
import './Service.css';

class Service extends React.Component{
	render(){
		return(
			<div className="services">
				<h3>services</h3>
				<h2>What we Offer</h2>
				<div className="row">

					<Icons myIcon={iconObj[0].icon} myTitle={iconObj[0].title} myDescription={iconObj[0].description} />
					<Icons myIcon={iconObj[1].icon} myTitle={iconObj[1].title} myDescription={iconObj[1].description} />
					<Icons myIcon={iconObj[2].icon} myTitle={iconObj[2].title} myDescription={iconObj[2].description} />
					<Icons myIcon={iconObj[3].icon} myTitle={iconObj[3].title} myDescription={iconObj[3].description} />
					
				</div>
			</div>
		);
	}
}

const iconObj = [
	{
		icon:<ion-icon name="phone-portrait"></ion-icon>,
		title:'Responsive',
		description:'Look greate on any screen size!'
	},
	{
		icon:<ion-icon name="brush"></ion-icon>,
		title:'Redesigned',
		description:'Freshly redesigned for bootstrap 4!'
	},
	{
		icon:<ion-icon name="thumbs-up"></ion-icon>,
		title:'Favourited',
		description:'Millions of users Love Stand for Bootstrap'
	},
	{
		icon:<ion-icon name="help"></ion-icon>,
		title:'Question',
		description:'I mush ask you a question!'
	}

];

class Icons extends React.Component{
	render(){
		return(
			<div>
				<span>{this.props.myIcon}</span>
				<h4>{this.props.myTitle}</h4>
				<p>{this.props.myDescription}</p>
			</div>
		)
	}
}

export default Service;