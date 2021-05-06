import React, { useState, useRef, useEffect } from 'react';
import './login.css';
import { db } from '../firebaseDb/fireBase';


export const Login = ({ onClick,log,user }) => {
    const [data, setData] = useState([]);
    const submit = useRef();
    const Email = useRef();
    const pwd = useRef();
    const HandleInput = ({ target }) => {
        if (target.value !== '' && target.value.length > 3 && target.type === 'email') {
            target.style.border = "2px solid green";
        } else if (target.value !== '' && target.value.length > 3 && target.type === 'password') {
            target.style.border = "2px solid green";
            if (Email.current.value.length > 2 && target.value.length > 3) {
                submit.current.disabled = false;
                submit.current.style.cursor = 'pointer';
                submit.current.style.opacity = '1';
            }
        } else {

            target.style.border = "1px solid red";

        }
    }
    useEffect(() => {
        db.collection('user').get()
            .then(emails => emails.docs)
            .then(res => res.map(e => {
                setData((prev) => {
                  
                    return [...prev, {Email:e.data().email,pwd:e.data().pwd}];
                }
                )
            }
            ));
    }, [])

    //handlles submit button
    const handleSubmit = (e) => {
        e.preventDefault();
        for(let e of data){
            console.log(e);
            if(e.Email===Email.current.value&&e.pwd===pwd.current.value){
                console.log('logged');
                log();
                user(true);
                localStorage.setItem('user',e.Email);
            }else if(e.Email!==Email.current.value&&e.pwd!==pwd.current.value){
                console.log('error')
            }
        }
        Email.current.value='';
        pwd.current.value='';
    }




    return (
        <div className='login'>

            <div className="form">
                <i onClick={onClick}>dont have an account yet ?</i>
                <h3>login</h3>
                <form onSubmit={handleSubmit}>
                    <span>EMAIL:</span><input ref={Email} onChange={HandleInput} type="email" /><br />
                    <span>PASSWORD:</span><input ref={pwd} onChange={HandleInput} type="password" /><br />
                    <input type="submit" ref={submit} disabled value="Submit" />
                </form>
                <div className='Oauth'>
                    <div className='FBOauth'><img src="http://blog.logomyway.com/wp-content/uploads/2018/06/facebook-logo.jpg" /></div>
                    <div className='GGOauth'><img src="https://thumbs.dreamstime.com/b/gmail-logo-google-llc-apps-official-new-logotypes-vector-icon-email-service-developed-redesigned-version-eps-file-201198491.jpg" /></div>
                </div>
            </div>
        </div>
    )
}
