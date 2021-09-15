import { API } from '../config';
import React , {useEffect, useState} from 'react';
import Layout from './Layout';
import {getCategories} from '../admin/apiAdmin';
import Card from './Card';
import {getProductsBySearch} from './apiCore';


export const Search  = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const {categories,
        category,
        search,
        results,
        searched,} = data;

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories()
        .then((data) => {
            console.log('category data: ', data);
            if(data.error){
                console.log(data.error);
            } else{
                setData({...data, categories: data});
            }
        })
    };

    const handleChange = (fieldName) => {
        return((event) => {
            setData({...data, [fieldName]: event.target.value, searched:false});
        });
    };

    const searchData = () => {
        console.log(search, category);
        
        if(search){
            getProductsBySearch({search: search || undefined, category: category})
            .then((response) =>{
                console.log('response', response);
                if(response.error){
                    console.log(response.error);
                } else{
                    setData({...data, results: response, searched:true});
                }
                
            })
        }
    };

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };

    const searchMessage = (searched, results) => {
        if(searched && results.length > 0) {
            return(
                <h3>Found {results.length} products</h3>
            );
        }

        if(searched && results.length < 1) {
            return(
                <h3>No products found</h3>
            );
        }
    };

    const searchForm = () => {
        return(
            <form onSubmit={searchSubmit}>
                <span className="input-group-text">
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <select className="btn mr-2" onChange={handleChange('category')}>
                                <option value="All">Select Category</option>
                                {categories.map((category, i) => (<option key={i} value={category._id}>{category.name}</option>))}
                            </select>
                        </div>
                        <input type="search" minLength="4" className="form-control" onChange={handleChange('search')} placeholder="Search"/>
                    </div>
                    <div className="btn input-group-append" style={{border: 'none'}}>
                        <button className="input-group-text">Search</button>
                    </div>
                </span>
            </form>
        );
    };

    const searchedProducts = (results = []) => {
        return(
            <div>
                <div className="row">
                    <div className="mb-4 mx-auto">
                        {searchMessage(searched, results)}
                    </div>
                </div>
                <div className="row">
                    {results.map((product, i) => (<Card key={i} product={product}/>))}
                </div>
            </div>
        );
    };


    return(
        <div>
            <div className="container mb-3"> {searchForm()} </div>
            <div className="container-fluid mb-3"> {searchedProducts(results)} </div>
     
        </div>
    );
};