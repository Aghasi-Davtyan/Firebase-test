import React, { Component } from 'react';
import axios from './axios'
import './App.css';
import Table from './component/Table/Table';
import InputContainer from './component/Input/InputContainer';
import FormContainer from './component/Form/FormContainer';
import Modal from './component/Modal/Modal';


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
    error: false,
    modalVisible: false
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

  showModal = (check) => this.setState(()=>({modalVisible: check}))
  hideModal = () => this.setState(()=>({modalVisible: false}))


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
          showModal={this.showModal}
            state={this.state}
            handleGet={this.handleGet}/>
          <Table
            data={this.state.data}
            handleGet={this.handleGet}/>

           {this.state.modalVisible &&
            <Modal hideModal={this.hideModal}>
              <code>Your transfer has been successfully completed</code>
            </Modal>
            }
        </div>
      </div>
    );
  }
}

export default App;

