import { EyeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { Table } from '../../../../../Components/Table'
import { TopTitle } from '../../../../../Components/Form/TopTitle'

const View_Attendance = () => {
  
  const columns = [
    {
      title: 'Mem Id',
      dataIndex: 'mem_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      render: () => {
        <>
          <Button.Success text={<EyeOutlined />} />
        </>
      }
    },
  ]
  return (
    <div>
      <TopTitle Heading={'View Attendance'} />
      <Table columns={columns} />
    </div>
  )
}

export default View_Attendance