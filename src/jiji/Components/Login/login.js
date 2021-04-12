import React, { useState, useRef } from 'react';
import './login.css';


export const Login = (props) => {
    const submit = useRef();
    const Email = useRef();
    const HandleInput = ({ target }) => {
        if (target.value !== '' && target.value.length > 3 && target.type === 'email') {
            target.style.border = "2px solid green";
        } else if (target.value !== '' && target.value.length > 3 && target.type === 'password') {
            target.style.border = "2px solid green";
            if(Email.current.value.length>2 &&target.value.length > 3){
                submit.current.disabled=false;
                submit.current.style.cursor='pointer';
                submit.current.style.opacity='1';
            }
        } else {
          
            target.style.border = "1px solid red";
            
        }
    }

    return (
        <div className='login'>
            <div className="form">
                <h3>login</h3>
                <form action="">
                    <span>EMAIL:</span><input ref={Email} onChange={HandleInput} type="email" /><br />
                    <span>PASSWORD:</span><input onChange={HandleInput} type="password" /><br />
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
