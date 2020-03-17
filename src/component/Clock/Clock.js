import React, { Component } from 'react';
import './Clock.css'

class Clock extends Component {
    state = { 
        date: new Date()
     }

     componentDidMount(){
        this.timer = setInterval(()=>{
            this.tick()
        },1000)
     }

     componentWillUnmount(){
         clearInterval(this.timer)
     }


     tick = () => {
         this.setState({
             date: new Date()
         })
     }

    render() { 
        return ( 
            <code className={'clock'}>{this.state.date.toLocaleTimeString()}</code>
         );
    }
}
 
export default Clock;