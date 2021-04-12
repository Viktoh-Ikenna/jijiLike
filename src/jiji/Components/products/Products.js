import React from 'react';
import './product.css';


const Product = (props) => {
    const { products } = props
    let background = null;
    props.back ? background = `${props.back}` : background = null;

    return (

        <div className="product" style={{ width: background }}>
            <div className="img">
                <img src={products.imgs[0]} />
            </div>
            <p className='Pname'>{products.name} </p>
            <p className='prize'>{products.prize}</p>
            <ul className='spec'>
                {products.majorSpec.map((l, i) => {
                   return <li key={i}>{l}</li>
                })
                }
            </ul>
            <div className='date'>{products.datePublished}</div>
            <div className='Location'>{products.location} </div>
            <div className="swapOption">
                <span>Swap with:</span>
                <ul>
                    <li>hey</li>
                    <li>hey</li>
                    <li>hey</li>
                </ul>

            </div>


        </div>
    );

}

export default Product;