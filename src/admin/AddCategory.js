import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createCategory, getCategories} from './apiAdmin';


const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [allCategories, setAllCategories] = useState([]);

    const {user, token} = isAuthenticated();

    useEffect(() => {
        setCategories();
    }, []);

    const handleChange = (event) => {
        setError('');
        setName(event.target.value);
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        // make request to api

        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(data.error);
            } else{
                setError("");
                setSuccess(true);
            }
        });

    };

    const showSuccess = () => {
        if(success){
            return <h3 className="text-success">Category {name} Created</h3>
        }
    };

    const showError = () => {
        if(error){
            return <h5 className="text-danger">Category {name} could not be created. Try another category name</h5>
        }
    };

    const goBack = () => {
        return(
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-warning">Back to dashboard</Link>
            </div>
        );
    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name}/>
                <button className="btn btn-outline-primary mt-2">Create category</button>
            </div>
        </form>
    );

    const setCategories = () => {
        getCategories()
        .then((data) =>{
            //console.log(data);
            setAllCategories(data);
        })
        .catch(err => {
            console.log(err);
        })

        
    };

    const showCategories = () => {
        return(
            <div className="card mb-5">
                <h3 className="card-header">Admin Information</h3>
                <ul className="list-group">
                    {allCategories.map((category, index) => <li className="list-group-item">{category.name}</li>)}
                </ul>
            </div>
        );
    };


    return(
        <Layout title="Create Category" description="Add a new category of items">

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {newCategoryForm()}
                    {goBack()}
                    {showCategories()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;