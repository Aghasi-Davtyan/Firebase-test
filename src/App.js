import React, { Component, useState, useEffect } from 'react';
import axios from './axios'
import './App.css';

class App extends Component {

  state = {
    name: [],
  }

  componentDidMount() {
    axios.get('/person.json')
      .then(response=>{
        let names = []
        for(let i in response.data){
          names.push(response.data[i].firstName)
          this.setState({name: names}) 
        }
        console.log(names)
     }
      )
  }
  // componentDidUpdate() {
  //   axios.get('/person.json')
  //     .then(response=>{
  //       let names = []
  //       for(let i in response.data){
  //         names.push(response.data[i].firstName)
  //         this.setState({name: names}) 
  //       }
  //       console.log(names)
  //    }
  //     )
  // }

  handlePost = () => {
    let obj = {
      firstName: 'Edo',
      lastName: 'Sensai',
      bills: 2430,
    }

    axios.post('/person.json',obj)
    .then(response=>console.log(response))
    .catch(error=>console.log(error))
  }

    handleGet = () => {
      axios.get('/person.json')
      .then(response=>{
        console.log(response.data)
     }
      )
      .catch(error=>console.log(error))
    }

  render() {
    return (
      <div className="App">
        <div className={'container'}>
          <button onClick={this.handlePost}>Post</button>
          <form className={'form'}>
          <button onClick={this.handleGet}>Get</button>
            <div>
              <label>First Person</label>
              <select>
              {this.state.name.map(name=> {
                return<option>{name}</option>
              })}
            </select>
              <input type='number' />
            </div>
            <div>
              <label>Second Person</label>
              <select>
              {this.state.name.map(name=> {
                return<option>{name}</option>
              })}
            </select>
            </div>
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;

