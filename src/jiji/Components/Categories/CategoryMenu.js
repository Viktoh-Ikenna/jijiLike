import React from 'react';
import './categoryMenu.css';
import {Link } from 'react-router-dom';
import {category }from '../categ/categSever';

export const CategoryMenu = () => {
    return (
        <div className='ToggleAbleMenu'>
            <ul className='listOfTmenu'>
           { category.map(e=> <li onClick={()=>window.location.reload(true)}> <Link to={e.link} >{e.name}</Link></li>)}
               
            </ul>
        </div>
    )
}
