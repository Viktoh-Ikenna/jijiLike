import React, { useRef } from 'react';
import './task.css';

export const Tasks = (props) => {
    const index = useRef();
    const clicky = ({target}) => {
        props.onClick(target.id);
    }


    return (

        <ul>
            {props.onSave.map((e, i) => (
                <li key={i}>
                    <h3>{e.title} </h3><button onClick={clicky} ref={index} className='xx' id={i}>x</button>
                    {e.description === '' ? null : <div>{e.description}</div>}
                </li>)
            )
            }
        </ul>

    );

}