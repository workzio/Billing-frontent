import React from 'react'
import CmpSourceTable from './Partials/Tableview'
import { useEffect } from 'react';
import request from '../../../../utils/request';


const CompanyView = ({ setCompany, getCompany }) => {

  useEffect(() => {
    getCompanyDetails();
  }, [])

  const getCompanyDetails=()=>{
      request.get('outsource')
          .then(function (response) {
              setCompany(response.data)
          })
          .catch(function (error) {
              console.log(error);
          });
  }
  


  const pdfref = React.useRef();

  return (

    <CmpSourceTable getCompany={getCompany} setCompany={setCompany}/>

  )
}

export default CompanyView
