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

  render() {
    return (
      <div className="App">
        <div className={'container'}>
          <InputContainer
            handleGet={this.handleGet} />
          <FormContainer
            handleGet={this.handleGet} />
          <Table
            data={this.state.data}
            handleGet={this.handleGet}/>
        </div>
      </div>
    );
  }
}

export default App;

