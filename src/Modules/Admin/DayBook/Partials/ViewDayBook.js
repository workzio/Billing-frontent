import React, { useState } from 'react'
import { Table } from '../../../../Components/Table'
import { TopTitle } from '../../../../Components/Form/TopTitle'

const ViewDayBook = () => {
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            id: 'IU776',
            name: 'Mike',
            date: '22/12/2022',
            amoundpurchase: 'FW629654',
            totalpurchase: '2220',
            category: 'Marketing',
            status: 'Active',
        },
        {
            key: '2',
            id: 'IU9676',
            name: 'Del',
            date: '13/2/2022',
            category: 'Marketing',
            amoundpurchase: 'YF&U8759',
            totalpurchase: '070',
            status: 'Active',
        },
    ])
    const columns = [
        {
            title: 'S.No',
            render: (index) => index + 1,
        },
        {
            title: 'Total Stocks',
            dataIndex: 'totalstocks',
        },
        {
            title: 'Stocks In',
            dataIndex: 'stocksin',
        },
        {
            title: 'Stocks Out',
            dataIndex: 'stocksout',
        }
       
    ]
  return (
    <div style={{width:'60%'}}>
        <TopTitle Heading={'Head Office'} />
        <Table columns={columns} data={dataSource} />
        <TopTitle Heading={'Inventory'} />
        <Table columns={columns} data={dataSource} />
        <TopTitle Heading={'Marketing'} />
        <Table columns={columns} data={dataSource} />
    </div>
  )
}

export default ViewDayBook