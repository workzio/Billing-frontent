import React, { useState } from 'react'
import { Table } from '../../../../../../Components/Table';
import Flex from '../../../../../../Components/Flex';
import Button from '../../../../../../Components/Form/Button';
import { EyeOutlined } from '@ant-design/icons';

const BottomSection = () => {
  const columns = [
    {
      title: 'SI.No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Order No',
      dataIndex: 'orderno'
    },
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalamount'
    },
    {
      title: 'Received',
      dataIndex: 'received'
    },
    {
      title: 'Balance',
      dataIndex: 'balance'
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <>
            <Flex spaceEvenly>
              <Button.Success text={<EyeOutlined />} />
            </Flex>
          </>
        );
      },
    },
    
  ]
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      orderno: 'IU7A6',
      billno: 'U96492388',
      date: '08/03/2000',
      totalamount: '9863',
      received: '900',
      balance: '863',
    },
    {
      id: 2,
      orderno: 'TS9N6',
      billno: 'JH8753',
      date: '31/12/1999',
      totalamount: '459',
      received: '400',
      balance: '59',
    },
  ])
  return (
    <div style={{margin:'15px 10px'}}>
      <Table columns={columns} data={dataSource} />
    </div>
  )
}

export default BottomSection