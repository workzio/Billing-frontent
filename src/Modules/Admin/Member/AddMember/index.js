import React from 'react'
import AdminAddMember from './Partials/AddMember'
import { Row } from '../../../../Components/Row'
import { Col } from 'antd'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import AddDesignation from './Partials/AddDesignation'
import ViewDesignation from './Partials/ViewDessignation'

const Admin_AddMember = ({ setMember,getMember }) => {
  return (
    <div>
      <TopTitle Heading={'Add Member'} />
      <Row gutter={[12, 12]}>
        <Col span={24} md={16}>
          <AdminAddMember />
        </Col>
        <Col span={24} md={8}>
          <AddDesignation setMember={setMember} />
          <ViewDesignation getMember={getMember}/>
        </Col>
      </Row>
    </div>
  )
}

export default Admin_AddMember