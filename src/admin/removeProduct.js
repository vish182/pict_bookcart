import React, {
    useState,
    useEffect,
    useDebugValue
} from 'react';
import Layout from '../core/Layout';
import {
    isAuthenticated
} from '../auth';
import {
    Link
} from 'react-router-dom';
import {
    createProduct,
    getCategories,
    getDepartments,
    loadProductByUser
} from './apiAdmin';

import {DeleteCard} from '../core/Card';

export const RemoveProduct = () => {

        const [products, setProducts] = useState([]);
        let user = JSON.parse(localStorage.getItem('jwt')).user;

        //get categories and set form data

        const init = () => {
            loadProducts();
        };

        const loadProducts = () => {
            loadProductByUser({
                    userId: user._id
                })
                .then((data) => {
                    if (data.error) {
                        //setError(data.error);
                    } else {
                        console.log(data.newList);
                        setProducts(data.newList);
                    }
                })
        };


        useEffect(() => {
            init();
        }, []);


        return ( 
        <Layout title = "Remove Items" description = "Add a new product for sale" >

            <div className = "row detail-parent p-5" > 
            
                {products.map((product, i) => (
                    < DeleteCard key = {i} product = {product}/>
                ))}
            </div >

        </Layout>
    );
};