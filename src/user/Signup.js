import React, { useState } from 'react';
import Layout from '../core/Layout';
import {Link} from 'react-router-dom';
import {signup} from '../auth';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        error: '',
        success: false
    });

    const {name, email, password, phone, error, success} = values;

    const handleChange = (fieldName) =>{ // higher order function
        return ((event) => {
            setValues({...values, [fieldName]: event.target.value});
        });
    }

    
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        signup({name: name, email: email, password: password, phone: phone})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false});
            } else{
                setValues({...values, 
                name: '',
                email: '',
                password: '',
                phone: '',
                error: '',
                success: true});
            }
        });
    };

    const signUpForm = () =>{
        return(
            <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input value={name} onChange={handleChange('name')} className="form-control" type="text"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input value={email} onChange={handleChange('email')} className="form-control" type="email"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input value={password} onChange={handleChange('password')} className="form-control" type="password"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Phone no</label>
                <input value={phone} onChange={handleChange('phone')} className="form-control" type="tel" pattern="[0-9]{10}"/>
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>

        </form>
        );
    };
    
    const showError = () => {
        return(
            <div className="alert alert-danger" style={{display: error ? '':'none'}}> {error} </div>
        );
    };

    const showSuccess = () => {
        return(
            <div className="alert alert-info" style={{display: success ? '':'none'}}> New account create. Please <Link to="/signin">Sign-in</Link></div>
        );
    };


    return(
        <Layout title="Sign up" description="Sign up page of the website" className="container col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
            {signUpForm()}
            {JSON.stringify(values)}
        </Layout>
    );
};

export default  Signup;