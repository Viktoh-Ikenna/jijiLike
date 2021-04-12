import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './iconMenu.css';
import { category } from '../categ/categSever'


const IconMenu = () => {

  const [categories, setAds] = useState(null);
  useEffect(() => {
    setAds(category);
  }, []);
  const loading = (<div className='loading'><div></div></div>);
  return (
    <div className='icons_constainer'>

      {categories === null ? loading : categories.map((e, index) => {
        return (
          <Link to={e.link}>
            <div className='cover'>
              <img src={e.icon} />
              <h3>{e.name}</h3>
            </div>
          </Link>
        )
      })
      }
    </div>
  )
}

export default IconMenu;