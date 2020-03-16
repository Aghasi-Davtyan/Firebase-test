import React from 'react';
import './Form.css';

const Form = (props) => {

    let {
        data,
        callFirst,
        callSecond,
        transferMoneyChangeHandler,
        calcTransfer } = props

    return (
        <form className={'form'} onSubmit={calcTransfer}>
            <div>Transfer</div>
            <div>
            <select onChange={callFirst} required>
                <option />
                {data.map((person) => {
                    return <option key={person.id} value={person.id} label={person.firstName} />
                })}
            </select>
            <span>To</span>
            <select onChange={callSecond} required>
                <option />
                {data.map((person) => {
                    return <option key={person.id} value={person.id} label={person.firstName} />
                })}
            </select>
            </div>
            <div>Amount of money</div>
            <div>
                <input type='number' onChange={transferMoneyChangeHandler} />
            </div>
            <p>10% for each transfer</p>
            <button className={'button1'} type='submit' ><span>Send</span></button>
        </form>
    );
}

export default Form;