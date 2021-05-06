import React, { useState, useEffect } from 'react'
import Product from '../products/Products';
import ads from '../server/server';
import {Link } from  'react-router-dom';
import { db } from '../firebaseDb/fireBase';



export const Home = () => {
    const [adsState, setAds] = useState(null);
   useEffect(() => {
       db.collection('posts').get()
       .then(res=>res.docs)
       .then(res=> setAds(res));
       
    }, []);
    const loading=(<div className='loading'><div></div><div></div></div>);
    return (
        <div>
            <div className='homePageads'>
                {adsState===null?loading:adsState.map((e, index) => {
                   return <Link className='widdy' to={`/${e.data().category}/item/${e.data().id}/user-${e.data().userId}/brand-${e.data().brand}/`}> <Product products={e.data()} back='96%' /></Link>
                })
                }

            </div>
        </div>
    )
}
