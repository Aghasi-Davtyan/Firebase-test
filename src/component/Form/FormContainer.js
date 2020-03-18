import React, { useState } from 'react';
import './Form.css';
import axios from '../../axios'
import Form from './Form';

const FormContainer = (props) => {

   let { state, handleGet, showModal } = props
   let [error, setError] = useState(false)

   let callFirst = async (e) => {
      state.firstId = e.target.value
      let firstUser = state.data.find(el => el.id === state.firstId)
      if (firstUser === undefined) { return null }
      state.firstPersonMoney = parseInt(firstUser.money)
   }
   let callSecond = async (e) => {
      state.secondId = e.target.value
      let secondUser = state.data.find(el => el.id === state.secondId)
      if (secondUser === undefined) { return null }
      state.secondPersonMoney = parseInt(secondUser.money)
   }
   let transferMoneyChangeHandler = (event) => {
      state.transferMoney = parseInt(event.target.value)
   }
   let calcTransfer = async (e) => {
      e.preventDefault()
      if (state.firstId === state.secondId) {
         setError(true)
         return null
      }
      if (state.firstPersonMoney - state.transferMoney - state.firstPersonMoney * 0.1  < 0) {
         alert(`You don't have enough money`)
         return null
      }
      if (state.firstId === '' && state.secondId === '') { return null }
      if (state.transferMoney === 0) { return null }
      if (state.firstId === state.secondId) {
         setError(true)
         return null
      }

      state.firstPersonMoney = (state.firstPersonMoney - state.transferMoney) - (state.transferMoney * 0.1)
      state.secondPersonMoney = state.transferMoney + state.secondPersonMoney
      let obj
      await axios.get(`/person/${state.firstId}.json`)
         .then(response => {
            obj = {
               firstName: response.data.firstName,
               lastName: response.data.lastName,
               money: Math.round(state.firstPersonMoney),
               accountNumber: response.data.accountNumber,
               id: state.firstId
            }
         })
      await axios.put(`/person/${state.firstId}.json`, obj)
         .then(response => console.log(response))
         .catch(error => console.log(error))

      let obj2
      await axios.get(`/person/${state.secondId}.json`)
         .then(response => {
            obj2 = {
               firstName: response.data.firstName,
               lastName: response.data.lastName,
               money: Math.round(state.secondPersonMoney),
               accountNumber: response.data.accountNumber,
               id: state.secondId
            }
         })
      await axios.put(`/person/${state.secondId}.json`, obj2)
         .then(response => console.log(response))
         .catch(error => console.log(error))
      handleGet()
      setError(false)
      showModal(true)
   }

   return <Form
      error={error}
      data={state.data}
      callFirst={callFirst}
      callSecond={callSecond}
      calcTransfer={calcTransfer}
      transferMoneyChangeHandler={transferMoneyChangeHandler} >
      <code style={{ color: 'red' }}>Account number is the same</code>
   </Form>
}

export default FormContainer;