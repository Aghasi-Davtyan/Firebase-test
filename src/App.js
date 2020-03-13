import React, { Component } from 'react';
import axios from './axios'
import './App.css';

class App extends Component {

  state = {
    name: [],
    firstName: '',
    lastName: '',
    bills: 0
  }

  componentDidMount() {
    this.handleGet()
  }


  handlePost = () => {
    let obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      bills: this.state.bills,
    }

    axios.post('/person.json', obj)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  handleGet = () => {
    axios.get('/person.json')
      .then(response => {
        let names = []
        for (let i in response.data) {
          names.push(response.data[i].firstName)
          this.setState({ name: names })
        }
        console.log(names)
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
  billsChangeHandler = (event) => {
    this.setState({
      bills: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className={'container'}>
          <div>
            <div>
              <label>First Name</label>
              <input type='text' placeholder='First Name' value={this.state.firstName} onChange={this.firstNameChangeHandler}/>
            </div>
            <div>
            <label>Last Name</label>
              <input type='text' placeholder='Last Name' value={this.state.lastName} onChange={this.lastNameChangeHandler} />
            </div>
            <div>
            <label>Bills</label>
              <input type='number' placeholder='Bills' value={this.state.bills} onChange={this.billsChangeHandler}/>
            </div>
          </div>
          <button onClick={this.handlePost}>Post</button>
          <button onClick={this.handleGet}>Get</button>
          <form className={'form'}>
            <div>
              <label>First Person</label>
              <select>
                {this.state.name.map((name, i) => {
                  return <option key={i}>{name}</option>
                })}
              </select>
              <input type='number' />
            </div>
            <div>
              <label>Second Person</label>
              <select>
                {this.state.name.map((name, i) => {
                  return <option key={i}>{name}</option>
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

