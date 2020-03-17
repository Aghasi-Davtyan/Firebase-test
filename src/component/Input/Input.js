import React from 'react';
import './Input.css';


const Input = (props) => {

    let {
        firstName,
        lastName,
        firstNameChangeHandler,
        lastNameChangeHandler,
        moneyChangeHandler,
        handlePost } = props

    return (
        <form onSubmit={handlePost}>
            <input
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={firstNameChangeHandler} />
            <input
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={lastNameChangeHandler} />
            <div>
                <input
                    type='number'
                    onChange={moneyChangeHandler}
                    placeholder='Money' />
            </div>
            <button className={'btnPost'}><span>Add</span></button>
        </form>
    );
}

export default Input;