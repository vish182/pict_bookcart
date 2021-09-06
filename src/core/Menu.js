import React, { Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth'

const isActive = (history, path) => {
    if(history.location.pathname.toString() === path.toString()){
        return {color: "#fc8403"};
    } else{
        return {color: "#ffffff"};
    }
};

const Menu = ({history}) => {
    return(
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
                </li>  

                 <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">Shop</Link>
                </li>   
                {!isAuthenticated() && (
                <Fragment>
                    <li>    
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Signup</Link>
                    </li>    
                    <li>    
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Signin</Link>
                    </li>
                    
                </Fragment>)}
                {isAuthenticated() && (
                    <Fragment>
                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <li>    
                                <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">Dashboard</Link>
                            </li>
                        )}

                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <li>    
                                <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
                            </li>
                        )}

                        <li>    
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