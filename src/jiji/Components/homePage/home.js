import React, { useState, useEffect } from 'react'
import Product from '../products/Products';
import ads from '../server/server';
import {Link } from  'react-router-dom';


export const Home = () => {
    const [adsState, setAds] = useState(null);
   useEffect(() => {
        setAds(JSON.parse(ads));
    }, []);
    const loading=(<div className='loading'><div></div><div></div></div>);
    return (
        <div>
            <div className='homePageads'>
                {adsState===null?loading:adsState.map((e, index) => {
                   return <Link className='widdy' to={`/${e.category}/item/${e.id}/user-${e.userId}/brand-${e.brand}/`}> <Product products={e} back='96%' /></Link>
                })
                }

            </div>
        </div>
    )
}
