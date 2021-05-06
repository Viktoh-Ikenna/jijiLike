import React from 'react';
import { useState, useEffect,useRef } from 'react'
import {Link,useParams} from 'react-router-dom'
import './productPage.css';
import Product from '../products/Products';
import ads from '../server/server';
import { db } from '../firebaseDb/fireBase';

export const ProductPage = (props) => {
    const params=useParams();
    const refer=useRef();
    
   
   /* const [adsState, setAds] = useState(null);
    const [pagination, setPage] = useState({});
    useEffect(() => {
        let response = (JSON.parse(ads))
        setPage((prev )=>{
            return {...prev,count: response}});

    }, []);
    useEffect(() => {
        let response = (JSON.parse(ads));
        let sliced = response.splice(pagination.click, 5);
        setAds(sliced)
    }, [pagination.click]);
    const loading = (<div className='loading'><div></div></div>);
    const Pagination = () => {
        const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        let spily = pages.splice(0, Math.ceil(pagination.count.length / 5));
        return spily.map((e, i) => {
       return (<li key={i} onClick={() => setPage((prev )=>{return {...prev,click:e-1===0?0: (e-1)*5}})}> {e}  </li>)})
    }*/

    const [adsState, setAds] = useState(null);
    const [pagination, setPage] = useState({});
    useEffect(() => {
        db.collection('posts').get()
        .then((res)=>res.docs)
        .then((res)=>{
        let filtered = res.filter(e => (e.data().category === params.categories))
        setPage((prev )=>{
            return {...prev,count: filtered}});})
        
       

    }, []);
    useEffect(() => {
        db.collection('posts').get()
        .then((res)=>res.docs)
        .then((res)=>{
        let filtered = res.filter(e => (e.data().category === params.categories))
        let sliced = filtered.splice( +params.page/5000, 5);
        setAds(sliced)})
    }, [+params.page]);
    const loading = (<div className='loading'><div></div><div></div></div>);
    const Pagination = () => {
        const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        let spily = pages.splice(0, Math.ceil(pagination.count.length / 5));
        return spily.map((e, i) => {
            let z=((+params.page/5))/5000;
            let color=null;
            if(z+1===e)  color='purple';
       return (<li onClick={()=>refer.current.scrollIntoView({behavior: 'smooth'})} key={i} style={{backgroundColor:color}}><Link to ={`/${params.categories}/page/${e-1===0?0:((e-1)*5)*5000}`} > {e}</Link>  </li>)})
    }
    // mobile filter button
let n = 0;
    const mobileFilter =()=>{
        n++;
        if(n%2===0){
            refer.current.style.display='none';
        }else{
            refer.current.style.display='block';
        }
    }


    return (
        <div>
            <div className='mobileToggleFilter'><span onClick={mobileFilter}><img src='https://cdn.iconscout.com/icon/free/png-256/filter-1634626-1389150.png' /></span>filter</div>
            <div className='filter' ref={refer}>
                <div className='brandLabel'>Brand</div>
                <select name='Brand' >
                    <option>Brand</option>
                    <option>Brand</option>
                    <option>Brand</option>
                </select>
                <div className='conditionLabel'>Condition</div>
                <select name='condition'>
                    <option>condition</option>
                    <option>condition</option>
                    <option>condition</option>
                    <option>condition</option>
                    <option>condition</option>
                    <option>condition</option>
                </select>
                <div className='locationLabel'>Location</div>
                <select name='location' >
                    <option>location</option>
                    <option>location</option>
                    <option>location</option>
                    <option>location</option>
                    <option>location</option>
                    <option>location</option>
                </select>
                <div className='inside_locationLabel'>LGA</div>
                <select name='inside-location' >
                    <option>inside</option>
                    <option>inside</option>
                    <option>inside</option>

                </select>
            </div>
            <div className="listsOfProduct">
                {adsState === null ? loading : adsState.map((e, index) => {
                    return <Link style={{width:'80%'}} to={`/${params.categories}/item/${e.data().id}/user-${e.data().userId}/brand-${e.data().brand}/`}> <Product products={e.data()} back='97%' /></Link>
                })
                }
            </div>
            <ul className="pagination">
                {adsState === null ? 'loading...' : Pagination()}
            </ul>
        </div>
    )
}
