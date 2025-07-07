import React from 'react'
import { SalesEntryPage } from './Partials/SalesEntryPage'
import request from '../../../../utils/request';
import { useEffect } from 'react';
import { setProductCategory } from '../../Product/action';
import { useDispatch } from 'react-redux';

export const SaleOrder = () => {

useEffect(() => {
  GetProducts();
}, [])
const dispatch = useDispatch();

const GetProducts=()=>{
    request.get('category/product/unit')
      .then(function (response) {
        dispatch(setProductCategory(response.data))
      })
      .catch(function (error) {
        console.log(error, 'failedddd');
      });
}

  return (
    <div>
       <SalesEntryPage />
    </div>
  )
}