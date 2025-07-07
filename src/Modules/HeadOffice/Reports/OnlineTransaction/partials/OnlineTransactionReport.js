import React, { Fragment, useState } from 'react'
import { DateRange } from './DateRange'
import { CustomCardView } from '../../../../../Components/CustomCardView'
import { TopTitle } from '../../../../../Components/Form/TopTitle'
import { Table } from '../../../../../Components/Table'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { EyeOutlined } from '@ant-design/icons'
import { Modal } from '../../../../../Components/Modal'
import dayjs from 'dayjs'

export const OnlineTransactionReportTable = () => {


  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [onlineReportList, setOnlineReportList] = useState([])


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const columns = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Date',
      dataIndex: 'date'
    },

    {
      title: 'Payment Type',
      dataIndex: 'payment_type'
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
  ]

  return (
    <Fragment>
      <TopTitle Heading={'Online Transaction Report'} />
      <CustomCardView width={'800px'}>
        <DateRange label={'Select Date'} url={'online/report'} setOnlineReportList={setOnlineReportList} />
      </CustomCardView>

      <Table columns={columns} data={onlineReportList}/>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
