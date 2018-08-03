import React, { Component } from 'react';
import Drawing from './Drawing';

class App extends Component {
  constructor(){
    super();
    this.state = {
      data: null,
      selectedDrawing: 0,
    }
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
    console.log(_json[0]);
    this.setState({data: _json});    
  }
  changeDrawing = (event) => {
    if(event.target.value >= 0){
      this.setState({selectedDrawing: event.target.value})
    }
  }
  render = () => {
    return (
      <div>
        <h1>fetched data: {this.state.data?"true":"false"}</h1>
        <button onClick={this.getData}> Get Data </button>
        <br/>
        Escolha o desenho: <input type="number" value={this.state.selectedDrawing} onChange={this.changeDrawing}/>
        <div style={{padding: 30}}>
          {
            this.state.data&&
              <Drawing height={500} width={960} data={this.state.data[this.state.selectedDrawing]} />
          }
        </div>
        <h1>was recognized: {
            this.state.data?this.state.data[this.state.selectedDrawing].recognized?
              "true":"false"
          :"false"}</h1>
      </div>
    );
  }
}

export default App;