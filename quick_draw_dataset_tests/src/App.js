import React, { Component } from 'react';
import * as d3 from 'd3'


class App extends Component {
  constructor(){
    super();
    this.state = {
      data: null,
    }
  }

  draw = () => {
    const width = 960;
    const height = 500;
    const blur = .8628;

    d3.select("#texto")
      .append("h1")
      .text("Learning D3")


    const svg = d3.select("#imagem").append("svg")
      .attr("width", width)
      .attr("height", height)

    const g = svg.append('g');

    const drawings = this.state.data.slice(4, 5);

    const line =  d3.line()
      .x(function(d) { return d.x })
      .y(function(d) { return d.y })
      .curve(d3.curveBasis)
    const spacing = 90;
    //const groups = g.selectAll("g.drawing").data(drawings)
    const groups = g.selectAll("g.drawing").data(drawings)

     var groupsE = groups.enter().append("g")
      .classed("drawing", true)
      /*.attr("transform", function(d,i) {
        // lay them out in a grid
        var x = -width + (i % 30) * spacing;
        var y = -height + Math.floor(i/30) * spacing
        return "translate(" + [x,y] + ")scale(0.25)" 
      })
*/
      .style("fill", "none")
      .style("stroke", "#111")
      .style("stroke-width", 9)

      .on("click", function(d) { console.log(d) })


    console.log('drawings');
    console.log(drawings);

       var pathsE = groupsE.selectAll("path.stroke").data(function(d) { 
          // the data for each path is an array of points
          // but it doesn't start that way
          // the original format is [ [x0,x1,x2...], [y0,y1,y2...]]
          return d.drawing.map(function(s) {
            var points = []
            s[0].forEach(function(x,i) {
              points.push({x: x, y: s[1][i] })
            })
            return points;
          })
        }).enter().append("path").classed("stroke", true)
        
        pathsE.attr("d", line)
        /*
        var zoom = d3.zoom()
          .scaleExtent([1/12, 4])
          .on("zoom", function() {
            g.attr("transform", d3.event.transform)
          })
        svg.call(zoom)
      })*/
/*

    svg.selectAll("rect")
       // Add your code below this line
       .data(dataset)
       .enter()
       .append("rect")
       // Add your code above this line
       .attr("x", 0)
       .attr("y", 0)
       .attr("width", 25)
       .attr("height", 100);
*/
    /*
    const svg = d3.select("img").append("svg")
      .attr("width", width)
      .attr("height", height)
    const g = svg.append("g");
  */

  }
  getData = async () => {
    const config = {
      method:'get',
      //url:'http://  ',
       headers: {
               'Content-Type': 'application/json',
              Accept: 'application/json'
          },
      responseType:'json'
    }

    const response = await fetch("http://localhost:4000/", config).catch(err=>console.log(err.message));
    const _json = await response.json();

    console.log('\ndone\n');

    this.setState({data: _json});    
  }
  consoleData = () => {
    console.log(this.state.data[0]);
  }

  render() {
    return (
      <div style={{width: 500, height: 500, background: "cyan"}}>
        <button onClick={this.getData}> Get Data </button>
        <button onClick={this.consoleData}> ConsoleData </button>
        <button onClick={this.draw}> Add SVG </button>
        <div id='texto'></div>
        <div id='imagem'></div>
      </div>
    );
  }
}

export default App;


/*
    var width = 960;
    var height = 500;
    var blur = .8628;
    var svg = d3.select("root").append("svg")
      .attr("width", width)
      .attr("height", height)
    var g = svg.append("g") // for our zoom
        
    d3.json("canadian-faces.json", function(err, drawings) {
    // check the console to see the data format!
    console.log(drawings);

    var line =  d3.line()
      .x(function(d) { return d.x })
      .y(function(d) { return d.y })
      .curve(d3.curveBasis)

    var spacing = 90;
    var groups = g.selectAll("g.drawing").data(drawings)
    var groupsE = groups.enter().append("g")
      .classed("drawing", true)
      .attr("transform", function(d,i) {
        // lay them out in a grid
        var x = -width + (i % 30) * spacing;
        var y = -height + Math.floor(i/30) * spacing
        return "translate(" + [x,y] + ")scale(0.25)" 
      })
      // we style the groups instead of the individual paths for a slight performance boost
      .style("fill", "none")
      .style("stroke", "#111")
      .style("stroke-width", 9)
      .on("click", function(d) { console.log(d) })
//       .style("stroke-opacity", 0.5)
    var pathsE = groupsE.selectAll("path.stroke").data(function(d) { 
      // the data for each path is an array of points
      // but it doesn't start that way
      // the original format is [ [x0,x1,x2...], [y0,y1,y2...]]
      return d.drawing.map(function(s) {
        var points = []
        s[0].forEach(function(x,i) {
          points.push({x: x, y: s[1][i] })
        })
        return points;
      })
    }).enter().append("path").classed("stroke", true)
    
    pathsE
      .attr("d", line)
    
    var zoom = d3.zoom()
      .scaleExtent([1/12, 4])
      .on("zoom", function() {
        g.attr("transform", d3.event.transform)
      })
    svg.call(zoom)
  })
    
  var defs = svg.append("defs");
  var filter = defs.append("filter").attr("id","gooeyCodeFilter");
  filter.append("feGaussianBlur")
    .attr("in","SourceGraphic")
    .attr("stdDeviation",blur)
    .attr("color-interpolation-filters","sRGB")
    .attr("result","blur");
  filter.append("feColorMatrix")
    .attr("in","blur")
    .attr("mode","matrix")
    .attr("values","1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7")
    .attr("result","gooey")
  g.style("filter", "url(#gooeyCodeFilter)")
*/