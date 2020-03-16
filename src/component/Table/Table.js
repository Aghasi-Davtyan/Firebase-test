import React from 'react';
import './Table.css';
import axios from '../../axios'

const Table = (props) => {

   let { data, handleGet } = props

   let handleDelete = async (personID) => {
      await axios.delete(`/person/${personID}.json`)
      handleGet()
   }

   return (

      <table className={'table'} >
         <thead>
            <tr>
               <th>№</th>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Money</th>
               <th>Account Number</th>
               <th>ID</th>
               <th style={{borderTopRightRadius:'5px'}}></th>
            </tr>
         </thead>
         <tbody >
            {data.map((person, i) => {
               return <tr key={person.accountNumber}>
                  <td>{i + 1 + '.'}</td>
                  <td>{person.firstName} </td>
                  <td>{person.lastName} </td>
                  <td>{person.money + '$'} </td>
                  <td>{person.accountNumber} </td>
                  <td>{person.id}</td>
                  <td><button
                     className={'deleteBtn'}
                     onClick={() => handleDelete(person.id)}>Delete</button></td>
               </tr>
            })}
         </tbody>
      </table>
   );
}

export default Table;