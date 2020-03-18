import React from 'react';
import './Form.css';

const Form = (props) => {

    let {
        data,
        error,
        calcTransfer,
        callFirst,
        callSecond,
        transferMoneyChangeHandler, } = props

    return (
        <form className={'form'} onSubmit={calcTransfer}>
            <span>Transfer</span>
            <div>
                <select onChange={callFirst} required >
                    <option />
                    {data.map((person) => {
                        return <option
                            key={person.id}
                            value={person.id}
                            label={person.firstName} />
                    })}
                </select>
                <span>To</span>
                <select onChange={callSecond} required>
                    <option />
                    {data.map((person) => {
                        return <option
                            key={person.id}
                            value={person.id}
                            label={person.firstName} />
                    })}
                </select>
            </div>
            <div>
                <input
                style={{textAlign:'center'}}
                    type='number'
                    min="0"
                    onChange={transferMoneyChangeHandler}
                    placeholder="Amount of money"
                    required />
            </div>
            {(error) ? props.children : <p>10 <code>%</code> for each transfer</p>}
            <div><button className={'button1'} type='submit' ><span>Send</span></button></div>
        </form>
    );
}

export default Form;