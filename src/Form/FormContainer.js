import React, { Component } from 'react';
import './Form.css';
import axios from '../axios'
import Form from './Form';

class FormContainer extends Component {

   state = {
      data: [],
      firstId: '',
      secondId: '',
      id: '',
      firstPersonMoney: 0,
      secondPersonMoney: 0,
      transferMoney: 0,
   }

   componentDidMount(){
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

   callFirst = async (e) => {
     await this.setState({firstId:e.target.value})
      let firstUser = this.state.data.find(el => el.id === this.state.firstId)
      this.setState({firstPersonMoney:parseInt(firstUser.money)})
   }
   callSecond = async (e) => {
    await  this.setState({secondId:e.target.value})
      let secondUser = this.state.data.find(el => el.id === this.state.secondId)
      this.setState({ secondPersonMoney :parseInt(secondUser.money)})
   }
   transferMoneyChangeHandler = (event) => {
     this.setState({transferMoney: parseInt(event.target.value)})
   }
   calcTransfer = async (e) => {
      e.preventDefault()
      if (this.state.firstPersonMoney - this.state.transferMoney < 0) { return null }
      if (this.state.firstId === '' && this.state.secondId === '') { return null }
      if (this.state.transferMoney === 0) { return null }
      if (this.state.firstId === this.state.secondId) { return null }
      this.setState({
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
      this.props.handleGet()
   }
   render() {
      return <Form
         data={this.state.data}
         callFirst={this.callFirst}
         callSecond={this.callSecond}
         calcTransfer={this.calcTransfer}
         transferMoneyChangeHandler={this.transferMoneyChangeHandler}
      />
   }
}

export default FormContainer;