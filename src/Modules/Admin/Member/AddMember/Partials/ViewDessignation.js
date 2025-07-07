import React, { useEffect, useState } from 'react'
import { Table } from '../../../../../Components/Table'

const ViewDesignation = ({getMember}) => {

    const [memberdata, setMemberdata] = useState();

    useEffect(() => {
        setMemberdata(getMember)
    }, [getMember])

    const columns = [
        {
            title: 'S.No',
            render: (index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
    ]
  return (
    <div>
        <Table columns={columns} data={memberdata} />
    </div>
  )
}

export default ViewDesignation