import { API } from '../config';
import React , {useEffect, useState} from 'react';
import Layout from './Layout';
import {getCategories, getDepartments} from '../admin/apiAdmin';
import {getFilteredProducts} from './apiCore';
import Card from './Card';
import Checkbox from './Checkbox';
import CheckboxDept from './CheckboxDept';
import RadioBox from './RadioBox';
import {prices} from './fixedPrices';
import '../styles.css';
import { Search } from './Search';

const Shop = () => {
    
    const [myFilters, setMyFilters] = useState({
        filters: {category: '', department:'', price: 0, str: ""}
    });
    const [categories, setCategories] = useState([]);
    const [departents, setDepartments] = useState([]);
    const [error, setError] = useState('');
    const [limit, setLimit] = useState(8);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [size, setSize] = useState(0);
    const [search, setSearch] = useState('');

    const init = () => {
        getCategories()
        .then((data) =>{
            if(data.error){
                setError(error);
            } else{
                setCategories(data);
            }
        });

        getDepartments()
        .then((dept) => {
            // console.log("depts: ", depts);
            if(dept.error){
                setError(error);
            } else{
                setDepartments(dept);
                
            }
        })
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters);
    }, []);

    const handleFilters = (filters, filterBy) => {
       const newFilters = {...myFilters};
       newFilters.filters[filterBy] = filters;

       if(filterBy == "price"){
           let priceValues = handlePrice(filters);
           newFilters.filters[filterBy] = priceValues;
       };

       loadFilteredResults(newFilters.filters);

       setMyFilters(newFilters);

    };

    const loadFilteredResults = (filterValues) => {
        //console.log("filterValies ", filterValues);
        getFilteredProducts(skip, limit, filterValues)
        .then(data => {
            if(data.error){
                setError(data.error);
            } else{
                console.log(data);
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        })
    };

    
    const loadMore = (filterValues) => {
        //console.log("filterValies ", filterValues);

        let toSkip = limit + skip;

        getFilteredProducts(toSkip, limit, myFilters.filters)
        .then(data => {
            if(data.error){
                setError(data.error);
            } else{
                //console.log(data);
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        })
    };

    const loadMoreButton = () => {
        return(
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
            )
        );
    };

    const handlePrice = (value) => {
        const data  = prices;
        let array = [];

        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }

        return array;
    };
    ////////////////////////////////////////////////

    const handleTextChange = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    };

    const searchSubmit = (e) => {
        e.preventDefault();
        const newfilter = {...myFilters}
        newfilter.filters.str = search;
        console.log(newfilter);
        setMyFilters(newfilter);
        loadFilteredResults(newfilter.filters);
    };

    const searchForm = () => {
        return(
            <div className="mb-4">
                <span className="input-group-text">
                    <div className="input-group input-group-lg">
                        <input type="search" minLength="4" className="form-control" onChange={handleTextChange} placeholder="Search"/>
                    </div>
                    <div className="btn input-group-append" style={{border: 'none'}}>
                        <button className="input-group-text" onClick={searchSubmit}>Search</button>
                    </div>
                </span>
            </div>
        );
    };


   return(
    <Layout title="Shop" description="Shopping" className="container-fluid">
            <div className="shop-parent">
                <div className="filter-box">
                    <h4>Filter by category</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')}/>
                    </ul>
                    <h4>Filter by category</h4>
                    <ul>
                        <CheckboxDept departments={departents} handleFilters={filters => handleFilters(filters, 'department')}/>
                    </ul>
                    <div>
                        <hr/>
                        <h4>Filter by price</h4>
                    </div>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')}/>
                    </div>
                </div>
                
                <div className="shop-box">
                    {searchForm()}
                    <h2 className="mb-4">Results</h2>
                    <div className="flex-container wrap">
                        {filteredResults.map((product, i) => (
                                <Card key={i} product={product}/>
                        ))}
                    </div>
                    {loadMoreButton()}
                </div>
                
            </div>
    </Layout>
   );
};

export default Shop;




// return(
//     <Layout title="Shop" description="Shopping" className="container-fluid">
//             <div className="row">
//                 <div className="col- 3 filter-box">
//                     <h4>Filter by category</h4>
//                     <ul>
//                         <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')}/>
//                     </ul>
//                     <div>
//                         <hr/>
//                         <h4>Filter by price</h4>
//                     </div>
//                     <div>
//                         <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')}/>
//                     </div>
//                 </div>

//                 <div className="col-9 shop-box">
//                     <h2 className="mb-4">Products</h2>
//                     <div className="flex-container wrap">
//                         {filteredResults.map((product, i) => (
//                                 <Card key={i} product={product}/>
//                         ))}
//                     </div>
//                     {loadMoreButton()}
//                 </div>
                
//             </div>
//     </Layout>
//    );