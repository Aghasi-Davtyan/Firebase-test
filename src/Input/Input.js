import React from 'react';
import './Input.css';

const Input = (props) => {

    let {
        firstName,
        lastName,
        firstNameChangeHandler,
        lastNameChangeHandler,
        money,
        moneyChangeHandler } = props

    return (
        <div>
            <input type='text' placeholder='First Name' value={firstName} onChange={firstNameChangeHandler}  required/>
            <input type='text' placeholder='Last Name' value={lastName} onChange={lastNameChangeHandler} required/>
            <div>
                <label>Money</label>
                <input type='number' value={money} onChange={moneyChangeHandler} />
            </div>
        </div>
    );
}

export default Input;