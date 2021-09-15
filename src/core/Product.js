import { API } from '../config';
import React , {useEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';
import {Search} from './Search';
import {readProduct} from './apiCore';
import {ShowImage} from './showImage';
import './Product.css';
import {DetailsThumb} from '../components/Thumbs';
import {createConvo} from '../chat/chatApi';
import { useHistory } from "react-router-dom";

export const ProductPage = (props) => {

    let history = useHistory();

    const [error, setError] = useState(false);
    const [product, setProduct] = useState({});
    const [imgNum, setImgNum] = useState(0);
    const imgNums = [1,2,3,4];

    let user;
    
    const loadSingleProduct = (productId) => {
        readProduct(productId)
        .then((data) => {
            if(data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // console.log("product: ", data)
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
        
    }, []);

   const contactSeller = () => {
        if(JSON.parse(localStorage.getItem('jwt'))){
            user = JSON.parse(localStorage.getItem('jwt')).user;
            console.log(user);
        } else{
            user = null;
        }
       console.log("user null? ",user == null, user);
        if(user){
            if(product.user === user._id) return;
            console.log("signed in: ", {sellerEmail: product.user, userEmail: user._id});
            createConvo({sellerEmail: product.user, userEmail: user._id})
            .then((data)=>{
                history.push(`/messages/${data.convId}`);
            });
        } else{
           history.push('/');
        }
   }


    return(
        <Layout title={product.name} description={product && product.description && product.description.substring(0,100)} className="container-fluid">

            <div className="detail-parent">
                <div className="details" key={product._id}>
                    <div className="big-img">
                        <ShowImage myStyling="view-product-img" item={product} url="product" imageNumber={1}/>
                    </div>
                    <div className="box">
                        <div>
                            <h2>{product.name}</h2>
                            <hr/>
                            <span>₹{product.price}</span>
                        </div> 
                        <hr/> 
                        <div style={{display: "flex"}}>
                            <button className="mycard-btn btn-blue" onClick={contactSeller}>Contact Seller</button>
                            {/* <button className="mycard-btn btn-red ml-2">Buy-now</button> */}
                        </div>
                        
                        <p>{product.description}</p>
                        <hr/>
                    </div>
                    
                </div>
                
            </div>

           {/* {JSON.stringify(product)} */}
        </Layout>
    );

};