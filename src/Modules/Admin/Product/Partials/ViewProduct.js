import React, { useState } from 'react'
import { Table } from '../../../../Components/Table'


const Admin_ViewProduct = () => {
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            id: 'IU776',
            name: 'Mike',
            product: 'System',
            aadhar: 'FW629654',
            category: 'Marketing',
            status: 'Active',
        },
        {
            key: '2',
            id: 'IU9676',
            name: 'Del',
            product: 'System',
            category: 'Marketing',
            aadhar: 'YF&U8759',
            status: 'Active',
        },
    ])
    const columns = [
        {
            title: 'S.No',
            render: (index) => index + 1,
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Product',
            dataIndex: 'product',
        }

    ]


    return (
        <div>
            <Table columns={columns} data={dataSource} />
        </div>
    )
}

export default Admin_ViewProduct