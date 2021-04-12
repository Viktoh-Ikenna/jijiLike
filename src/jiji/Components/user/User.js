import React,{useEffect,useState} from 'react';
import './user.css';
import {UserServer} from './userServer';
import {Link } from 'react-router-dom';


export const User = (props) => {
    const [user ,setUser] =useState(null);
    useEffect(()=>{
        const response =UserServer.filter(e=>e.userId===props.User);
        setUser(response)
    },[props.User]);
    console.log(user);
    return (
        <>
        {user!==null?<>{user[0] !== undefined?<div className='UserProfile'>
            <div className='potrait'>
                <div className='img'><Link to ={`/user/${user[0].userId}`}><img src={user[0].img!==undefined?user[0].img:''}/></Link></div>
            </div>
            <h3>{user[0].name}</h3>
            <div className='Userlocation'>{user[0].location}</div>
            <div className='UserContact' onClick={(e)=>{e.target.style.backgroundColor='white'; e.target.innerHTML=user[0].contact}}>Show Contact</div>
            <div className='ChatBox'>Message Me</div>
        </div>:'undefind'}</>:'loading'}
        </>
    )
}
