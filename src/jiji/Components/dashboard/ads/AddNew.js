import React, { useRef, useState, useEffect } from 'react';
import './addNew.css';
import { db } from '../../firebaseDb/fireBase';
import { category } from '../../categ/categSever';


export const AddNew = () => {


    let name = useRef();
    let brand = useRef();
    let spec1 = useRef();
    let spec2 = useRef();
    let spec3 = useRef();
    let categories = useRef();
    let about = useRef();
    let prize = useRef();
    let location = useRef();
    const [dbPost, setDbPost] = useState({});
    const [dbImg, setDbImg] = useState([]);

    const handleImg = (e) => {
        let reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setDbImg((prev) => {
                    return [...prev, reader.result]
                });
            }
        }
        reader.readAsDataURL(e.target.files[0]);

    }
    const handleSubmit = () => {
        setDbPost((prev) => {
            return {
                ...prev, name: name.current.value, brand: brand.current.value,
                majorSpec: [spec1.current.value, spec2.current.value, spec3.current.value],
                category: categories.current.value, about: about.current.value,
                prize: prize.current.value, location: location.current.value, imgs: dbImg, id: performance.now(), userId: localStorage.getItem('user')
            }
        });
        
    }
    dbPost.name !== undefined && (db.collection('posts').add(dbPost)
    .then(() => {
        alert('success')
    }).catch((e)=>alert(e)))
    //this handles user posts
    const [posts, setPosts] = useState(true);
    const [myAds, setAds] = useState(null);
    useEffect(
        () => {
            db.collection('posts').get()
                .then((res) => res.docs)
                .then((res) => {
                    let filtered = res.filter(e => (e.data().userId === localStorage.getItem('user')))
                    setAds(filtered)
                })
        },[]
    )

    return (
        <div className='AddNewContainer'>
            <div className='AddNew'>
                {posts === false ? <div style={{ opacity: '0.5' }} onClick={() => setPosts(false)}>Add New</div> : <div onClick={() => { setPosts(false) }}>Add New</div>}
                {posts === true ? <div style={{ opacity: '0.5' }} onClick={() => setPosts(true) }>My Ads</div> : <div onClick={() => { setPosts(true) }}>My Ads</div>}
            </div>
            <div className='AddNewBox'>{posts !== true ? <>
                <div><span>Name</span><input ref={name} type='text' /></div>
                <div><span>Brand</span><input ref={brand} type='text' /></div>
                <div><span>spec 1</span><input ref={spec1} type='text' /></div>
                <div><span>spec 2</span><input ref={spec2} type='text' /></div>
                <div><span>spec 3</span><input ref={spec3} type='text' /></div>
                <div><span>category</span><select ref={categories} type='text' >
                    {category.map(e => (<option value={e.name} >{e.name}</option>))}
                </select></div>
                <div><span>images</span><input onChange={handleImg} type='file' accept='images/*' /><input onChange={handleImg} type='file' accept='images/*' /><input onChange={handleImg} type='file' accept='images/*' /><input onChange={handleImg} type='file' accept='images/*' /><input onChange={handleImg} type='file' accept='images/*' /><input onChange={handleImg} type='file' accept='images/*' /></div>
                <div><span>about</span><input ref={about} type='text' /></div>
                <div><span>location</span><input ref={location} type='text' /></div>
                <div><span>Prize</span><input ref={prize} type='number' /></div>
                <button onClick={handleSubmit}>submit</button></>
                : <ul>
                    {myAds !== null && myAds.map((e) => <li> {e.data().name}</li>)}
                </ul>}
            </div>
        </div>
    )
}
