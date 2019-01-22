import React, { Component } from 'react';
import Drawing from './Drawing';

class Face extends Component {
	constructor(){
		super()
	}
	static defaultProps = {
		size: 700,
	}

	render(){
		return (

			<div style={{width: this.props.size}}> 
				<div style={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
					<Drawing data={this.props.rightEye} width={this.props.size/2}/>
					<Drawing data={this.props.leftEye} width={this.props.size/2}/>
				</div>
				<div style={{width:"100%", display: 'flex', justifyContent: 'center'}}>
					<Drawing data={this.props.mouth} width={this.props.size/2}/>
				</div>
			</div>

		)
	}

}

export default Face;