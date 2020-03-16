import React, { Component } from 'react';
import axios from './axios'
import './App.css';
import Table from './Table/Table';
import InputContainer from './Input/InputContainer';
import FormContainer from './Form/FormContainer';


class App extends Component {

  state = {
    data: [],
    firstName: '',
    lastName: '',
    money: 0,
    accountNumber: 0,
    firstId: '',
    secondId: '',
    id: '',
    transferMoney: 0,
    firstPersonMoney: 0,
    secondPersonMoney: 0,
    error: false
  }
  componentDidMount() {
    this.handleGet()
  }


  checkError = () =>{
    this.setState({
      error: true
    })
  }

  handleGet = () => {
    axios.get('/person.json')
      .then(response => {
        let data = []
        for (let i in response.data) {
          response.data[i].id = i
          data.push(response.data[i])
          this.setState({ data })
        }
      })
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
      money: parseInt(event.target.value)
    })
  }

  render() {
    return (
      <div className="App">
        <div className={'container'}>
          <InputContainer
            state={this.state}
            checkError={this.checkError}
            firstNameChangeHandler={this.firstNameChangeHandler}
            lastNameChangeHandler={this.lastNameChangeHandler}
            moneyChangeHandler={this.moneyChangeHandler}
            handleGet={this.handleGet} />
          <FormContainer
            state={this.state}
            handleGet={this.handleGet}
            transferMoneyChangeHandler={this.transferMoneyChangeHandler} />
          <Table
            data={this.state.data}
            handleGet={this.handleGet}/>
        </div>
      </div>
    );
  }
}

export default App;

