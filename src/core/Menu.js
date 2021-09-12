import React, { Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';

import BookLogo from '../assets/booklogo5.png';

import "./menu.css";

const isActive = (history, path) => {
    if(history.location.pathname.toString() === path.toString()){
        return {color: "#fc8403"};
    } else{
        return {color: "#ffffff"};
    }
};

const Logo = () => {
    return(
        <span className="logo-div">
            <img src={BookLogo} className="logo"/> 
        </span>
    );
}

const Menu = ({history}) => {
    return(
        <div className="navbar">
            {/* <div className="logo"></div> */}
            <Logo/>
            <ul className="navbar-nav">
                <Link className="nav-link" style={isActive(history, "/")} to="/">
                    <li className="nav-item">
                        Home
                    </li>  
                </Link>
                <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">
                    <li className="nav-item">
                    Shop
                    </li>
                </Link>   
                {!isAuthenticated() && (
                <Fragment>
                    <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">
                        <li className="nav-item">    
                            Signup
                        </li>
                    </Link>
                    <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">  
                        <li className="nav-item">    
                            Signin
                        </li>
                    </Link>
                    
                </Fragment>)}
                {isAuthenticated() && (
                    <Fragment>
                        {isAuthenticated().user && isAuthenticated().user.role === 0 && (
                            <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">
                                <li className="nav-item">    
                                    Dashboard
                                </li>
                            </Link>
                        )}

                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">
                                <li className="nav-item">    
                                    Dashboard
                                </li>
                            </Link>
                        )}

                        <li className="nav-item">    
                            <span className="nav-link" style={{'cursor':'pointer', color:'#ffffff'}} onClick={() => {
                                    signout(() => {
                                    history.push('/');
                                });
                            }}>Signout
                            </span>
                        </li>
                    </Fragment>
                )}
            </ul>
        </div>
    );
};

export default withRouter(Menu); //history