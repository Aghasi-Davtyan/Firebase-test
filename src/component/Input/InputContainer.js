import React, { useState } from 'react';
import axios from '../../axios'
import './Input.css';
import Input from './Input';
import Loading from '../Loading/Loading';

const InputContainer = (props) => {

   let {
      state,
      firstNameChangeHandler,
      lastNameChangeHandler,
      moneyChangeHandler,
      handleGet } = props

   let [error, setError] = useState(false)
   let [loading, setLoading] = useState(false)

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
         setError(true)
         return null
      }
      setLoading(true)
      let id;
      await axios.post('/person.json', obj)
         .then(response => id = response.data.name)
         .catch(error => console.log(error))


      state.firstName = ''
      state.lastName = ''
      state.money = 0
      setError(false)

      let newUser;
      await axios.get(`/person/${id}.json`)
         .then(response => {
            newUser = {
               firstName: response.data.firstName,
               lastName: response.data.lastName,
               money: response.data.money,
               accountNumber: response.data.accountNumber,
               id
            }
         })

      await axios.put(`/person/${id}.json`, newUser)
         .then(response => console.log(response))
         .catch(error => console.log(error))
      handleGet()
      setLoading(false)
   }
   return (
      <div>
         {error && <code style={{ color: 'red' }}>Please write your details</code>}
         {loading ? <Loading /> : (
            <Input
               handlePost={handlePost}
               firstName={state.firstName}
               lastName={state.lastName}
               firstNameChangeHandler={firstNameChangeHandler}
               lastNameChangeHandler={lastNameChangeHandler}
               moneyChangeHandler={moneyChangeHandler} />
         )}
      </div>
   );
}

export default InputContainer;