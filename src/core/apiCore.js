import { API } from '../config';
import queryString from 'query-string';

export const getProducts = (sortBy, limit) => {
    //console.log(user.name, user.email, user.password, user.phone);


    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=${limit}`, {
        method: 'GET',
    })
    .then(response =>{
        //console.log(JSON.stringify(response.json()));
        return response.json();
    })
    .catch((err) => {
        console.log(err);
        
    })
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    //console.log(user.name, user.email, user.password, user.phone);

    const data = {skip, limit, filters};
    //console.log("data: ", data)

    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data)
    })
    .then(response =>{
        //console.log(JSON.stringify(response.json()));
        return response.json();
    })
    .catch((err) => {
        console.log(err);
        
    })
};

export const getProductsBySearch = (params) => {
    //console.log(user.name, user.email, user.password, user.phone);

    const query = queryString.stringify(params);
    console.log('query', query);

    return fetch(`${API}/products/query/search?${query}`, {
        method: 'GET',
    })
    .then(response =>{
        //console.log(JSON.stringify(response.json()));
        return response.json();
    })
    .catch((err) => {
        console.log(err);
        
    })
};


export const readProduct = (productId) => {
    //console.log(user.name, user.email, user.password, user.phone);


    return fetch(`${API}/product/view/${productId}`, {
        method: 'GET',
        // headers: {
        //     Accept: 'application/json',
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`
        // },
        //body: JSON.stringify(category)
    })
    .then(response =>{
        //console.log(JSON.stringify(response.json()));
        return response.json();
    })
    .catch((err) => {
        console.log(err);
        
    })
};

