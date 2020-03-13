import React, { Component } from 'react';
import axios from './axios'
import './App.css';


class App extends Component {

  state = {
    data: [],
    firstName: '',
    lastName: '',
    money: 0,
    accountNumber: 0
  }

  componentDidMount() {
    this.handleGet()
  }

  // componentDidUpdate(){
  //   this.handleGet()
  // }

  handlePost = () => {
    let obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      money: this.state.money,
      accountNumber: this.state.accountNumber + Math.floor(Math.random() * 10000000000000) + 1
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
          this.setState({ data })
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
            {/* <label>First Name:</label> */}
            <input type='text' placeholder='First Name' value={this.state.firstName} onChange={this.firstNameChangeHandler} />
            {/* <label>Last Name:</label> */}
            <input type='text' placeholder='Last Name' value={this.state.lastName} onChange={this.lastNameChangeHandler} />
            <div>
              <label>Money</label>
              <input type='number' placeholder='Bills' value={this.state.money} onChange={this.moneyChangeHandler} />
            </div>
          </div>
          <button onClick={this.handlePost}>Post</button>
          <button onClick={this.handleGet}>Get</button>
          <form className={'form'}>
            <div>Transfer</div>
            <select>
              {this.state.data.map((person) => {
                return <option key={person.accountNumber}>{person.firstName}</option>
              })}
            </select>
            <span>To</span>
            <select>
              {this.state.data.map((person) => {
                return <option key={person.accountNumber}>{person.firstName}</option>
              })}
            </select>
            <div>Аmount of money</div>
            <div>
              <input type='number' />
            </div>
            <button type='submit'>Update</button>
          </form>
          <table className={'cent'}>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Money</th>
                <th>Account Number</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((person, i) => {
                return <tr key={person.accountNumber}>
                  <td >{i + 1 + '.'}</td>
                  <td>{person.firstName} </td>
                  <td>{person.lastName} </td>
                  <td>{person.money + '$'} </td>
                  <td>{person.accountNumber} </td>
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

