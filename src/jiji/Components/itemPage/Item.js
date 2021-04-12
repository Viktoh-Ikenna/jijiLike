import React, { useState, useEffect,useRef } from 'react';
import './item.css';
import Product from '../products/Products';
import ads from '../server/server';
import { useParams,Link } from 'react-router-dom';
import { User} from '../user/User';
import { isReferenced } from '@babel/types';


export const Item = () => {
    const params = useParams();
    const refer=useRef();
    console.log(params)

    // this handles the item itself
    const [Item, setItem] = useState(null);
    useEffect(() => {
        let response = (JSON.parse(ads));
        let filtered = response.filter(e => (e.id === (+params.id)));
        const [target] = filtered;
        setItem(target);

    }, [+params.id]);



    //this handles for similar posts in a page
    const [SimilarItems, setItems] = useState(null);
    useEffect(() => {
        let response = (JSON.parse(ads));
        let filtered = response.filter(e => (e.brand === params.brand))
        setItems(filtered);

    }, []);

    // this sets handles for slides}

    const [slides, setSlides] = useState(null);
    const sliderFunc = () => {
        setSlides(prev => {
            if (prev === Item.imgs.length - 1) {
                return 0;
            } else {
                return prev + 1
            }
        });
    }
    const BacksliderFunc = () => {
        setSlides(prev => {
            if (prev > 0) {
                return prev - 1;
            } else {
                return 0
            }
        });
    }


    // the functions for slides ends here

    const loading = (<div className='loading'><div></div><div></div></div>);
    return (
        <div className="itemGrid" >
            {Item !== null ? <> <div className="item" ref={refer}>
                {/* getting the jsx of thr slide img in the item page */}

                <div>
                    <div class="slides">
                        <div class="button left" onClick={BacksliderFunc}><div></div></div>
                        <div class="conta">

                            <div id="imgContainer" style={{ left: `-${slides}00%` }}>
                                {Item.imgs.map(e => (<img src={e} />))}
                            </div>

                        </div>
                        <div class="button right" onClick={sliderFunc} ><div></div></div>

                    </div>
                    <div className='itemSpec'>
                        <h1>{Item.name.toUpperCase()}</h1>
                        <div>
                            <div>Posted:{Item.datePublished}</div>
                            <div>Location:{Item.location}</div>
                            <div className='escrow'>Entrust Us</div>
                        </div>
                    </div>
                    <div id="itemDetails">
                        <h2>Specification</h2>
                        <ul>{Item.majorSpec.map(e=><li>{e}</li>)}</ul>
                        <h2>Swap With</h2>
                        <ul>not avaliable yet</ul>
                    </div>
                </div>

                { /* end of the slides */}
            </div>
                <div className="userSide">
                    <div className="itemPrize">{Item.prize}</div>
                    <User User={+params.userId} />
                </div>
                <div className="SimilarPost">
                    {SimilarItems === null ? loading : SimilarItems.map((e, index) => {
                        return <Link onClick={()=>refer.current.scrollIntoView({behavior: 'smooth'})} to={`/${params.categories}/item/${e.id}/user-${e.userId}/brand-${e.brand}/`}> <Product products={e} back='100%' /></Link>
                    })
                    }
                </div>
            </> : loading}
        </div>

    )
}
