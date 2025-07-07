import React from 'react'
import { Table } from '../../../../../Components/Table'
import { DistributionCon } from './style'
import { TopTitle } from '../../../../../Components/Form/TopTitle'

const DistributionAdmin = () => {
    const columns=[
        {
            title:'Stocks from Inventory',
            dataIndex:'stocks_inventory',


        },
        {
            title:'Arrival Time',
            dataIndex:'arrival_time',

        },
        {
            title:'Date',
            dataIndex:'date',

        },
      
        {
            title:'Order No',
            dataIndex:'order_no',

        },
        {
            title:'Services Amount',
            dataIndex:'service_amount',

        },
        {
            title:'No of Workers',
            dataIndex:'workers',
            
        },
        {
            title:'Total Amount',
            dataIndex:'total Amount',
            
        },
        {
            title:'Total Salary',
            dataIndex:'total_salary',
            
        },  
        {
            title:'Balance',
            dataIndex:'balance',

        },   
    ]
    return (
        <div>
            <DistributionCon>
                <TopTitle Heading={'distribution'} />
                <Table columns={columns} />
            </DistributionCon>
        </div>
    )
}

export default DistributionAdmin