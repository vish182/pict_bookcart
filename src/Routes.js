import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard'
import App from './App';
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoutes'
import AdminRoute from './auth/AdminRoutes';
import AddCategory from './admin/AddCategory';
import {AddProduct} from './admin/addProduct';
import {RemoveProduct} from './admin/removeProduct'
import Shop from './core/Shop';
import {ProductPage} from './core/Product';
import Messages from './chat/chat'


const Routes = () => {
    return(
        <BrowserRouter>
       
            <Switch>
                <Route path="/" exact component={Home}/> 
                <Route path="/shop" exact component={Shop}/> 
                <Route path="/app" exact component={App}/> 
                <Route path="/signup" exact component={Signup}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/product/view/:productId" exact component={ProductPage}/>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminRoute path="/create/category" exact component={AddCategory}/>
                <PrivateRoute path="/create/product" exact component={AddProduct}/>
                <PrivateRoute path="/remove/product" exact component={RemoveProduct}/>
                <PrivateRoute path="/messages/:convoId" exact component={Messages}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;