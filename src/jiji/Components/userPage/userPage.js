import React,{useState,useEffect} from 'react';
import {User} from '../user/User';
import {useParams,Link} from 'react-router-dom';
import './userPage.css';
import Product from '../products/Products';
import ads from '../server/server';
import { db } from '../firebaseDb/fireBase';

export const UserPage = () => {
    let params = useParams();
    const [adsState,setAds]= useState(null);

    useEffect(
        () => {
            db.collection('posts').get()
                .then((res) => res.docs)
                .then((res) => {
                    let filtered = res.filter(e => (e.data().userId === localStorage.getItem('user')))
                    setAds(filtered)
                })}, [+params.page]);
    const loading = (<div className='loading'><div></div><div></div></div>);
    return (
        <div className='UserPage'>
            <User User={params.userId} />
            <div className='features'>
            <h2>My Products</h2>
            <hr />
            <div className="listsOfProduct" >
                {adsState === null ? loading : adsState.map((e, index) => {
                    return <Link style={{width:'80%'}} to={`/${e.data().category}/item/${e.data().id}/user-${e.data().userId}/brand-${e.data().brand}/`}> <Product products={e.data()} back='100%' /></Link>
                })
                }
            </div>
            </div>
        </div>
    )
}
