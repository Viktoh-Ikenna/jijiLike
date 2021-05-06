import React,{useEffect,useState} from 'react';
import './user.css';
import {UserServer} from './userServer';
import {Link } from 'react-router-dom';
import { db } from '../firebaseDb/fireBase';


export const User = (props) => {
    const [user ,setUser] =useState(null);
    useEffect(()=>{
        db.collection('user').get()
       .then((res)=>res.docs)
        .then((res)=>{
          const filtered=res.filter((e)=>e.data().email===props.User);
            let [target] = filtered;
            setUser(target.data())})
    },[props.User]);
  
    return (
        <>
        {user!==null?<>{user !== null?<div className='UserProfile'>
            <div className='potrait'>
                <div className='img'><Link to ={`/user/${user.email}`}><img src={user.images!==undefined?user.images :''}/></Link></div>
            </div>
            <h3>{user.name}</h3>
            <div className='Userlocation'>{user.location}</div>
            <div className='UserContact' onClick={(e)=>{e.target.style.backgroundColor='white'; e.target.innerHTML=user.contact}}>Show Contact</div>
            <div className='ChatBox'>Message Me</div>
        </div>:'undefind'}</>:'loading'}
        </>
    )
}
