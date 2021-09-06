import React, { Component } from 'react';
import {ShowImage} from '../core/showImage';
import '../core/Product.css';

export const DetailsThumb = (props) => {
    
        const {imagesNums, tab, myRef, product} = props;
        return (
            <div className="thumb" ref={myRef}>
                {
                imagesNums.map((imgNum, index) =>(
                    <ShowImage key={index} onClick={() => tab(index)} myStyling="view-product-img" item={product} url="product" imageNumber={imgNum} parentKey={index}/>
                ))
                }
            </div>
        );

};

