import React, { Component } from 'react';
//import Drawing from './Drawing';
import Face from './Face';

class App extends Component {
  constructor(){
    super();
    this.state = {
      //eyes: null,
      mouth: null,
      rightEye: null,
      leftEye: null,
      indexes: null,
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
    //const { eyes, mouths } = await response.json();
    //const eyes = data.eyes
    const { rightEye, leftEye, mouth, indexes } = await response.json();

    //const rightEye = Math.floor(Math.random()*eyes.length);
    //const leftEye = Math.floor(Math.random()*eyes.length);
    //const mouth = Math.floor(Math.random()*mouths.length);

    //this.setState({eyes, rightEye, leftEye, mouths, mouth});    
    this.setState({rightEye, leftEye, mouth, indexes});   
  }
  changeDrawing = (event) => {
    if(event.target.value >= 0){
      this.setState({selectedDrawing: event.target.value})
    }
  }
  render = () => {
    return (
      <div>
        <h1>fetched data: {this.state.eyes?"true":"false"}</h1>
        <button onClick={this.getData}> Get Data </button>
        <br/>
        Escolha o desenho: <input type="number" value={this.state.selectedDrawing} onChange={this.changeDrawing}/>
        <div style={{padding: 30, display: 'flex', justifyContent: 'center'}}>
                    
          {
            this.state.mouth&&
              <Face 
                //eyes={this.state.eyes} 
                rightEye={this.state.rightEye} 
                leftEye={this.state.leftEye}
                mouth={this.state.mouth}
              />
          }

        </div>
        <h1> Face ids:  </h1>
        {
            this.state.indexes?
              <div>
                <p> rightEye: {this.state.indexes.rightEye} </p>
                <p> leftEye: {this.state.indexes.leftEye} </p>
                <p> mouth: {this.state.indexes.mouth} </p>
              </div>
            :
              <p> NULL </p>
        }
      </div>
    );
  }
}

export default App;