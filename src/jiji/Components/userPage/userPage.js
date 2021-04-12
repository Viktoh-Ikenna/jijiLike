import React,{useState,useEffect} from 'react';
import {User} from '../user/User';
import {useParams,Link} from 'react-router-dom';
import './userPage.css';
import Product from '../products/Products';
import ads from '../server/server';

export const UserPage = () => {
    let params = useParams();
    const [adsState,setAds]= useState(null);

    useEffect(() => {
        let response = (JSON.parse(ads));
        let flll =response.filter(e=>e.userId === +params.userId);
       setAds(flll);
    }, [+params.page]);
    const loading = (<div className='loading'><div></div><div></div></div>);
    return (
        <div className='UserPage'>
            <User User={+params.userId} />
            <div className='features'>
            <h2>My Products</h2>
            <hr />
            <div className="listsOfProduct" >
                {adsState === null ? loading : adsState.map((e, index) => {
                    return <Link style={{width:'80%'}} to={`/${e.category}/item/${e.id}/user-${e.userId}/brand-${e.brand}/`}> <Product products={e} back='100%' /></Link>
                })
                }
            </div>
            </div>
        </div>
    )
}
