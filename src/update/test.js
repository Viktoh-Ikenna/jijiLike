import React, { useState, useRef } from 'react';
import './text.css';



export const Text = (props) => {
    const inputer = useRef();
    const textArea = useRef();
    const [show ,setShow]=useState(false)

    const handleClick = () => {
        if (inputer.current.value !== '') {
            props.onclick(inputer.current.value, textArea.current.value);
            inputer.current.value = '';
            textArea.current.value = '';
        }
    }
    const handleChange = (e) => {
        if(e.target.value!==''){
            setShow(true);
        }else{
            setShow(false);
        }
            
    }
    return (
        <div className='inputs'>
            {show && <button className='but' onClick={handleClick} >AddNew</button>}
            <input placeholder='Enter a task' ref={inputer} onChange={handleChange} />
            <br />
            {show && <textarea ref={textArea} placeholder='Detail a task' />}
        </div>
    )

}