import { API } from '../config';
import React , {useEffect, useState} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';
import {Search} from './Search';
import {readProduct} from './apiCore';
import {ShowImage} from './showImage';
import './Product.css';
import {DetailsThumb} from '../components/Thumbs';

export const ProductPage = (props) => {

    const [error, setError] = useState(false);
    const [product, setProduct] = useState({});
    const [imgNum, setImgNum] = useState(0);
    const imgNums = [1,2,3,4];
    

    const loadSingleProduct = (productId) => {
        readProduct(productId)
        .then((data) => {
            if(data.error) {
                setError(data.error);
            } else {
                setProduct(data);
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
       
    }, []);

   


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
                        <button className="cart">Add to cart</button>
                        <button className="cart">Buy-now</button>
                        <p>{product.description}</p>
                        <hr/>
                    </div>
                    
                </div>
                
            </div>

           {JSON.stringify(product)}
        </Layout>
    );

};