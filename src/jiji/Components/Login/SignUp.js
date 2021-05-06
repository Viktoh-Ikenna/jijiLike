import React, { useState, useRef } from 'react';
import './signUp.css';
import { db } from '../firebaseDb/fireBase';

export const SignUp = (props) => {
    // handles for submit button
    const [inputs, setInputs] = useState({userId:Email.current.value});
    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('user').doc(`${Email.current.value}`).set(inputs)
        .then(()=>alert('successfull'));
        Email.current.value='';
        name1.current.value='';
        name2.current.value='';
        password.current.value='';
    }

    const submit = useRef();
    const Email = useRef();
    const name1 = useRef();
    const name2 = useRef();
    const password = useRef();
    // for the animation

    const na1 = useRef();
    const na2 = useRef();
    const em1 = useRef();
    const pwd = useRef();

    const HandleInput = ({ target }) => {
        if (target.value !== '' && target.value.length > 3 && (target.type === 'email' || target.type === 'text')) {
            setInputs((prev) => {
                return { ...prev, [target.name]: target.value }
            });
            target.style.border = "2px solid green";
            if (target === name1.current) na1.current.classList.add('suc');
            if (target === name2.current) na2.current.classList.add('suc');
            if (target === Email.current) em1.current.classList.add('suc');


        } else if (target.value !== '' && target.value.length > 3 && target.type === 'password') {
            target.style.border = "2px solid green";
            setInputs((prev) => {
                return { ...prev, [target.name]: target.value }
            });
            if (Email.current.value.length > 2 && target.value.length > 3 && name1.current.value.length && name2.current.value.length) {
                submit.current.disabled = false;
                submit.current.style.cursor = 'pointer';
                submit.current.style.opacity = '1';
            }
        } else {
            if (target === name1.current) {
                na1.current.classList.remove('suc');
                na1.current.classList.add('not');
            }
            if (target === name2.current) {
                na2.current.classList.remove('suc');
                na2.current.classList.add('not');
            }
            if (target === Email.current) {
                em1.current.classList.remove('suc');
                em1.current.classList.add('not');
            }
            if (target.type === 'password') {
                submit.current.disabled = true;
                submit.current.style.cursor = 'not-allowed';
                submit.current.style.opacity = '0.5';
            }
            target.style.border = "1px solid red";

        }
    }


    return (
        <div className='SignUp'>
            <div className="SignUpform">
                <h3>Create Account</h3>
                <form onSubmit={handleSubmit} >
                    <span>NAME:</span>
                    <div className="over">
                        <input ref={name1} onChange={HandleInput} type="text" name='firstName' required />
                        <span ref={na1} id="fn"></span>
                    </div>
                    <br />
                    <span>SECOND NAME:</span>
                    <div className="over">
                        <input ref={name2} onChange={HandleInput} type="text" name='secondName' required />
                        <span ref={na2} id="sn"></span>
                    </div>

                    <br />
                    <span>EMAIL:</span>
                    <div className="over">
                        <input ref={Email} onChange={HandleInput} type="email" name='email' required />
                        <span ref={em1} id="em"></span>
                    </div>

                    <br />
                    <span>PASSWORD:</span>
                    <div className="over">
                        <input ref={password} type="password" onChange={HandleInput} name='pwd' required />
                        <span ref={pwd} id="pwd"></span>
                    </div>
                    <br />

                    <input type="submit" ref={submit} name="submit" disabled value="Submit" />
                </form>

            </div>

        </div>
    )
}