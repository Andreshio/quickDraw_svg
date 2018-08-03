import React, { Component } from 'react';
import * as d3 from 'd3'

class Drawing extends Component {
	createPath = (s, i) => {
		const line =  d3.line()
    		.x((d) => d.x)
    		.y((d) => d.y)
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
           //className="line-container"
           width={this.props.width}
           height={this.props.height}
        >
           <g stroke="#111" fill="none" strokeWidth="9" onClick={()=>console.log('clicked')}>
    			{this.props.data.drawing.map(this.createPath)}
    		</g>
        </svg>
    )
}

export default Drawing;