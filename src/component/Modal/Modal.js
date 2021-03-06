import React from 'react';
import './Modal.css'

let Modal = (props) => {

   const { children } = props

   return (
      <div className='modal'  onClick={props.hideModal}>
         <div className='inner'>
            <div className='close' onClick={props.hideModal}>+</div>
            {children}
         </div>
      </div>
   );
}

export default Modal;