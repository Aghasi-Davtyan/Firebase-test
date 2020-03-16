import React from 'react';
import './Input.css';



const Input = (props) => {

    
    let {
        error,
        firstName,
        lastName,
        firstNameChangeHandler,
        lastNameChangeHandler,
        moneyChangeHandler,
        handlePost } = props
        
        

        return (
        <div>
            {error && <code style={{color: 'red'}}>Please write your details</code>}
            <form  onSubmit={handlePost}> 
                <input 
                type='text' 
                placeholder='First Name' 
                value={firstName} 
                onChange={firstNameChangeHandler}   />
                <input 
                type='text' 
                placeholder='Last Name' 
                value={lastName} 
                onChange={lastNameChangeHandler}  />
                <div>
                    <label>Money</label>
                    <input 
                    type='number'
                     onChange={moneyChangeHandler} />
                </div>
                <button className={'btnPost'}><span>Add</span></button>
            </form>
        </div>
    );
}

export default Input;