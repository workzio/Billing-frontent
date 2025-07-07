import React from 'react'
import { Table } from '../../../../../Components/Table'
import { InventoryCon } from './style'
import { TopTitle } from '../../../../../Components/Form/TopTitle'

const InventoyAdmin = () => {
    const columns = [
        {
            title: 'Stocks Availabilty',
            dataIndex: 'stocks_availability',
        },
        {
            title: 'Purchased Stocks',
            dataIndex: 'purchased_stocks',
        },
        {
            title: 'Total Amount',
            dataIndex: 'total Amount',
        },
        {
            title: 'Workers Salary',
            dataIndex: 'total_salary',
        },
        {
            title: 'No of Workers',
            dataIndex: 'workers',
        },

        {
            title: 'Services Amount',
            dataIndex: 'service_amount',
        },
        {
            title: 'Order No',
            dataIndex: 'order_no',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },

        {
            title: 'Balance',
            dataIndex: 'balance',
        },
    ]
    return (
        <>

            <InventoryCon>
                <TopTitle Heading={'Inventory'} />
                <Table columns={columns} />
            </InventoryCon>
        </>

    )
}

export default InventoyAdmin