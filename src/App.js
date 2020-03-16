import React, { Component } from 'react';
import axios from './axios'
import './App.css';
import Table from './component/Table/Table';
import InputContainer from './component/Input/InputContainer';
import FormContainer from './component/Form/FormContainer';


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
    if(!this.state.firstName.length === 0 ){
      this.checkError(false)
    }
  }
  lastNameChangeHandler = (event) => {
    this.setState({
      lastName: event.target.value
    })
    if(!this.state.lastName.length === 0){
      this.checkError(false)
    }
  }
  moneyChangeHandler = (event) => {
    this.setState({
      money: parseInt(event.target.value)
    })
    if(!this.state.money.length === 0){
      this.checkError(false)
    }
  }

  render() {
    return (
      <div className="App">
        <div className={'container'}>
          <InputContainer
            state={this.state}
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

