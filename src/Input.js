import React from 'react';

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
            <input type='text' placeholder='First Name' value={firstName} onChange={firstNameChangeHandler} />
            <input type='text' placeholder='Last Name' value={lastName} onChange={lastNameChangeHandler} />
            <div>
                <label>Money</label>
                <input type='number' value={money} onChange={moneyChangeHandler} />
            </div>
        </div>
    );
}

export default Input;