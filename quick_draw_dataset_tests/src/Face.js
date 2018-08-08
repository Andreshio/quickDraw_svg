import React, { Component } from 'react';
import Drawing from './Drawing';

class Face extends Component {
	constructor(){
		super()
	}


	render(){
		return (

			<div style={{width: 350}}> 
				<div style={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
					<Drawing data={this.props.rightEye} width={150}/>
					<Drawing data={this.props.leftEye} width={150}/>
				</div>
				<div style={{width:"100%", display: 'flex', justifyContent: 'center'}}>
					<Drawing data={this.props.mouth} width={150}/>
				</div>
			</div>

		)
	}

}

export default Face;