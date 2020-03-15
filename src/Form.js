import React from 'react';

const Form = (props) => {

    let { data, callFirst, callSecond, transferMoneyChangeHandler, calcTransfer } = props

    return (
        <form className={'form'}>
            <div>Transfer</div>
            <select onChange={callFirst}>
                <option></option>
                {data.map((person) => {
                    return <option key={person.id} value={person.id} label={person.firstName} />
                })}
            </select>
            <span>To</span>
            <select onChange={callSecond}>
                <option></option>
                {data.map((person) => {
                    return <option key={person.id} label={person.firstName} value={person.id} />
                })}
            </select>
            <div>Amount of money</div>
            <div>
                <input type='number' onChange={transferMoneyChangeHandler} />
            </div>
            <button type='submit' onClick={calcTransfer}>Send</button>
        </form>
    );
}

export default Form;