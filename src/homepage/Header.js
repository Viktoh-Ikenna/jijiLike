import React, { useState, useEffect,useReducer } from 'react';
import { Slides } from './slides';
import './header.css';

const reducer=(state,action)=>{
return {...state,count:state.count+1}
}
export const Header = () => {
    const [click, setClick] = useState(true);
    const [count, dispatch] =useReducer(reducer,{count:1})
  


    return (

        <div>
            <div className="navBar">
                <div id='logo'>THE LEGENDARY</div>
                <ul className="deskTop">
                    <li>HOME</li>
                    <li>MORE</li>
                    <li>CONTACT</li>
                    <li>ABOUT US</li>
                </ul>
                <ul className="Mobile">
                    <li>HOME</li>
                    <li>MORE</li>
                    <li>CONTACT</li>
                    <li>ABOUT US</li>
                </ul>
            </div>
            <div className='headerBody'>
                <div className='slid'>
                    <Slides />
                </div>
                <div className='display'>
                <button onClick={()=>setClick(!click)}>{click===true?'on':'off'}</button>
                    <div className={`dii ${click?'':'ss'}`} >
                    <ul>
                    <li>just to test</li>
                    <li>just to test</li>
                    <li>just to test</li>
                    <li>just to test</li>
                    <li>just to test</li>
                    <li>just to test</li>
                    </ul>
                    </div>
                    <button onClick={()=>dispatch()}>cut soap</button>
                    <div>{count.count}</div>
                </div>
            </div>

        </div>
    )
}
