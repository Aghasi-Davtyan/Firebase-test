import React from 'react';

const Table = (props) => {

    let { data } = props

    

    return (
        <table className={'cent'}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Money</th>
                    <th>Account Number</th>
                    <th></th>
                    <th>ID</th>
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
                        <td> </td>
                        <td>{person.id}</td>
                    </tr>
                })}
            </tbody>
        </table>);
}

export default Table;