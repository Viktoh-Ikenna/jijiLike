import React from 'react';
import { useState, useEffect,useRef } from 'react'
import {Link,useParams} from 'react-router-dom'
import './search.css';
import Product from '../products/Products';
import ads from '../server/server';
import { db } from '../firebaseDb/fireBase';

export const Search = (props) => {
    const params=useParams();
    const refer=useRef();
console.log(params.id)
console.log('hey')

    const [adsState, setAds] = useState(null);
    const [pagination, setPage] = useState({});
    useEffect(() => {
        db.collection('posts').get()
        .then((res)=>res.docs)
        .then((res)=>{
            let filtered = res.filter(e => (e.data().name.toLowerCase().match(params.id)));
            setPage((prev )=>{
                return {...prev,count: filtered}});
            
        })
       

        

    }, []);
    useEffect(() => {
        db.collection('posts').get()
        .then((res)=>res.docs)
        .then((res)=>{
            let filtered = res.filter(e => (e.data().name.toLowerCase().match(params.id)));
            let sliced = filtered.splice( +params.page/5000, 5);
            setAds(sliced);
            
        })   
    }, [+params.page]);
    const loading = (<div className='loading'><div></div><div></div></div>);
    const Pagination = () => {
        const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        let spily = pages.splice(0, Math.ceil(pagination.count.length / 5));
        return spily.map((e, i) => {
            let z=((+params.page/5))/5000;
            let color=null;
            if(z+1===e)  color='purple';
       return (<li onClick={()=>refer.current.scrollIntoView({behavior: 'smooth'})} key={i} style={{backgroundColor:color}}><Link to ={`/search/query${params.id}/page/${e-1===0?0:((e-1)*5)*5000}`} > {e}</Link>  </li>)})
    }


    return (
        <div>
           
            <div className="listsOfProduct" ref={refer}>
                {adsState === null ? loading : adsState.map((e, index) => {
                    return <Link style={{width:'80%'}} to={`/${e.data().category}/item/${e.data().id}/user-${e.data().userId}/brand-${e.data().brand}/`}> <Product products={e.data()} back='97%' /></Link>
                })
                }
            </div>
            <ul className="pagination">
                {adsState === null ? 'loading...' : Pagination()}
            </ul>
        </div>
    )
}
