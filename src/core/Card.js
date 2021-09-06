import {Link} from 'react-router-dom';
import React , {useEffect, useState} from 'react';
import {ShowImage} from './showImage';
import '../styles.css';

const Card = ({product}) => {

    const showProductQuantity = () => {
        
        return product.quantity > 0 ? <span className="badge-primary badge-pill">In-Stock</span> : <span className="badge-primary badge-pill">Out of stock</span>
    };

    return(
        <div className="mycard-container">
            <div className="mycard-image-container">
                <ShowImage item={product} url="product" myStyling="card-img"/>
            </div>
            <div className="mycard-title">
                <h3>{product.name}</h3>
            </div>
            <div className="mycard-body">
                <p><p>₹{product.price}</p></p>
                {showProductQuantity()}
            </div>
            <div className="row">
                 <Link className="ml-4 mb-2 " to={`/product/view/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 bt-2 mr-2">View</button>
                </Link>
                <Link className="mb-2">
                    <button className="btn btn-outline-warning mt-2 bt-2">Add to Cart</button>
                 </Link>
            </div>
        </div>
    );
};

export default Card;

// return(
//     <div className="col-sm mb-2">
//         <div className="card">
//             <div className="card-header">{product.name}</div>
//             <div className="card-body">
//                 <ShowImage item={product} url="product" myStyling="product-img"/>
//                 <p>{product.description && product.description.substring(0,20)}</p>
//                 <p>₹ {product.price}</p>
//                 {showProductQuantity()}
//                 <div>
//                 <Link to={`/product/view/${product._id}`}>
//                     <button className="btn btn-outline-primary mt-2 bt-2 mr-2">View</button>
//                 </Link>
//                 <button className="btn btn-outline-warning mt-2 bt-2">Add to Cart</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     );