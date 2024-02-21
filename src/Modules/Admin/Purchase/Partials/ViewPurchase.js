import React, { useState } from 'react'
import { Table } from '../../../../Components/Table'

const ViewPurchase = () => {
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
            title: 'Total Purchase',
            dataIndex: 'totalpurchase',
        },
        {
            title: 'Amount / Purchase',
            dataIndex: 'amoundpurchase',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        }
       
    ]
  return (
    <div>
        <Table columns={columns} data={dataSource} />
    </div>
  )
}

export default ViewPurchase