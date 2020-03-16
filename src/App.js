import React, { Component } from 'react';
import axios from './axios'
import './App.css';
import Table from './Table/Table';
import Form from './Form/Form';
import Input from './Input/Input';


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

  handlePost = async (e) => {
    e.preventDefault()
    let obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      money: this.state.money,
      accountNumber: this.state.accountNumber + Math.floor(Math.random() * 10000000000000) + 1,
      id: this.state.id
    }
    if(this.state.firstName === '' || this.state.lastName === '' || this.state.money === 0){
      // alert('Select you First Name')
      this.setState({error: true})
      return null
    }
    await axios.post('/person.json', obj)
      .then(response => console.log(response))
      .catch(error => console.log(error))
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

  handleDelete = async (personID) => {
   await axios.delete(`/person/${personID}.json`)
    this.handleGet()
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

  transferMoneyChangeHandler = (event) => {
    this.setState({
      transferMoney: parseInt(event.target.value)
    })
  }

  callFirst = async (e) => {
    await this.setState({
      firstId: e.target.value
    })
    let firstUser = this.state.data.find(el => el.id === this.state.firstId)
    this.setState({
      firstPersonMoney: parseInt(firstUser.money)
    })

  }

  callSecond = async (e) => {
    await this.setState({
      secondId: e.target.value
    })
    let secondUser = this.state.data.find(el => el.id === this.state.secondId)
    this.setState({
      secondPersonMoney: parseInt(secondUser.money)
    })
  }

  calcTransfer = async (e) => {
    e.preventDefault()
    if(this.state.firstPersonMoney - this.state.transferMoney < 0){
      // alert(`You don't have enough money`)
      this.setState({error: true})
      return null
    }
    if(this.state.firstId === '' && this.state.secondId === '' ){
      // alert('Select person')
      this.setState({error: true})
      return null
    }
    if(this.state.transferMoney === 0){
      // alert('Choose Money')
      this.setState({error: true})
      return null
    }
    if(this.state.firstId === this.state.secondId ){
      this.setState({error: true})
      return null
    }
   await this.setState({
      firstPersonMoney: (this.state.firstPersonMoney - this.state.transferMoney) - (this.state.transferMoney * 0.1),
      secondPersonMoney: this.state.transferMoney + this.state.secondPersonMoney
    })
    let obj
    await axios.get(`/person/${this.state.firstId}.json`)
      .then(response => {
        obj = {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          money: this.state.firstPersonMoney,
          accountNumber: response.data.accountNumber,
          id: this.state.firstId
        }
      })
    await axios.put(`/person/${this.state.firstId}.json`, obj)
      .then(response => console.log(response))
      .catch(error => console.log(error))

    let obj2
    await axios.get(`/person/${this.state.secondId}.json`)
      .then(response => {
        obj2 = {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          money: this.state.secondPersonMoney,
          accountNumber: response.data.accountNumber,
          id: this.state.secondId
        }
      })
    await axios.put(`/person/${this.state.secondId}.json`, obj2)
      .then(response => console.log(response))
      .catch(error => console.log(error))
      alert('Your transfer has been successfully completed')
      this.handleGet()
  }

  render() {
    return (
      <div className="App">
        <div className={'container'}>
          <Input firstName={this.state.firstName}
                  lastName={this.state.lastName} 
                  firstNameChangeHandler={this.firstNameChangeHandler}
                  lastNameChangeHandler={this.lastNameChangeHandler}
                  moneyChangeHandler={this.moneyChangeHandler}
                  // money={this.state.money}
                  handlePost={this.handlePost}
            />
          <Form data={this.state.data}
            callFirst={this.callFirst}
            callSecond={this.callSecond}
            transferMoneyChangeHandler={this.transferMoneyChangeHandler}
            calcTransfer={this.calcTransfer}/>
          <Table data={this.state.data}
          handleDelete={this.handleDelete} />
        </div>
      </div>
    );
  }
}

export default App;

