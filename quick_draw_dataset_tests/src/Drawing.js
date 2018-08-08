import React, { Component } from 'react';
import * as d3 from 'd3'
import PropTypes from 'prop-types';

class Drawing extends Component {
	constructor(){
		super();
		this.state = {
			maxY: 0,
			//height: 255,
			//strokeWidth: 9,
			//opened: 1,
			//closing: true,
		}
	}
	static defaultProps = {
		 width: 255,
	}

	static getDerivedStateFromProps(props, state){
		const yPoints = props.data.drawing.reduce( (a,b)=>[...a, ...b[1]], []);
		const maxY = Math.max(...yPoints);

		return {...state, maxY}
	}
	
	proportionize = n => n*this.props.width/255;

	createPath = (s, i) => {
		const scaleX = d3.scaleLinear()
						.domain([0, 255])
						.range([0, this.props.width]);

		const scaleY = d3.scaleLinear()
						 .domain([0, this.state.maxY])
						 .range([0, this.proportionize(this.state.maxY)])

		const line =  d3.line()
    		.x((d) => scaleX(d.x) )
    		.y((d) => scaleY(d.y) )
    		.curve(d3.curveBasis)

		const points = [];
		s[0].forEach((x,i) => {
        	points.push({x: x, y: s[1][i] })
        })

		return (
			<path d={line(points)} key={i}/>
        )
	}

	render = () => (
        <svg
        	//onClick={this.close}
        	style={{background: 'red'}}
            width={this.props.width?this.props.width:255}
            height={this.proportionize(this.state.maxY)}//this.state.height}
        >
           <g stroke="#111" fill="none" strokeWidth={this.proportionize(9)}>
    			{this.props.data.drawing.map(this.createPath)}
    		</g>
        </svg>
    )
}

export default Drawing;

//https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/