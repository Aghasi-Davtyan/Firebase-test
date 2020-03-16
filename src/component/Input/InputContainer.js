import React, { useState } from 'react';
import axios from '../../axios'
import './Input.css';
import Input from './Input';

const InputContainer = (props) => {

   let {
      state,
      firstNameChangeHandler,
      lastNameChangeHandler,
      moneyChangeHandler,
      handleGet } = props

   let [error, setError] = useState(false)

   let handlePost = async (e) => {
      e.preventDefault()
      let obj = {
         firstName: state.firstName,
         lastName: state.lastName,
         money: state.money,
         accountNumber: state.accountNumber + Math.floor(Math.random() * 10000000000000) + 1,
         id: state.id
      }
      if (state.firstName === '' || state.lastName === '' || state.money === 0) {
         await setError(true)
         return null
      }

      await axios.post('/person.json', obj)
         .then(response => console.log(response))
         .catch(error => console.log(error))
      handleGet()
      
      state.firstName = ''
      state.lastName = ''
      setError(false)
   }
   return (
      <div>
         {error && <code style={{ color: 'red' }}>Please write your details</code>}
         <Input
            handlePost={handlePost}
            firstName={state.firstName}
            lastName={state.lastName}
            firstNameChangeHandler={firstNameChangeHandler}
            lastNameChangeHandler={lastNameChangeHandler}
            moneyChangeHandler={moneyChangeHandler} />
      </div>
   );
}

export default InputContainer;