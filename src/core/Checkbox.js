import { API } from '../config';
import React , {useEffect, useState} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';

const Checkbox = ({categories, handleFilters}) => {

    const [checked, setChecked] = useState([]);

    const handleToggle = (cid) => {
        return(() => {
            const currentCategoryId = checked.indexOf(cid);
            const newCheckedCategoryId = [...checked];

            if(currentCategoryId === -1){
                newCheckedCategoryId.push(cid);
            } else{
                newCheckedCategoryId.splice(currentCategoryId, 1);
            }

            setChecked(newCheckedCategoryId);
            console.log(newCheckedCategoryId);
            handleFilters(newCheckedCategoryId);
        });
    };

    

    return categories.map((category, i) =>(
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(category._id)} type="checkbox" value={checked.indexOf(category._id) === -1} className="form-check-input"/>
            <label className="form-check-label">{category.name}</label>
        </li>
    ));
};

export default Checkbox;