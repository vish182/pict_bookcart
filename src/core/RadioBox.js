import { API } from '../config';
import React , {useEffect, useState, Fragment} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';

const RadioBox = ({prices, handleFilters}) => {

    const [values, setValues] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValues(event.target.value);
    };
   
    

    return prices.map((price, i) =>(

        <div key={i} >
            <input onChange={handleChange} type="radio" name={price} value={price._id} className="mr-2 ml-2"/>
            <label className="form-check-label">{price.name}</label>
        </div>
    ));
};

export default RadioBox;