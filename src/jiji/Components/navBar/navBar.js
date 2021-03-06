import React, { useState, useRef,useEffect } from 'react';
import './navBar.css';
import { Link, useLocation } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { Login } from '../Login/login';
import { SignUp } from '../Login/SignUp';
import { CategoryMenu } from '../Categories/CategoryMenu';
import { db } from '../firebaseDb/fireBase';

const NavBar = ({ history }) => {
// user update


    let ssearch = useRef();
    const loca = useLocation();
    
    const [LLogin,setLogin]=useState(true)
    console.log(loca);
    const [toggle, settoggle] = useState(false);
    const [condition, setCondition] = useState({ Login: false, SignUp: false, toggler: false });
    const log = () => {
        setCondition((prev) => {
            return { ...prev, Login: !prev.Login, SignUp: false, toggler: false }
        });
    }
    const Sign = () => {
        setCondition((prev) => {
            return { ...prev, Login: false, SignUp: !prev.SignUp, toggler: false }
        })
    }

    //toggleable menu 
    const toggler = () => {
        setCondition((prev) => {
            return { ...prev, Login: false, SignUp: false, toggler: !prev.toggler }
        });
    }


//image updater
const [imgState,setImage]=useState(null);
const [dbImg ,setdbImg]=useState(null)

useEffect(()=>{
    db.collection('user').doc(`${localStorage.getItem('user')}`).get()
    .then(res=>res.data())
    .then(res=>setImage(`${res.images}`))
},[dbImg])


const handleImg=(e)=>{
    let reader = new FileReader();
    reader.onload=()=>{
        if(reader.readyState===2){
            setdbImg(reader.result);
        }
    }
    reader.readAsDataURL(e.target.files[0]);

}
dbImg!==null&&db.collection('user').doc(localStorage.getItem('user')).set({images:dbImg},{merge:true});
    return (
        <div >
            <div className="nav">
                {loca.pathname !== '/' && <div onClick={toggler} className={`toggle ${condition.toggler ? 'clicked' : ''}`}>
                    <div className="menu">
                        <div className="roll">

                        </div>
                    </div></div>}
                {loca.pathname === '/' ? <div className='griddy logo'><Link to='/' style={{ color: 'white', textDecoration: 'none' }}><p>MYLOGO</p></Link></div> : <div className='logo'><Link to='/' style={{ color: 'white', textDecoration: 'none' }}><p>MYLOGO</p></Link></div>}
                <div id='rewind'><p id="moving">MYLOGO</p></div>
                {loca.pathname !== '/'?<div id='searchIcon' className='MobileSHift' onClick={() => settoggle(!toggle)}><p id="iconS">????</p></div>:<div id='searchIcon'  onClick={() => settoggle(!toggle)}><p id="iconS">????</p></div>}
                {LLogin !== true && <ul>
                    <li onClick={log}>LOGIN</li>
                    <li onClick={Sign} >SIGN UP</li>
                </ul>}
                {LLogin === true && <><div className='Dashboard'>
                    Dashboard
                </div>
                <div className='floating'>
                <ul id='diff'>
                <li><img src={imgState} /><label for="file">+<input id='file' type='file' accept='images/*' onChange={handleImg} /></label></li>
                    <li><a href='/dashboard/ads'><img src='https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png' /></a></li>
                    <li><a href='/dashboard/stats'><img src='https://cdn3.iconfinder.com/data/icons/e-commerce-8/91/stats-512.png' /></a></li>
                    <li><a href='/dashboard/promote'><img src='https://image.flaticon.com/icons/png/512/102/102017.png' /></a></li>
                    <li><a href='/dashboard/settings'><img src='https://cdn.iconscout.com/icon/premium/png-512-thumb/settings-587-766948.png' /></a></li>

                </ul>
                </div>
                </>}
                <div onClick={log} id='add'><p>+</p></div>
            </div>
            {toggle ? <div className='searchContainer show'>
                <form id="searchForm" onSubmit={(e) => { e.preventDefault(); history.push(`/search/query${ssearch.current.value.toLowerCase()}/page/0`); window.location.reload(true) }}>
                    <input ref={ssearch} type='text' placeholder=" Search the Upgrade" />
                    <input type='submit' value="????" />

                </form>
            </div> : <div className='searchContainer'>
                    <form id="searchForm">
                        <input type='text' placeholder=" Search the Upgrade" />
                        <input type='submit' value="????" />

                    </form>
                </div>}
            {condition.Login && <Login onClick={Sign} user={setLogin} log={log}/>}
            {condition.SignUp && <SignUp user={setLogin} />}
            {condition.toggler && <CategoryMenu />}
        </div>
    )
}
export default withRouter(NavBar);
