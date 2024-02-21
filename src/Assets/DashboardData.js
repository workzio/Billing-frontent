import React from 'react'
import { BsCreditCard2Front } from 'react-icons/bs'
import { FaRupeeSign } from 'react-icons/fa'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { RiUser3Line } from 'react-icons/ri'

export const DashboardData = [
    {
        key:'1',
        icon:<FaRupeeSign />,
        h1:'Total Sales',
        Amount:'',
        p:'',
        Total:'',
        navigate:'/headoffice_saleviewdetails/'

    },
    {
        key:'2',
        icon:<MdProductionQuantityLimits />,
        h1:'Total Purchase',
        Amount:'',
        p:'',
        Total:'',
        navigate:'/headoffice_purchase_view/'
    },
    {
        key:'3',
        icon:<RiUser3Line />,
        h1:'Total Stocks',
        Amount:'',
        p:'',
        Total:'',
        navigate:'/headoffice_stocks/'
    },

    {
        key:'4',
        icon:<BsCreditCard2Front />,
        h1:'Total Distributors',
        Amount:'',
        p:'',
        Total:'',
        navigate:'/headoffice_distritale/'
    },
]
export const DashSupplierData = [
    {
      h1:'Brigestone',
      h3:'9894297542',
    },
    {
        h1:'Ceat',
        h3:'9894297542',
      },

      {
        h1:'FIRESTONE',
        h3:'9894297542',
      },

      {
        h1:'MICHELIN TRUCK',
        h3:'9894297542',
      },
      {
        h1:'MICHELIN TWO WHEELER',
        h3:'9894297542',
      },
      {
        h1:'TVS',
        h3:'9894297542',
      },
      {
        h1:'8.5 tube',
        h3:'9894297542',
      },
      
  
  

]





