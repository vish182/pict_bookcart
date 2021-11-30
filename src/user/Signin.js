import React, { useState } from 'react';
import Layout from '../core/Layout';
import {Link, Redirect} from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const {user} = isAuthenticated();

    const {email, password, error, loading, redirectToReferrer} = values;

    const handleChange = (fieldName) =>{ // higher order function
        return ((event) => {
            setValues({...values, [fieldName]: event.target.value});
        });
    }

    
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signin({email: email, password: password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false});
            } else{
                authenticate(data, () => {
                    setValues({...values, 
                    redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () =>{
        return(
            <form>
            
            <div className="form-group w-25">
                <label className="text-muted">Email</label>
                <input value={email} onChange={handleChange('email')} className="form-control" type="email"/>
            </div>

            <div className="form-group w-25">
                <label className="text-muted">Password</label>
                <input value={password} onChange={handleChange('password')} className="form-control" type="password"/>
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

    const showLoading = () => {
        return(
            <div className="alert alert-info" style={{display: loading ? '':'none'}}> Loading ... <Link to="/signin">Sign-in</Link></div>
        );
    };

    const redirectUser = () => {
        if(redirectToReferrer){
            if(user && user.role === 1){
                return (<Redirect to="/admin/dashboard"/>)
            } else{
                return (<Redirect to="user/dashboard"/>)
            }
        }
    };


    return(
        <Layout title="Sign in" description="Sign in page of the website" className="container col-md-8 offset-md-2">
            {showError()}
            {showLoading()}
            {signUpForm()}
            {redirectUser()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    );
};

export default  Signin;