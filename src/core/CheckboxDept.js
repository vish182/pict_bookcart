import { API } from '../config';
import React , {useEffect, useState} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';

const CheckboxDept = ({departments, handleFilters}) => {

    const [checked, setChecked] = useState([]);

    const handleToggle = (cid) => {
        return(() => {
            const currentDepartmentId = checked.indexOf(cid);
            const newCheckedDepartmentId = [...checked];

            if(currentDepartmentId === -1){
                newCheckedDepartmentId.push(cid);
            } else{
                newCheckedDepartmentId.splice(currentDepartmentId, 1);
            }

            setChecked(newCheckedDepartmentId);
            console.log(newCheckedDepartmentId);
            handleFilters(newCheckedDepartmentId);
        });
    };

    

    return departments.map((department, i) =>(
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(department._id)} type="checkbox" value={checked.indexOf(department._id) === -1} className="form-check-input"/>
            <label className="form-check-label">{department.name}</label>
        </li>
    ));
};

export default CheckboxDept;