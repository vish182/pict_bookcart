import { API } from '../config';
import React , {useEffect, useState} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';
import {Search} from './Search';


const Home = () => {

    const [productBySell, setProductBySell] = useState([]);
    const [productByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() =>{
        loadProductByArrival();
        loadProductBySell();
    }, []);

    const loadProductBySell = () => {
        getProducts('sold', 5)
        .then((data) => {
            if(data.error){
                setError(data.error);
            } else{
                setProductBySell(data);
            }
        })
    };

    const loadProductByArrival = () => {
        getProducts('createdAt', 5)
        .then((data) => {
            if(data.error){
                setError(data.error);
            } else{
                setProductByArrival(data);
            }
        })
    };


    return(
        <Layout title="Home" description="Home page of the website" className="container-fluid">
            <div>
                <Search/>
            </div>
            <div className="row">
                <h2 className="mb-2 mx-auto">Best Sellers</h2>
                
            </div>
            <div className="row fluid detail-parent p-5">
                {productBySell.map((product, i) =>(<Card key={i} product={product} />))}
            </div>
            <hr/>
            <div className="row">
                <h2 className="mb-2 fluid mx-auto">New Arrivals</h2>
            </div>
            <div className="row detail-parent p-5">
            {productByArrival.map((product, i) =>(<Card key={i} product={product}/>))}
            </div>
        </Layout>
    );
};

export default Home;