import { API } from '../config';
import React , {useEffect, useState} from 'react';
import '../styles.css';

export const ShowImage = ({item, url, imageNumber, myStyling}) => {
    // console.log(item._id);
    const imageNo = imageNumber ? imageNumber : 1;

    return(
            <img src={`${API}/product/photo${imageNo}/${item._id}`} alt="" className={myStyling} style={{maxHeight: '100%', maxWidth: '100%'}}/>  
    );
};
