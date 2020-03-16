import React, { Component } from 'react';
import axios from '../axios'
import './Input.css';
import Input from './Input';

class InputContainer extends Component {
   state = {
      firstName: '',
      lastName: '',
      money: 0,
      accountNumber: 0,
      id: ''}

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
   handlePost = async (e) => {
      e.preventDefault()
      let obj = {
         firstName: this.state.firstName,
         lastName: this.state.lastName,
         money: this.state.money,
         accountNumber: this.state.accountNumber + Math.floor(Math.random() * 10000000000000) + 1,
         id: this.state.id
      }
      if (this.state.firstName === '' || this.state.lastName === '' || this.state.money === 0) {
         return null
      }
      await axios.post('/person.json', obj)
         .then(response => console.log(response))
         .catch(error => console.log(error))
         this.props.handleGet()
   }
   render() {
      return (
         <Input handlePost={this.handlePost}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            firstNameChangeHandler={this.firstNameChangeHandler}
            lastNameChangeHandler={this.lastNameChangeHandler}
            moneyChangeHandler={this.moneyChangeHandler} />
      );
   }
}

export default InputContainer;