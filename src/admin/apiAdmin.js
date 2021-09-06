import { API } from '../config';

export const createCategory = (userId, token, category) => {
    //console.log(user.name, user.email, user.password, user.phone);

    console.log(userId, token);
    
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response =>{
        //console.log(JSON.stringify(response.json()));
        return response.json();
    })
    .catch((err) => {
        console.log(err);
        
    })
};

export const createProduct = (userId, token, product) => {
    //console.log(user.name, user.email, user.password, user.phone);

    console.log(userId, token);
    
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',

            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response =>{
        //console.log(JSON.stringify(response.json()));
        return response.json();
    })
    .catch((err) => {
        console.log(err);
        
    })
};

export const getCategories = () => {
    //console.log(user.name, user.email, user.password, user.phone);


    return fetch(`${API}/category/list`, {
        method: 'GET',
    })
    .then(response =>{
        return response.json();
    })
    .catch((err) => {
        console.log(err);
        
    })
};

export const getDepartments = () => {
     return fetch(`${API}/department/list`, {
         method: 'GET',
     })
     .then(response => {
         return response.json();
     })
     .catch((err) => {
         console.log(err);
     });
}