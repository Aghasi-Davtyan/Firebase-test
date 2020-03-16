import React from 'react';
import './Table.css'

const Table = (props) => {

    let { data ,handleDelete} = props

    return (
        <table className={'table'}>
            <thead>
                <tr>
                    <th>№</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Money</th>
                    <th>Account Number</th>
                    <th>ID</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((person, i) => {
                    return <tr key={person.accountNumber}>
                        <td>{i + 1 + '.'}</td>
                        <td>{person.firstName} </td>
                        <td>{person.lastName} </td>
                        <td>{person.money + '$'} </td>
                        <td>{person.accountNumber} </td>
                        <td>{person.id}</td>
                        <td><button onClick={()=>handleDelete(person.id)}>delete</button> </td>
                    </tr>
                })}
            </tbody>
        </table>);
}

export default Table;