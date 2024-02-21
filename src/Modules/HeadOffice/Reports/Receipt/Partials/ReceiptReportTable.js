import React, { Fragment, useEffect, useState } from 'react'
import { CustomCardView } from '../../../../../Components/CustomCardView'
import { TopTitle } from '../../../../../Components/Form/TopTitle'
import { Table } from '../../../../../Components/Table'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { EyeOutlined } from '@ant-design/icons'
import { Modal } from '../../../../../Components/Modal'
import dayjs from 'dayjs'
import { DateRange } from './DateRange'
import { ModalViewContent } from '../../../Receipt/ViewReceipt/Partials/ModalViewContent'

export const ReceiptReportTable = () => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [receiptList, setReceiptList] = useState([])


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
      title: 'Received From',
      dataIndex: 'received',
    },
    {
      title: 'Receipt Number',
      dataIndex: 'receiptNo'
    },
    {
      title: 'Date',
      render: (text, record) => {

        const formattedDate = dayjs(record?.date).format('DD-MM-YYYY');
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'PaymentType',
      dataIndex: 'paymentType'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <>
            <Flex center gap={'10px'}>
              <Button.Success text={<EyeOutlined />} onClick={() => onViewProduct(record)} />
            </Flex>
          </>
        );
      },
    }
  ]


  const onViewProduct = (record) => {
    setModalContent(<ModalViewContent record={record} />);
    setModalTitle("View Product");
    showModal();
  }


  return (
    <Fragment>
      <TopTitle Heading={'Receipt Report'} />
      <CustomCardView width={'800px'}>
        <DateRange label={'Select Date'} url={'receipts/report'} setReceiptList={setReceiptList}/>
      </CustomCardView>

      <Table columns={columns} data={receiptList}/>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
