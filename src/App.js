import React, { Component } from 'react';
import axios from './axios'
import './App.css';


class App extends Component {

  state = {
    data: [],
    firstName: '',
    lastName: '',
    money: 0
  }

  componentDidMount() {
    this.handleGet()
  }

  componentDidUpdate(){
    this.handleGet()
  }

  handlePost = () => {
    let obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      money: this.state.money,

    }

    axios.post('/person.json', obj)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  handleGet = () => {
    axios.get('/person.json')
      .then(response => {
        let data = []
        for (let i in response.data) {
          data.push(response.data[i])
          this.setState({ data})
        }
      }
      )
  }

  firstNameChangeHandler = (event) => {
    this.setState({
      firstName: event.target.value
    })
  }
  lastNameChangeHandler = (event) => {
    this.setState({
      lastName: event.target.value
    })
  }
  moneyChangeHandler = (event) => {
    this.setState({
      money: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className={'container'}>
          <div>
            <label>First Name</label>
            <input type='text' placeholder='First Name' value={this.state.firstName} onChange={this.firstNameChangeHandler} />
            <label>Last Name</label>
            <input type='text' placeholder='Last Name' value={this.state.lastName} onChange={this.lastNameChangeHandler} />
            <div>
              <label>Money</label>
              <input type='number' placeholder='Bills' value={this.state.money} onChange={this.moneyChangeHandler} />
            </div>
          </div>
          <button onClick={this.handlePost}>Post</button>
          <button onClick={this.handleGet}>Get</button>
          <form className={'form'}>
            <div>
              <label>First Person</label>
              <select>
                {this.state.data.map((person, i) => {
                  return <option key={i}>{person.firstName}</option>
                })}
              </select>
              <input type='number' />
            </div>
            <span>To</span>
            <div>
              <label>Second Person</label>
              <select>
                {this.state.data.map((person, i) => {
                  return <option key={i}>{person.firstName}</option>
                })}
              </select>
            </div>
            <button type='submit'>Update</button>
          </form>
          <table >
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Money</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((person, i) => {
                return <tr key={i}>
                  <td >{i+1+'.'}</td>
                  <td>{person.firstName} </td>
                  <td>{person.lastName} </td>
                  <td>{person.money + '$'} </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;

