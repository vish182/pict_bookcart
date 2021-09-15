import {Link} from 'react-router-dom';
import React , {useEffect, useState} from 'react';
import {ShowImage} from './showImage';
import { createConvo } from '../chat/chatApi';
import { useHistory } from "react-router-dom";
import { deleteProduct } from '../admin/apiAdmin';
import {isAuthenticated} from '../auth';
import '../styles.css';

const Card = ({product}) => {

    let history = useHistory();

    let user = "";

    const contactSeller = () => {
        if(JSON.parse(localStorage.getItem('jwt'))){
            user = JSON.parse(localStorage.getItem('jwt')).user;
            console.log(user);
        } else{
            user = null;
        }
       console.log("user null? ",user == null, user);
        if(user){
            console.log("signed in: ", {sellerEmail: product.user, userEmail: user._id});
            if(product.user === user._id) return;
            createConvo({sellerEmail: product.user, userEmail: user._id})
            .then((data)=>{
                history.push(`/messages/${data.convId}`);
            });
        } else{
           history.push('/');
        }
   }


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
                {/* {showProductQuantity()} */}
            </div>
            <div className="row">
                 <Link className="ml-4 mb-2 " to={`/product/view/${product._id}`}>
                    <button className="mycard-btn btn-blue">View</button>
                </Link>
                {/* <Link className="mb-2" to={`/product/view/${product._id}`}> */}
                    <button className="mycard-btn btn-red ml-2 mb-2" onClick={contactSeller}>Contact Seller</button>
                {/* </Link> */}
            </div>
        </div>
    );
};

export default Card;


export const DeleteCard = ({product}) => {

    const {user, token} = isAuthenticated();

    let history = useHistory();

    // let user = "";

    const deleteItem = () => {
        // user = JSON.parse(localStorage.getItem('jwt')).user;
        deleteProduct({productId: product._id, userId: user._id, token: token})
        .then((data)=>{
            history.push(`/user/dashboard`);
        });
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
                {/* {showProductQuantity()} */}
            </div>
            <div className="row">
                 <Link className="ml-4 mb-2 " to={`/product/view/${product._id}`}>
                    <button className="mycard-btn btn-blue">View</button>
                </Link>
                {/* <Link className="mb-2" to={`/product/view/${product._id}`}> */}
                    <button className="mycard-btn btn-red ml-2 mb-2" onClick={deleteItem}>Delete Item</button>
                {/* </Link> */}
            </div>
        </div>
    );
};



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