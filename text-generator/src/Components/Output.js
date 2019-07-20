import React from 'react';

class Output extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value:props.value
		}
	}

	render(){
		return(
			<div className="well output">
				{this.props.value}
			</div>
			)
	}
}

export default Output;