import React, { Component, useState } from 'react';
import axios from './axios'
import './App.css';


class App extends Component {

  state = {
    data: [],
    firstName: '',
    lastName: '',
    money: 0,
    accountNumber: 0,
    id: '',
    transferMoney: 0,
    firstPersonMoney: 0,
    secondPersonMoney: 0
  }

  componentDidMount() {
    this.handleGet()
  }

  // componentDidUpdate(){
  //   this.handleGet()
  // }

  handlePost = () => {
    let obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      money: this.state.money,
      accountNumber: this.state.accountNumber + Math.floor(Math.random() * 10000000000000) + 1,
      id: this.state.id
    }
    axios.post('/person.json', obj)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  handleGet = () => {
    axios.get('/person.json')
      .then(response => {
        let data = []
        for (let i in response.data) {
          response.data[i].id = i
          data.push(response.data[i])
          this.setState({ data })
        }
      })
  }

  firstNameChangeHandler = (event) => {
    this.setState({
      firstName: event.target.value
    })
  }
  lastNameChangeHandler = (event) => {
    this.setState({
      lastName: event.target.value
    })
  }
  moneyChangeHandler = (event) => {
    this.setState({
      money: parseInt(event.target.value)
    })
  }

  transferMoneyChangeHandler = (event) => {
    this.setState({
      transferMoney: parseInt(event.target.value)
    })
  }

   callFirst = (e) => {
     // setSaveFirst(parseInt(selectFirstValue.value))
     console.log('first',parseInt(e.target.value))
     this.setState({
      firstPersonMoney: parseInt(e.target.value)
     })

  }

  callSecond = (e) => {
    // setSaveSecond(parseInt(selectSecondValue.value))
    console.log('second',parseInt(e.target.value))
    this.setState({
      secondPersonMoney: parseInt(e.target.value)
    })
  }

  calcTransfer = (e) =>{
    e.preventDefault()
  this.setState({
    firstPersonMoney: this.state.firstPersonMoney - this.state.transferMoney,
    secondPersonMoney: this.state.transferMoney + this.state.secondPersonMoney
  }) 
    console.log(this.state.firstPersonMoney)
    console.log(this.state.secondPersonMoney)
  }

  render() {
    return (
      <div className="App">
        <div className={'container'}>
          <div>
            {/* <label>First Name:</label> */}
            <input type='text' placeholder='First Name' value={this.state.firstName} onChange={this.firstNameChangeHandler} />
            {/* <label>Last Name:</label> */}
            <input type='text' placeholder='Last Name' value={this.state.lastName} onChange={this.lastNameChangeHandler} />
            <div>
              <label>Money</label>
              <input type='number' placeholder='Bills' value={this.state.money} onChange={this.moneyChangeHandler} />
            </div>
          </div>
          <button onClick={this.handlePost}>Post</button>
          <button onClick={this.handleGet}>Get</button>
          <form className={'form'}>
            <div>Transfer</div>
            <select onChange={this.callFirst}>
            <option></option>
              {this.state.data.map((person) => {
                return <option key={person.id} value={person.money} >{person.firstName}</option>
              })}
            </select>
            <span>To</span>
            <select onChange={this.callSecond}>
              <option></option>
              {this.state.data.map((person) => {
                return <option key={person.id} value={person.money}>{person.firstName}</option>
              })}
            </select>
            <div>Аmount of money</div>
            <div>
              <input type='number' onChange={this.transferMoneyChangeHandler}/>
            </div>
            <button type='submit'  onClick={this.calcTransfer}>Update</button>
          </form>
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
              {this.state.data.map((person, i) => {
                return <tr key={person.accountNumber}>
                  <td >{i + 1 + '.'}</td>
                  <td>{person.firstName} </td>
                  <td>{person.lastName} </td>
                  <td>{person.money + '$'} </td>
                  <td>{person.accountNumber} </td>
                  <td> </td>
                  <td>{person.id}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }


}


// let App = () => {
//   let [selectFirstValue, setSelectFirstValue] = useState(0)
//   let [selectSecondValue, setSelectSecondValue] = useState(0)
//   let [saveFirst, setSaveFirst] = useState(0)
//   let [saveSecond, setSaveSecond] = useState(0)

  // let callFirst = (e) => {
  //   setSaveFirst(parseInt(selectFirstValue.value))

  // }
  // let callSecond = (e) => {
  //   setSaveSecond(parseInt(selectSecondValue.value))
  // }

//   let plus = () => {
//    console.log(saveFirst+saveSecond)
//   }

//   return (
//     <div>
//       <div><select  className="form-control" ref={(input) => setSelectFirstValue(input)} onClick={callFirst} id="ntype" required>
//         <option value="" >None</option>
//         <option value="1"  >1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//       </select>
//         <input type="button" value="click" onClick={callFirst} /></div>
//     <div><select  className="form-control" ref={(input) => setSelectSecondValue(input)} onClick={callSecond} id="ntype" required>
//         <option value="">None</option>
//         <option value="1"  >1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//       </select>
//         <input type="button" value="click" onClick={callSecond} /></div>

//       <button onClick={plus} >Plus</button>
//     </div>
//   )

// }

export default App;

