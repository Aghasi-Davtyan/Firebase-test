import React from 'react';
import './Input.css';

const Input = (props) => {

    let {
        firstName,
        lastName,
        firstNameChangeHandler,
        lastNameChangeHandler,
        money,
        moneyChangeHandler,
        handlePost } = props

    return (
        <div>
            <form required={true} onSubmit={handlePost}>
                <input type='text' placeholder='First Name' value={firstName} onChange={firstNameChangeHandler} required={true} />
                <input type='text' placeholder='Last Name' value={lastName} onChange={lastNameChangeHandler} required={true} />
                <div>
                    <label>Money</label>
                    <input type='number' value={money} onChange={moneyChangeHandler} required={true} />
                </div>
                <button>Post</button>
            </form>
        </div>
    );
}

export default Input;